(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/utils/contractABI.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "CONTRACT_ABI": ()=>CONTRACT_ABI
});
const CONTRACT_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "AccessControlBadConfirmation",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "neededRole",
                "type": "bytes32"
            }
        ],
        "name": "AccessControlUnauthorizedAccount",
        "type": "error"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_electionId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_imageHash",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_partyName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_symbol",
                "type": "string"
            }
        ],
        "name": "addCandidate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "electionId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "candidateId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "partyName",
                "type": "string"
            }
        ],
        "name": "CandidateAdded",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_electionId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_candidateId",
                "type": "uint256"
            },
            {
                "internalType": "bytes32",
                "name": "_fingerprintVerification",
                "type": "bytes32"
            }
        ],
        "name": "castVote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_description",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_startTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_endTime",
                "type": "uint256"
            }
        ],
        "name": "createElection",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "electionId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "startTime",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "endTime",
                "type": "uint256"
            }
        ],
        "name": "ElectionCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "electionId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "isActive",
                "type": "bool"
            }
        ],
        "name": "ElectionStatusChanged",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_account",
                "type": "address"
            }
        ],
        "name": "grantElectionCommissionRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "grantRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "pause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "Paused",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_electionId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_cnicHash",
                "type": "string"
            },
            {
                "internalType": "bytes32",
                "name": "_fingerprintHash",
                "type": "bytes32"
            }
        ],
        "name": "registerVoter",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "callerConfirmation",
                "type": "address"
            }
        ],
        "name": "renounceRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_account",
                "type": "address"
            }
        ],
        "name": "revokeElectionCommissionRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "revokeRole",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "previousAdminRole",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "newAdminRole",
                "type": "bytes32"
            }
        ],
        "name": "RoleAdminChanged",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "RoleGranted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "account",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "RoleRevoked",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_candidateId",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "_isActive",
                "type": "bool"
            }
        ],
        "name": "setCandidateStatus",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_electionId",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "_isActive",
                "type": "bool"
            }
        ],
        "name": "setElectionStatus",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "unpause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "Unpaused",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "electionId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "voter",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "candidateId",
                "type": "uint256"
            }
        ],
        "name": "VoteCast",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "electionId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "voter",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "cnicHash",
                "type": "string"
            }
        ],
        "name": "VoterRegistered",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "ADMIN_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "candidateCounter",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "candidates",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "candidateId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "imageHash",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "partyName",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "symbol",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "isActive",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "voteCount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "timestamp",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "currentElectionId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "DEFAULT_ADMIN_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "ELECTION_COMMISSION_ROLE",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "electionCandidates",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "elections",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "electionId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "startTime",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "endTime",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isActive",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "totalVotes",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_candidateId",
                "type": "uint256"
            }
        ],
        "name": "getCandidateDetails",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "candidateId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "imageHash",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "partyName",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "symbol",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "isActive",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "voteCount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timestamp",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct DecentralizedVotingSystem.Candidate",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_electionId",
                "type": "uint256"
            }
        ],
        "name": "getElectionCandidates",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_electionId",
                "type": "uint256"
            }
        ],
        "name": "getElectionDetails",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "electionId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "title",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "startTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "endTime",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isActive",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "totalVotes",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct DecentralizedVotingSystem.Election",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_electionId",
                "type": "uint256"
            }
        ],
        "name": "getElectionResults",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "candidateIds",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256[]",
                "name": "voteCounts",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            }
        ],
        "name": "getRoleAdmin",
        "outputs": [
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_electionId",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "_voter",
                "type": "address"
            }
        ],
        "name": "getVoterStatus",
        "outputs": [
            {
                "internalType": "bool",
                "name": "isRegistered",
                "type": "bool"
            },
            {
                "internalType": "bool",
                "name": "hasVoted",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "votedCandidateId",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes32",
                "name": "role",
                "type": "bytes32"
            },
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "hasRole",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "paused",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes4",
                "name": "interfaceId",
                "type": "bytes4"
            }
        ],
        "name": "supportsInterface",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "usedCNICs",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "voters",
        "outputs": [
            {
                "internalType": "string",
                "name": "cnicHash",
                "type": "string"
            },
            {
                "internalType": "bytes32",
                "name": "fingerprintHash",
                "type": "bytes32"
            },
            {
                "internalType": "bool",
                "name": "hasVoted",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "votedCandidateId",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "voteTimestamp",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isRegistered",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/context/ContractContext.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "VotingProvider": ()=>VotingProvider,
    "useVoting": ()=>useVoting
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__ = __turbopack_context__.i("[project]/node_modules/ethers/lib.esm/ethers.js [app-client] (ecmascript) <export * as ethers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$contractABI$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/contractABI.js [app-client] (ecmascript)"); // Import your ABI file
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
const VotingContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])();
const useVoting = ()=>{
    _s();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(VotingContext);
    if (!context) {
        throw new Error('useVoting must be used within a VotingProvider');
    }
    return context;
};
_s(useVoting, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
const VotingProvider = (param)=>{
    let { children } = param;
    _s1();
    // State variables
    const [account, setAccount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [provider, setProvider] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [signer, setSigner] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [contract, setContract] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isConnected, setIsConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [chainId, setChainId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const CONTRACT_ADDRESS = ("TURBOPACK compile-time value", "0xCC129538eF038A7B10219cC08721F4BE28265bc7");
    // Initialize contract
    const initializeContract = async (signerOrProvider)=>{
        try {
            const votingContract = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].Contract(CONTRACT_ADDRESS, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$contractABI$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTRACT_ABI"], signerOrProvider);
            setContract(votingContract);
            return votingContract;
        } catch (error) {
            console.error('Error initializing contract:', error);
            throw new Error('Failed to initialize contract');
        }
    };
    // Connect wallet function
    const connectWallet = async ()=>{
        try {
            setIsLoading(true);
            if (!window.ethereum) {
                throw new Error('MetaMask is not installed');
            }
            // Request account access
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            if (accounts.length === 0) {
                throw new Error('No accounts found');
            }
            // Create provider and signer
            const web3Provider = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ethers$2f$lib$2e$esm$2f$ethers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__ethers$3e$__["ethers"].BrowserProvider(window.ethereum);
            const web3Signer = await web3Provider.getSigner();
            const network = await web3Provider.getNetwork();
            // Set state
            setProvider(web3Provider);
            setSigner(web3Signer);
            setAccount(accounts[0]);
            setChainId(network.chainId.toString());
            setIsConnected(true);
            // Initialize contract
            await initializeContract(web3Signer);
            console.log('Wallet connected successfully');
        } catch (error) {
            console.error('Error connecting wallet:', error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    };
    // Disconnect wallet
    const disconnectWallet = ()=>{
        setAccount(null);
        setProvider(null);
        setSigner(null);
        setContract(null);
        setIsConnected(false);
        setChainId(null);
    };
    // Election Management Functions
    const createElection = async (title, description, startTime, endTime)=>{
        try {
            if (!contract) throw new Error('Contract not initialized');
            setIsLoading(true);
            const tx = await contract.createElection(title, description, startTime, endTime);
            const receipt = await tx.wait();
            console.log('Election created:', receipt);
            return receipt;
        } catch (error) {
            console.error('Error creating election:', error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    };
    const addCandidate = async (electionId, name, imageHash, partyName, symbol)=>{
        try {
            if (!contract) throw new Error('Contract not initialized');
            setIsLoading(true);
            const tx = await contract.addCandidate(electionId, name, imageHash, partyName, symbol);
            const receipt = await tx.wait();
            console.log('Candidate added:', receipt);
            return receipt;
        } catch (error) {
            console.error('Error adding candidate:', error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    };
    // Voter Functions
    const registerVoter = async (electionId, cnicHash, fingerprintHash)=>{
        try {
            if (!contract) throw new Error('Contract not initialized');
            setIsLoading(true);
            const tx = await contract.registerVoter(electionId, cnicHash, fingerprintHash);
            const receipt = await tx.wait();
            console.log('Voter registered:', receipt);
            return receipt;
        } catch (error) {
            console.error('Error registering voter:', error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    };
    const castVote = async (electionId, candidateId, fingerprintVerification)=>{
        try {
            if (!contract) throw new Error('Contract not initialized');
            setIsLoading(true);
            const tx = await contract.castVote(electionId, candidateId, fingerprintVerification);
            const receipt = await tx.wait();
            console.log('Vote cast:', receipt);
            return receipt;
        } catch (error) {
            console.error('Error casting vote:', error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    };
    // View Functions
    const getElectionDetails = async (electionId)=>{
        try {
            if (!contract) throw new Error('Contract not initialized');
            const election = await contract.getElectionDetails(electionId);
            return {
                electionId: election.electionId.toString(),
                title: election.title,
                description: election.description,
                startTime: election.startTime.toString(),
                endTime: election.endTime.toString(),
                isActive: election.isActive,
                totalVotes: election.totalVotes.toString()
            };
        } catch (error) {
            console.error('Error getting election details:', error);
            throw error;
        }
    };
    const getCandidateDetails = async (candidateId)=>{
        try {
            if (!contract) throw new Error('Contract not initialized');
            const candidate = await contract.getCandidateDetails(candidateId);
            return {
                candidateId: candidate.candidateId.toString(),
                name: candidate.name,
                imageHash: candidate.imageHash,
                partyName: candidate.partyName,
                symbol: candidate.symbol,
                isActive: candidate.isActive,
                voteCount: candidate.voteCount.toString(),
                timestamp: candidate.timestamp.toString()
            };
        } catch (error) {
            console.error('Error getting candidate details:', error);
            throw error;
        }
    };
    const getElectionCandidates = async (electionId)=>{
        try {
            if (!contract) throw new Error('Contract not initialized');
            const candidateIds = await contract.getElectionCandidates(electionId);
            return candidateIds.map((id)=>id.toString());
        } catch (error) {
            console.error('Error getting election candidates:', error);
            throw error;
        }
    };
    const getVoterStatus = async function(electionId) {
        let voterAddress = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
        try {
            if (!contract) throw new Error('Contract not initialized');
            const address = voterAddress || account;
            if (!address) throw new Error('No voter address provided');
            const status = await contract.getVoterStatus(electionId, address);
            return {
                isRegistered: status.isRegistered,
                hasVoted: status.hasVoted,
                votedCandidateId: status.votedCandidateId.toString()
            };
        } catch (error) {
            console.error('Error getting voter status:', error);
            throw error;
        }
    };
    const getElectionResults = async (electionId)=>{
        try {
            if (!contract) throw new Error('Contract not initialized');
            const results = await contract.getElectionResults(electionId);
            return {
                candidateIds: results.candidateIds.map((id)=>id.toString()),
                voteCounts: results.voteCounts.map((count)=>count.toString())
            };
        } catch (error) {
            console.error('Error getting election results:', error);
            throw error;
        }
    };
    const getCurrentElectionId = async ()=>{
        try {
            if (!contract) throw new Error('Contract not initialized');
            const electionId = await contract.currentElectionId();
            return electionId.toString();
        } catch (error) {
            console.error('Error getting current election ID:', error);
            throw error;
        }
    };
    // Admin Functions
    const setElectionStatus = async (electionId, isActive)=>{
        try {
            if (!contract) throw new Error('Contract not initialized');
            setIsLoading(true);
            const tx = await contract.setElectionStatus(electionId, isActive);
            const receipt = await tx.wait();
            console.log('Election status updated:', receipt);
            return receipt;
        } catch (error) {
            console.error('Error setting election status:', error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    };
    const setCandidateStatus = async (candidateId, isActive)=>{
        try {
            if (!contract) throw new Error('Contract not initialized');
            setIsLoading(true);
            const tx = await contract.setCandidateStatus(candidateId, isActive);
            const receipt = await tx.wait();
            console.log('Candidate status updated:', receipt);
            return receipt;
        } catch (error) {
            console.error('Error setting candidate status:', error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    };
    const grantElectionCommissionRole = async (accountAddress)=>{
        try {
            if (!contract) throw new Error('Contract not initialized');
            setIsLoading(true);
            const tx = await contract.grantElectionCommissionRole(accountAddress);
            const receipt = await tx.wait();
            console.log('Election commission role granted:', receipt);
            return receipt;
        } catch (error) {
            console.error('Error granting election commission role:', error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    };
    const revokeElectionCommissionRole = async (accountAddress)=>{
        try {
            if (!contract) throw new Error('Contract not initialized');
            setIsLoading(true);
            const tx = await contract.revokeElectionCommissionRole(accountAddress);
            const receipt = await tx.wait();
            console.log('Election commission role revoked:', receipt);
            return receipt;
        } catch (error) {
            console.error('Error revoking election commission role:', error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    };
    const pauseContract = async ()=>{
        try {
            if (!contract) throw new Error('Contract not initialized');
            setIsLoading(true);
            const tx = await contract.pause();
            const receipt = await tx.wait();
            console.log('Contract paused:', receipt);
            return receipt;
        } catch (error) {
            console.error('Error pausing contract:', error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    };
    const unpauseContract = async ()=>{
        try {
            if (!contract) throw new Error('Contract not initialized');
            setIsLoading(true);
            const tx = await contract.unpause();
            const receipt = await tx.wait();
            console.log('Contract unpaused:', receipt);
            return receipt;
        } catch (error) {
            console.error('Error unpausing contract:', error);
            throw error;
        } finally{
            setIsLoading(false);
        }
    };
    // Event listeners for account/chain changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VotingProvider.useEffect": ()=>{
            if (window.ethereum) {
                const handleAccountsChanged = {
                    "VotingProvider.useEffect.handleAccountsChanged": (accounts)=>{
                        if (accounts.length === 0) {
                            disconnectWallet();
                        } else if (accounts[0] !== account) {
                            setAccount(accounts[0]);
                        }
                    }
                }["VotingProvider.useEffect.handleAccountsChanged"];
                const handleChainChanged = {
                    "VotingProvider.useEffect.handleChainChanged": (chainId)=>{
                        setChainId(chainId);
                        window.location.reload(); // Reload to reset the app state
                    }
                }["VotingProvider.useEffect.handleChainChanged"];
                window.ethereum.on('accountsChanged', handleAccountsChanged);
                window.ethereum.on('chainChanged', handleChainChanged);
                // Cleanup listeners
                return ({
                    "VotingProvider.useEffect": ()=>{
                        if (window.ethereum.removeListener) {
                            window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
                            window.ethereum.removeListener('chainChanged', handleChainChanged);
                        }
                    }
                })["VotingProvider.useEffect"];
            }
        }
    }["VotingProvider.useEffect"], [
        account
    ]);
    // Auto-connect if previously connected
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VotingProvider.useEffect": ()=>{
            const autoConnect = {
                "VotingProvider.useEffect.autoConnect": async ()=>{
                    try {
                        if (window.ethereum) {
                            const accounts = await window.ethereum.request({
                                method: 'eth_accounts'
                            });
                            if (accounts.length > 0) {
                                await connectWallet();
                            }
                        }
                    } catch (error) {
                        console.error('Auto-connect failed:', error);
                    }
                }
            }["VotingProvider.useEffect.autoConnect"];
            autoConnect();
        }
    }["VotingProvider.useEffect"], []);
    const contextValue = {
        // State
        account,
        provider,
        signer,
        contract,
        isConnected,
        isLoading,
        chainId,
        // Wallet functions
        connectWallet,
        disconnectWallet,
        // Election management
        createElection,
        addCandidate,
        // Voter functions
        registerVoter,
        castVote,
        // View functions
        getElectionDetails,
        getCandidateDetails,
        getElectionCandidates,
        getVoterStatus,
        getElectionResults,
        getCurrentElectionId,
        // Admin functions
        setElectionStatus,
        setCandidateStatus,
        grantElectionCommissionRole,
        revokeElectionCommissionRole,
        pauseContract,
        unpauseContract
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(VotingContext.Provider, {
        value: contextValue,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/ContractContext.js",
        lineNumber: 470,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(VotingProvider, "h9VxzFJDqJedu+EwlP2t80FnRYY=");
_c = VotingProvider;
var _c;
__turbopack_context__.k.register(_c, "VotingProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_1c4a604b._.js.map