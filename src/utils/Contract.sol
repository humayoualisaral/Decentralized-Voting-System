// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract DecentralizedVotingSystem is AccessControl, ReentrancyGuard, Pausable {
    
    // Role definitions
    bytes32 public constant ELECTION_COMMISSION_ROLE = keccak256("ELECTION_COMMISSION_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    
    // Structs
    struct Candidate {
        uint256 candidateId;
        string name;
        string imageHash; // IPFS hash for candidate image
        string partyName;
        string symbol; // Party symbol or independent symbol
        bool isActive;
        uint256 voteCount;
        uint256 timestamp;
    }
    
    struct Voter {
        string cnicHash; // Hashed CNIC for privacy
        string biometricId; // Biometric credential ID
        bool hasVoted;
        uint256 votedCandidateId;
        uint256 voteTimestamp;
        address voterAddress;
    }
    
    struct Election {
        uint256 electionId;
        string title;
        string description;
        uint256 startTime;
        uint256 endTime;
        bool isActive;
        uint256 totalVotes;
    }
    
    // State variables
    uint256 public currentElectionId;
    uint256 public candidateCounter;
    
    mapping(uint256 => Election) public elections;
    mapping(uint256 => Candidate) public candidates;
    mapping(uint256 => mapping(address => Voter)) public voters; // electionId => voterAddress => Voter
    mapping(uint256 => mapping(string => bool)) public usedCNICs; // electionId => cnicHash => used
    mapping(uint256 => mapping(string => address)) public cnicToAddress; // electionId => cnicHash => address
    mapping(uint256 => uint256[]) public electionCandidates; // electionId => candidateIds[]
    
    // Events
    event ElectionCreated(uint256 indexed electionId, string title, uint256 startTime, uint256 endTime);
    event CandidateAdded(uint256 indexed electionId, uint256 indexed candidateId, string name, string partyName);
    event VoteCast(uint256 indexed electionId, address indexed voter, uint256 indexed candidateId, string cnicHash);
    event ElectionStatusChanged(uint256 indexed electionId, bool isActive);
    
    // Modifiers
    modifier onlyElectionCommission() {
        require(hasRole(ELECTION_COMMISSION_ROLE, msg.sender), "Must have election commission role");
        _;
    }
    
    modifier onlyAdmin() {
        require(hasRole(ADMIN_ROLE, msg.sender), "Must have admin role");
        _;
    }
    
    modifier electionExists(uint256 _electionId) {
        require(_electionId <= currentElectionId && _electionId > 0, "Election does not exist");
        _;
    }
    
    modifier electionActive(uint256 _electionId) {
        require(elections[_electionId].isActive, "Election is not active");
        require(block.timestamp >= elections[_electionId].startTime, "Election has not started");
        require(block.timestamp <= elections[_electionId].endTime, "Election has ended");
        _;
    }
    
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(ELECTION_COMMISSION_ROLE, msg.sender);
    }
    
    // Election Management Functions
    function createElection(
        string memory _title,
        string memory _description,
        uint256 _startTime,
        uint256 _endTime
    ) external onlyElectionCommission {
        require(_startTime < _endTime, "Invalid time range");
        require(_startTime > block.timestamp, "Start time must be in future");
        
        currentElectionId++;
        elections[currentElectionId] = Election({
            electionId: currentElectionId,
            title: _title,
            description: _description,
            startTime: _startTime,
            endTime: _endTime,
            isActive: true,
            totalVotes: 0
        });
        
        emit ElectionCreated(currentElectionId, _title, _startTime, _endTime);
    }
    
    function addCandidate(
        uint256 _electionId,
        string memory _name,
        string memory _imageHash,
        string memory _partyName,
        string memory _symbol
    ) external onlyElectionCommission electionExists(_electionId) {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(block.timestamp < elections[_electionId].startTime, "Cannot add candidates after election starts");
        
        candidateCounter++;
        candidates[candidateCounter] = Candidate({
            candidateId: candidateCounter,
            name: _name,
            imageHash: _imageHash,
            partyName: _partyName,
            symbol: _symbol,
            isActive: true,
            voteCount: 0,
            timestamp: block.timestamp
        });
        
        electionCandidates[_electionId].push(candidateCounter);
        
        emit CandidateAdded(_electionId, candidateCounter, _name, _partyName);
    }
    
    // FIXED: Updated castVote function to match frontend parameters
    function castVote(
        uint256 _electionId,
        uint256 _candidateId,
        string memory _cnicHash,
        string memory _biometricId
    ) external 
        nonReentrant 
        whenNotPaused 
        electionExists(_electionId) 
        electionActive(_electionId) 
    {
        require(bytes(_cnicHash).length > 0, "CNIC hash cannot be empty");
        require(bytes(_biometricId).length > 0, "Biometric ID cannot be empty");
        require(!usedCNICs[_electionId][_cnicHash], "CNIC already used for this election");
        require(!voters[_electionId][msg.sender].hasVoted, "Address already voted");
        require(candidates[_candidateId].isActive, "Candidate not active");
        
        // Verify candidate belongs to this election
        bool candidateInElection = false;
        uint256[] memory electionCandidateList = electionCandidates[_electionId];
        for (uint256 i = 0; i < electionCandidateList.length; i++) {
            if (electionCandidateList[i] == _candidateId) {
                candidateInElection = true;
                break;
            }
        }
        require(candidateInElection, "Candidate not in this election");
        
        // Record vote
        voters[_electionId][msg.sender] = Voter({
            cnicHash: _cnicHash,
            biometricId: _biometricId,
            hasVoted: true,
            votedCandidateId: _candidateId,
            voteTimestamp: block.timestamp,
            voterAddress: msg.sender
        });
        
        // Mark CNIC as used for this election and map to address
        usedCNICs[_electionId][_cnicHash] = true;
        cnicToAddress[_electionId][_cnicHash] = msg.sender;
        
        // Update vote counts
        candidates[_candidateId].voteCount++;
        elections[_electionId].totalVotes++;
        
        emit VoteCast(_electionId, msg.sender, _candidateId, _cnicHash);
    }
    
    // NEW: Vote verification function
    function getVoteByCAIC(
        uint256 _electionId, 
        string memory _cnicHash
    ) external view electionExists(_electionId) returns (
        bool hasVoted,
        uint256 votedCandidateId,
        string memory candidateName,
        string memory partyName,
        string memory symbol,
        uint256 voteTimestamp,
        address voterAddress
    ) {
        require(bytes(_cnicHash).length > 0, "CNIC hash cannot be empty");
        
        address voterAddr = cnicToAddress[_electionId][_cnicHash];
        
        if (voterAddr == address(0)) {
            return (false, 0, "", "", "", 0, address(0));
        }
        
        Voter memory voter = voters[_electionId][voterAddr];
        
        if (!voter.hasVoted) {
            return (false, 0, "", "", "", 0, voterAddr);
        }
        
        Candidate memory candidate = candidates[voter.votedCandidateId];
        
        return (
            true,
            voter.votedCandidateId,
            candidate.name,
            candidate.partyName,
            candidate.symbol,
            voter.voteTimestamp,
            voterAddr
        );
    }
    
    // View Functions
    function getElectionDetails(uint256 _electionId) 
        external 
        view 
        electionExists(_electionId) 
        returns (Election memory) 
    {
        return elections[_electionId];
    }
    
    function getCandidateDetails(uint256 _candidateId) 
        external 
        view 
        returns (Candidate memory) 
    {
        require(_candidateId <= candidateCounter && _candidateId > 0, "Candidate does not exist");
        return candidates[_candidateId];
    }
    
    function getElectionCandidates(uint256 _electionId) 
        external 
        view 
        electionExists(_electionId) 
        returns (uint256[] memory) 
    {
        return electionCandidates[_electionId];
    }
    
    function getVoterStatus(uint256 _electionId, address _voter) 
        external 
        view 
        electionExists(_electionId) 
        returns (bool hasVoted, uint256 votedCandidateId) 
    {
        Voter memory voter = voters[_electionId][_voter];
        return (voter.hasVoted, voter.votedCandidateId);
    }
    
    function getElectionResults(uint256 _electionId) 
        external 
        view 
        electionExists(_electionId) 
        returns (uint256[] memory candidateIds, uint256[] memory voteCounts) 
    {
        uint256[] memory electionCandidateList = electionCandidates[_electionId];
        uint256[] memory counts = new uint256[](electionCandidateList.length);
        
        for (uint256 i = 0; i < electionCandidateList.length; i++) {
            counts[i] = candidates[electionCandidateList[i]].voteCount;
        }
        
        return (electionCandidateList, counts);
    }
    
    // Admin Functions
    function setElectionStatus(uint256 _electionId, bool _isActive) 
        external 
        onlyElectionCommission 
        electionExists(_electionId) 
    {
        elections[_electionId].isActive = _isActive;
        emit ElectionStatusChanged(_electionId, _isActive);
    }
    
    function setCandidateStatus(uint256 _candidateId, bool _isActive) 
        external 
        onlyElectionCommission 
    {
        require(_candidateId <= candidateCounter && _candidateId > 0, "Candidate does not exist");
        candidates[_candidateId].isActive = _isActive;
    }
    
    function grantElectionCommissionRole(address _account) external onlyAdmin {
        grantRole(ELECTION_COMMISSION_ROLE, _account);
    }
    
    function revokeElectionCommissionRole(address _account) external onlyAdmin {
        revokeRole(ELECTION_COMMISSION_ROLE, _account);
    }
    
    function pause() external onlyAdmin {
        _pause();
    }
    
    function unpause() external onlyAdmin {
        _unpause();
    }
}