'use client';

import React, { useState } from 'react';
import { Vote, User, Calendar, BarChart3, ImageIcon } from 'lucide-react';

const CandidateCard = ({ 
  candidate, 
  onVoteNow, 
  canVote = false, 
  showResults = false, 
  totalVotes = 0 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [symbolError, setSymbolError] = useState(false);
  const [symbolLoading, setSymbolLoading] = useState(true);
  
  const voteCount = parseInt(candidate.voteCount || 0);
  const votePercentage = totalVotes > 0 ? ((voteCount / totalVotes) * 100).toFixed(1) : 0;
  const candidateDate = new Date(parseInt(candidate.timestamp) * 1000);

  // IPFS Gateway URLs (you can configure multiple fallbacks)
  const getIPFSUrl = (hash) => {
    if (!hash || hash === '0x' || hash === '') return null;
    
    // Remove 'Qm' prefix if it exists and hash starts with it
    const cleanHash = hash.startsWith('Qm') ? hash : hash.replace(/^0x/, '');
    
    // Primary IPFS gateways (you can add more for better reliability)
    const gateways = [
      `https://ipfs.io/ipfs/${cleanHash}`,
      `https://gateway.pinata.cloud/ipfs/${cleanHash}`,
      `https://cloudflare-ipfs.com/ipfs/${cleanHash}`,
      `https://dweb.link/ipfs/${cleanHash}`
    ];
    
    return gateways[0]; // Use primary gateway, can implement fallback logic
  };

  // Check if string is IPFS hash or regular emoji/text
  const isIPFSHash = (str) => {
    if (!str || typeof str !== 'string') return false;
    // Check if it looks like an IPFS hash (starts with Qm and is long enough)
    return str.startsWith('Qm') || (str.startsWith('0x') && str.length > 10);
  };

  const imageUrl = getIPFSUrl(candidate.imageHash);
  const hasValidImage = imageUrl && !imageError;
  
  const symbolUrl = isIPFSHash(candidate.symbol) ? getIPFSUrl(candidate.symbol) : null;
  const hasValidSymbol = symbolUrl && !symbolError;

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleSymbolError = () => {
    setSymbolError(true);
    setSymbolLoading(false);
  };

  const handleSymbolLoad = () => {
    setSymbolLoading(false);
    setSymbolError(false);
  };

  // Fallback Avatar Component
  const AvatarFallback = () => (
    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
      {candidate.name.charAt(0).toUpperCase()}
    </div>
  );

  // IPFS Image Component
  const IPFSImage = () => (
    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-gray-100 relative">
      {imageLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <img
        src={imageUrl}
        alt={`${candidate.name} profile`}
        className={`w-full h-full object-cover transition-opacity duration-200 ${
          imageLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        style={{ display: imageError ? 'none' : 'block' }}
      />
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
          <ImageIcon className="w-6 h-6" />
        </div>
      )}
    </div>
  );

  // Symbol Component (handles both IPFS and regular emoji/text)
  const SymbolDisplay = () => {
    if (hasValidSymbol) {
      return (
        <div className="relative">
          {symbolLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          <img
            src={symbolUrl}
            alt="Party Symbol"
            className={`w-8 h-8 object-contain transition-opacity duration-200 ${
              symbolLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onError={handleSymbolError}
            onLoad={handleSymbolLoad}
            style={{ display: symbolError ? 'none' : 'block' }}
          />
          {symbolError && (
            <span className="text-2xl" title="Symbol failed to load">
              🏛️
            </span>
          )}
        </div>
      );
    } else {
      // Regular emoji or text symbol
      return (
        <span className="text-2xl" title="Party Symbol">
          {candidate.symbol || '🏛️'}
        </span>
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
      <div className="p-6">
        {/* Candidate Header */}
        <div className="flex items-center gap-4 mb-4">
          {/* Avatar - IPFS Image or Fallback */}
          {hasValidImage ? <IPFSImage /> : <AvatarFallback />}
          
          {/* Candidate Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 truncate">
              {candidate.name}
            </h3>
            <p className="text-gray-600 text-sm truncate">
              {candidate.partyName}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <SymbolDisplay />
              <span className="text-xs text-gray-500">
                ID: {candidate.candidateId}
              </span>
            </div>
          </div>
        </div>

        {/* Candidate Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Added: {candidateDate.toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              candidate.isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {candidate.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Vote Count & Results */}
        {showResults && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Results</span>
              </div>
              <span className="text-lg font-bold text-gray-900">
                {voteCount} votes
              </span>
            </div>
            
            {/* Vote Percentage Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${votePercentage}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between text-xs text-gray-500">
              <span>{votePercentage}% of total votes</span>
              <span>{totalVotes} total</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex gap-2">
          {canVote && candidate.isActive ? (
            <button
              onClick={() => onVoteNow(candidate)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Vote className="w-4 h-4" />
              Vote Now
            </button>
          ) : (
            <button
              disabled
              className="flex-1 bg-gray-100 text-gray-500 font-medium py-2 px-4 rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Vote className="w-4 h-4" />
              {!candidate.isActive ? 'Inactive' : 'Voting Closed'}
            </button>
          )}
        </div>

        {/* Image Hash Info */}
        {(candidate.imageHash && candidate.imageHash !== '0x' && candidate.imageHash !== '') && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-gray-400 truncate" title={candidate.imageHash}>
                  Image: {candidate.imageHash.slice(0, 15)}...
                </p>
                {isIPFSHash(candidate.symbol) && (
                  <p className="text-xs text-gray-400 truncate mt-1" title={candidate.symbol}>
                    Symbol: {candidate.symbol.slice(0, 15)}...
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end space-y-1">
                {imageError && (
                  <span className="text-xs text-red-500">Image failed</span>
                )}
                {symbolError && isIPFSHash(candidate.symbol) && (
                  <span className="text-xs text-red-500">Symbol failed</span>
                )}
                {!imageError && imageUrl && (
                  <a 
                    href={imageUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-blue-500 hover:text-blue-700"
                  >
                    View Image
                  </a>
                )}
                {!symbolError && symbolUrl && (
                  <a 
                    href={symbolUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-blue-500 hover:text-blue-700"
                  >
                    View Symbol
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateCard;