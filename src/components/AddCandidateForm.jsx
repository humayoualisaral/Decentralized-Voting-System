import { useVoting } from "@/context/ContractContext";
import { useEffect, useState } from "react";
import { Loader2, Upload, X, Image as ImageIcon, CheckCircle, Star } from "lucide-react";

const AddCandidateForm = () => {
  const {
    addCandidate,
    isLoading,
    isConnected,
    getCurrentElectionId,
    getElectionDetails,
    getElectionCandidates
  } = useVoting();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [elections, setElections] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalElections: 0,
    activeElections: 0,
    totalCandidates: 0,
    totalVotes: 0
  });

  const [newCandidate, setNewCandidate] = useState({
    name: '',
    partyName: '',
    symbol: '',
    imageHash: '',
    electionId: ''
  });

  // Candidate Image Upload States
  const [selectedCandidateImage, setSelectedCandidateImage] = useState(null);
  const [candidateImagePreview, setCandidateImagePreview] = useState(null);
  const [uploadingCandidateToIpfs, setUploadingCandidateToIpfs] = useState(false);
  const [candidateIpfsHash, setCandidateIpfsHash] = useState('');

  // Symbol Image Upload States
  const [selectedSymbolImage, setSelectedSymbolImage] = useState(null);
  const [symbolImagePreview, setSymbolImagePreview] = useState(null);
  const [uploadingSymbolToIpfs, setUploadingSymbolToIpfs] = useState(false);
  const [symbolIpfsHash, setSymbolIpfsHash] = useState('');

  // IPFS Configuration - Add these to your environment variables
  const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
  const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;

  const handleCandidateImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file for candidate photo');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError('Candidate image size should be less than 5MB');
        return;
      }

      setSelectedCandidateImage(file);
      setError('');

      const reader = new FileReader();
      reader.onload = (event) => {
        setCandidateImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSymbolImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file for symbol');
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        setError('Symbol image size should be less than 2MB');
        return;
      }

      setSelectedSymbolImage(file);
      setError('');

      const reader = new FileReader();
      reader.onload = (event) => {
        setSymbolImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToIPFS = async (file, type) => {
    if (!file) {
      setError(`Please select a ${type} image first`);
      return null;
    }

    if (!PINATA_API_KEY || !PINATA_SECRET_KEY) {
      setError('IPFS configuration missing. Please add Pinata API keys to environment variables.');
      return null;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Add metadata
      const metadata = JSON.stringify({
        name: `${type}-${newCandidate.name || 'image'}`,
        keyvalues: {
          type: `candidate-${type}`,
          candidateName: newCandidate.name,
          partyName: newCandidate.partyName,
          imageType: type
        }
      });
      formData.append('pinataMetadata', metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append('pinataOptions', options);

      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        headers: {
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_KEY,
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.IpfsHash;

    } catch (err) {
      console.error(`IPFS upload error for ${type}:`, err);
      setError(`Failed to upload ${type} to IPFS: ` + err.message);
      return null;
    }
  };

  const uploadCandidateImageToIPFS = async () => {
    setUploadingCandidateToIpfs(true);
    setError('');

    const hash = await uploadToIPFS(selectedCandidateImage, 'photo');
    
    if (hash) {
      setCandidateIpfsHash(hash);
      setNewCandidate({...newCandidate, imageHash: hash});
      setSuccess('Candidate photo uploaded to IPFS successfully!');
      setTimeout(() => setSuccess(''), 3000);
    }

    setUploadingCandidateToIpfs(false);
  };

  const uploadSymbolImageToIPFS = async () => {
    setUploadingSymbolToIpfs(true);
    setError('');

    const hash = await uploadToIPFS(selectedSymbolImage, 'symbol');
    
    if (hash) {
      setSymbolIpfsHash(hash);
      setNewCandidate({...newCandidate, symbol: hash});
      setSuccess('Symbol image uploaded to IPFS successfully!');
      setTimeout(() => setSuccess(''), 3000);
    }

    setUploadingSymbolToIpfs(false);
  };

  const removeCandidateImage = () => {
    setSelectedCandidateImage(null);
    setCandidateImagePreview(null);
    setCandidateIpfsHash('');
    setNewCandidate({...newCandidate, imageHash: ''});
    setSuccess('');
    setError('');
  };

  const removeSymbolImage = () => {
    setSelectedSymbolImage(null);
    setSymbolImagePreview(null);
    setSymbolIpfsHash('');
    setNewCandidate({...newCandidate, symbol: ''});
    setSuccess('');
    setError('');
  };

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');

      // Validate that both images are uploaded to IPFS
      if (!newCandidate.imageHash) {
        setError('Please upload candidate photo to IPFS first');
        return;
      }

      if (!newCandidate.symbol) {
        setError('Please upload symbol image to IPFS first');
        return;
      }

      await addCandidate(
        parseInt(newCandidate.electionId),
        newCandidate.name,
        newCandidate.imageHash,
        newCandidate.partyName,
        newCandidate.symbol // This now contains the IPFS hash of the symbol image
      );
      
      setSuccess('Candidate added successfully!');
      setNewCandidate({ name: '', partyName: '', symbol: '', imageHash: '', electionId: '' });
      removeCandidateImage();
      removeSymbolImage();
      await loadCandidates(); // Reload data
    } catch (err) {
      console.error('Failed to add candidate:', err);
      setError('Failed to add candidate: ' + err.message);
    }
  };

  useEffect(() => {
    if (isConnected) {
      loadElections();
    }
  }, [isConnected]);

  const updateDashboardStats = (electionsList) => {
    const stats = {
      totalElections: electionsList.length,
      activeElections: electionsList.filter(e => e.isActive).length,
      totalCandidates: electionsList.reduce((sum, e) => sum + e.candidatesCount, 0),
      totalVotes: electionsList.reduce((sum, e) => sum + parseInt(e.totalVotes), 0)
    };
    setDashboardStats(stats);
  };

  const loadElections = async () => {
    try {
      if (!isConnected) return;
      
      const currentId = await getCurrentElectionId();
      const electionsList = [];
      
      for (let i = 1; i <= parseInt(currentId); i++) {
        try {
          const election = await getElectionDetails(i);
          const candidateIds = await getElectionCandidates(i);
          
          electionsList.push({
            ...election,
            candidatesCount: candidateIds.length
          });
        } catch (err) {
          console.log(`Election ${i} not found or error:`, err);
        }
      }
      
      setElections(electionsList);
      updateDashboardStats(electionsList);
    } catch (err) {
      console.error('Error loading elections:', err);
      setError('Failed to load elections');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Candidate</h2>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <p className="text-green-600 text-sm">{success}</p>
          </div>
        )}
        
        <form onSubmit={handleAddCandidate} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Election
            </label>
            <select
              value={newCandidate.electionId}
              onChange={(e) => setNewCandidate({...newCandidate, electionId: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select Election</option>
              {elections.map(election => (
                <option key={election.electionId} value={election.electionId}>
                  {election.title}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Candidate Name
            </label>
            <input
              type="text"
              value={newCandidate.name}
              onChange={(e) => setNewCandidate({...newCandidate, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Party Name
            </label>
            <input
              type="text"
              value={newCandidate.partyName}
              onChange={(e) => setNewCandidate({...newCandidate, partyName: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Symbol Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Party Symbol Image
            </label>
            
            {!symbolImagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSymbolImageSelect}
                  className="hidden"
                  id="symbol-upload"
                />
                <label htmlFor="symbol-upload" className="cursor-pointer">
                  <Star className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600 mb-2">
                    Click to select party symbol image
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 2MB (recommended: square format)
                  </p>
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative inline-block">
                  <img
                    src={symbolImagePreview}
                    alt="Symbol Preview"
                    className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={removeSymbolImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                {!symbolIpfsHash ? (
                  <button
                    type="button"
                    onClick={uploadSymbolImageToIPFS}
                    disabled={uploadingSymbolToIpfs}
                    className="flex items-center space-x-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploadingSymbolToIpfs ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Uploading Symbol to IPFS...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        <span>Upload Symbol to IPFS</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">Symbol uploaded to IPFS</span>
                    <span className="text-xs text-gray-500 font-mono">
                      {symbolIpfsHash.substring(0, 10)}...
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Candidate Image Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Candidate Photo
            </label>
            
            {!candidateImagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCandidateImageSelect}
                  className="hidden"
                  id="candidate-image-upload"
                />
                <label htmlFor="candidate-image-upload" className="cursor-pointer">
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-sm text-gray-600 mb-2">
                    Click to select candidate photo
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative inline-block">
                  <img
                    src={candidateImagePreview}
                    alt="Candidate Preview"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={removeCandidateImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                
                {!candidateIpfsHash ? (
                  <button
                    type="button"
                    onClick={uploadCandidateImageToIPFS}
                    disabled={uploadingCandidateToIpfs}
                    className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {uploadingCandidateToIpfs ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Uploading Photo to IPFS...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        <span>Upload Photo to IPFS</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">Photo uploaded to IPFS</span>
                    <span className="text-xs text-gray-500 font-mono">
                      {candidateIpfsHash.substring(0, 10)}...
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* IPFS Hash Display Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Candidate Photo IPFS Hash
              </label>
              <input
                type="text"
                value={newCandidate.imageHash}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm font-mono"
                placeholder="Auto-filled after photo upload"
                readOnly
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Symbol Image IPFS Hash
              </label>
              <input
                type="text"
                value={newCandidate.symbol}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm font-mono"
                placeholder="Auto-filled after symbol upload"
                readOnly
              />
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isLoading || !newCandidate.imageHash || !newCandidate.symbol}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Adding...</span>
                </>
              ) : (
                <span>Add Candidate</span>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('candidates');
                removeCandidateImage();
                removeSymbolImage();
                setNewCandidate({ name: '', partyName: '', symbol: '', imageHash: '', electionId: '' });
              }}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* IPFS Configuration Help */}
      {(!PINATA_API_KEY || !PINATA_SECRET_KEY) && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">
            IPFS Configuration Required
          </h3>
          <p className="text-xs text-yellow-700 mb-2">
            To enable automatic IPFS uploads, add these environment variables:
          </p>
          <pre className="text-xs bg-yellow-100 p-2 rounded border font-mono">
{`NEXT_PUBLIC_PINATA_API_KEY=your_api_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_secret_key`}
          </pre>
          <p className="text-xs text-yellow-700 mt-2">
            Get your keys from <a href="https://pinata.cloud" target="_blank" rel="noopener noreferrer" className="underline">pinata.cloud</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default AddCandidateForm;