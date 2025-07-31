
import { Edit, User, AlertCircle, Trophy, Eye, Star } from 'lucide-react';
import { useState } from 'react';

const CandidateCard = ({ candidate, onToggleStatus, isLoading }) => {
  const [symbolImageError, setSymbolImageError] = useState(false);
  const [candidateImageError, setCandidateImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // IPFS Gateway URLs - you can use different gateways
  const IPFS_GATEWAY = 'https://ipfs.io/ipfs/';
  // Alternative gateways you can use:
  // const IPFS_GATEWAY = 'https://gateway.pinata.cloud/ipfs/';
  // const IPFS_GATEWAY = 'https://cloudflare-ipfs.com/ipfs/';

  const getIPFSUrl = (hash) => {
    if (!hash) return null;
    return `${IPFS_GATEWAY}${hash}`;
  };

  const handleSymbolImageError = () => {
    setSymbolImageError(true);
  };

  const handleCandidateImageError = () => {
    setCandidateImageError(true);
  };

  // Calculate vote percentage for visual representation (mock total for now)
  const mockTotalVotes = 1000;
  const votePercentage = (candidate.voteCount / mockTotalVotes) * 100;

  return (
    <div 
      className={`group relative bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/20 backdrop-blur-sm h-64 ${
        isHovered ? 'transform -translate-y-2 scale-[1.02]' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Decorative elements */}
      <div className="absolute top-2 left-2 w-16 h-16 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl" />
      <div className="absolute bottom-2 right-2 w-12 h-12 bg-gradient-to-br from-pink-400/10 to-orange-400/10 rounded-full blur-xl" />

      <div className="flex h-full">
        {/* Candidate Photo Left Side */}
        <div className="relative w-48 overflow-hidden">
          {candidate.imageHash && !candidateImageError ? (
            <div className="relative w-full h-full">
              <img
                src={getIPFSUrl(candidate.imageHash)}
                alt={`${candidate.name} photo`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={handleCandidateImageError}
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20" />
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-12" />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              {candidateImageError ? (
                <div className="text-center text-gray-500">
                  <AlertCircle className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                  <p className="text-xs font-medium">Image not available</p>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <User className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-xs font-medium">No photo</p>
                </div>
              )}
            </div>
          )}
          
          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg border backdrop-blur-sm transition-all duration-300 ${
              candidate.isActive 
                ? 'bg-emerald-100/90 text-emerald-800 border-emerald-200/50 shadow-emerald-500/25' 
                : 'bg-rose-100/90 text-rose-800 border-rose-200/50 shadow-rose-500/25'
            }`}>
              {candidate.isActive ? '🟢' : '🔴'}
            </span>
          </div>

          {/* Vote count floating badge */}
          <div className="absolute bottom-3 left-3">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl px-3 py-1 shadow-lg border border-white/20">
              <div className="flex items-center space-x-1">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {candidate.voteCount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Card Content - Right Side */}
        <div className="relative flex-1 p-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                {/* Party Symbol */}
                <div className={`relative flex-shrink-0 transition-all duration-300 ${
                  isHovered ? 'scale-110' : ''
                }`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg blur-sm opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
                  <div className="relative bg-white rounded-lg p-1.5 border border-gray-100 shadow-md">
                    {candidate.symbol && !symbolImageError ? (
                      <img
                        src={getIPFSUrl(candidate.symbol)}
                        alt={`${candidate.partyName} symbol`}
                        className="w-10 h-10 object-contain"
                        onError={handleSymbolImageError}
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                        {symbolImageError ? (
                          <AlertCircle className="h-6 w-6 text-gray-400" />
                        ) : (
                          <Star className="h-6 w-6 text-gray-400" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Candidate Info */}
                <div className="space-y-1 min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 truncate">
                    {candidate.name}
                  </h3>
                  <p className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full inline-block truncate max-w-full">
                    {candidate.partyName}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Vote Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-gray-700">Performance</span>
                <span className="font-bold text-blue-600">{votePercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out shadow-lg"
                  style={{ width: `${Math.min(votePercentage, 100)}%` }}
                />
              </div>
            </div>

            {/* Stats Grid - Compact */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-2 rounded-lg border border-blue-100">
                <div className="text-xs font-medium text-blue-600 mb-0.5">Photo</div>
                <div className="font-mono text-xs text-blue-800 truncate">
                  {candidate.imageHash ? `${candidate.imageHash.substring(0, 8)}...` : 'None'}
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-2 rounded-lg border border-purple-100">
                <div className="text-xs font-medium text-purple-600 mb-0.5">Symbol</div>
                <div className="font-mono text-xs text-purple-800 truncate">
                  {candidate.symbol ? `${candidate.symbol.substring(0, 8)}...` : 'None'}
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-2 pt-2">
            <button 
              onClick={() => onToggleStatus(candidate.candidateId, candidate.isActive)}
              disabled={isLoading}
              className={`flex-1 px-3 py-2 rounded-lg font-bold text-xs transition-all duration-300 disabled:opacity-50 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                candidate.isActive 
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white hover:from-rose-600 hover:to-pink-600 shadow-rose-500/25' 
                  : 'bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 shadow-emerald-500/25'
              }`}
            >
              {candidate.isActive ? '⏸️' : '▶️'}
            </button>
            
            <button className="px-3 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 rounded-lg hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 group/btn">
              <Edit className="h-4 w-4 group-hover/btn:rotate-12 transition-transform duration-300" />
            </button>
            
            <button className="px-3 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-lg hover:from-blue-200 hover:to-purple-200 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 group/btn">
              <Eye className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none" />
    </div>
  );
};

export default CandidateCard