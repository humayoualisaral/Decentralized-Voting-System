'use client';

import React, { useState, useEffect } from 'react';
import { Vote, User, Calendar, BarChart3, Image, Award, Zap, Crown, Sparkles, Target, Flame } from 'lucide-react';

const CandidateCard = ({ 
  candidate, 
  onVoteNow, 
  canVote = false, 
  showResults = false, 
  totalVotes = 0,
  allCandidates = [] // Add this prop to compare with other candidates
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [symbolError, setSymbolError] = useState(false);
  const [symbolLoading, setSymbolLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0);
  
  const voteCount = parseInt(candidate.voteCount || 0);
  const votePercentage = totalVotes > 0 ? ((voteCount / totalVotes) * 100).toFixed(1) : 0;
  const candidateDate = new Date(parseInt(candidate.timestamp) * 1000);

  // Animated glow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlowIntensity(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // IPFS Gateway URLs
  const getIPFSUrl = (hash) => {
    if (!hash || hash === '0x' || hash === '') return null;
    const cleanHash = hash.startsWith('Qm') ? hash : hash.replace(/^0x/, '');
    const gateways = [
      `https://ipfs.io/ipfs/${cleanHash}`,
      `https://gateway.pinata.cloud/ipfs/${cleanHash}`,
      `https://cloudflare-ipfs.com/ipfs/${cleanHash}`,
      `https://dweb.link/ipfs/${cleanHash}`
    ];
    return gateways[0];
  };

  const isIPFSHash = (str) => {
    if (!str || typeof str !== 'string') return false;
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

  // Compact Avatar Component
  const AvatarFallback = () => (
    <div className="relative group flex-shrink-0">
      {/* Outer rotating ring */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 rounded-full animate-spin opacity-70"></div>
      
      {/* Main avatar */}
      <div className="relative w-24 h-24 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-black shadow-xl border border-white/20">
        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-full"></div>
        
        <span className="relative z-10 drop-shadow-lg tracking-wider">
          {candidate.name.charAt(0).toUpperCase()}
        </span>
      </div>
    </div>
  );

  // Compact IPFS Image Component
  const IPFSImage = () => (
    <div className="relative group flex-shrink-0">
      {/* Animated border */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 rounded-full animate-pulse opacity-50"></div>
      
      <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-xl border border-cyan-400/50">
        {/* Scanning line effect */}
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent h-0.5 transition-transform duration-2000 ${
          isHovered ? 'translate-y-full' : '-translate-y-full'
        }`}></div>
        
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900 z-20">
            <div className="relative">
              <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        )}
        
        <img
          src={imageUrl}
          alt={`${candidate.name} profile`}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onError={handleImageError}
          onLoad={handleImageLoad}
          style={{ display: imageError ? 'none' : 'block' }}
        />
        
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-cyan-400">
            <Image className="w-8 h-8 animate-pulse" />
          </div>
        )}
        
        {/* Holographic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-transparent to-purple-400/10 mix-blend-overlay"></div>
      </div>
    </div>
  );

  // Enhanced Symbol Component with better visibility
  const SymbolDisplay = () => {
    if (hasValidSymbol) {
      return (
        <div className="relative group flex-shrink-0">
          <div className="absolute inset-0 rounded-xl opacity-60 animate-pulse"></div>
          <div className="relative w-[120px] h-[120px] flex items-center justify-center">
            {symbolLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={symbolUrl}
              alt="Party Symbol"
              className={`w-[120px] h-[120px] object-contain transition-all duration-500 ${
                symbolLoading ? 'opacity-0 scale-0 rotate-180' : 'opacity-100 scale-100 rotate-0'
              }`}
              onError={handleSymbolError}
              onLoad={handleSymbolLoad}
              style={{ display: symbolError ? 'none' : 'block' }}
            />
            {symbolError && (
              <span className="text-2xl animate-bounce filter drop-shadow-lg" title="Symbol failed to load">
                🏛️
              </span>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="relative group flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl opacity-60 animate-pulse"></div>
          <div className="relative w-12 h-12 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 backdrop-blur-xl rounded-xl flex items-center justify-center border-2 border-yellow-400/60 shadow-lg">
            <span className="text-2xl filter drop-shadow-lg transform hover:scale-110 transition-transform duration-300" title="Party Symbol">
              {candidate.symbol || '🏛️'}
            </span>
          </div>
        </div>
      );
    }
  };

  // Fixed isLeading calculation
  const isLeading = showResults && totalVotes > 0 && voteCount > 0 && 
    allCandidates.length > 0 && 
    voteCount === Math.max(...allCandidates.map(c => parseInt(c.voteCount || 0)));

  return (
    <div 
      className={`relative group cursor-pointer transition-all duration-700 ${
        isHovered ? 'scale-102' : 'scale-100'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Epic outer glow */}
      <div className={`absolute -inset-2 bg-gradient-to-r opacity-0 group-hover:opacity-30 rounded-2xl transition-all duration-1000 ${
        isLeading 
          ? 'from-yellow-400 via-orange-500 to-yellow-400' 
          : 'from-purple-600 via-blue-500 to-cyan-400'
      }`}></div>

      {/* Main card with glass morphism */}
      <div className={`relative bg-slate-900/90 backdrop-blur-2xl rounded-2xl border overflow-hidden transition-all duration-700 ${
        isLeading 
          ? 'border-yellow-400/60 shadow-xl shadow-yellow-400/20' 
          : 'border-slate-600/50 group-hover:border-cyan-400/60 shadow-xl group-hover:shadow-cyan-400/10'
      }`}>
        
        {/* Epic leading indicator */}
        {isLeading && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400">
            <div className="h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse"></div>
          </div>
        )}

        {/* Matrix-style background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, cyan 1px, transparent 1px), radial-gradient(circle at 75% 75%, purple 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="relative p-6">
          {/* Floating leading badge */}
          {isLeading && (
            <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-xl text-xs font-black flex items-center gap-2 shadow-lg animate-bounce">
              <Crown className="w-3 h-3" />
              <span className="tracking-wider">CHAMPION</span>
            </div>
          )}

          {/* Compact header section with perfect alignment */}
          <div className="flex items-center gap-4 mb-6">
            {/* Avatar */}
            {hasValidImage ? <IPFSImage /> : <AvatarFallback />}
            
            {/* Name and Party */}
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-purple-200 mb-1 tracking-tight leading-tight truncate">
                {candidate.name}
              </h3>
              <p className="text-slate-300 text-sm font-semibold opacity-90 truncate">
                {candidate.partyName}
              </p>
            </div>
            
            {/* Symbol aligned to the right */}
            <SymbolDisplay />
          </div>

          {/* Compact info cards */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative group/card">
              <div className="relative p-3 bg-slate-800/60 backdrop-blur-xl rounded-xl border border-blue-400/30">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-blue-400 font-bold tracking-wider">REGISTERED</div>
                    <div className="text-white text-xs font-semibold">{candidateDate.toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 relative group/card">
              <div className="relative p-3 bg-slate-800/60 backdrop-blur-xl rounded-xl border border-green-400/30">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-lg">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-green-400 font-bold tracking-wider">STATUS</div>
                    <div className={`flex items-center gap-1 text-xs font-bold ${
                      candidate.isActive ? 'text-green-300' : 'text-red-300'
                    }`}>
                      <div className={`w-2 h-2 rounded-full ${
                        candidate.isActive ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                      }`}></div>
                      {candidate.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compact vote results section */}
          {showResults && (
            <div className="relative mb-6 group/results">
              <div className="relative p-5 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-2xl rounded-2xl border border-purple-400/30">
                
                {/* Results header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        LIVE RESULTS
                      </div>
                      <div className="text-xs text-slate-400 font-semibold">Real-time data</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
                      {voteCount.toLocaleString()}
                    </div>
                    <div className="text-xs text-purple-400 font-bold tracking-wider">VOTES</div>
                  </div>
                </div>
                
                {/* Compact progress bar */}
                <div className="relative mb-4">
                  <div className="w-full bg-slate-700/50 rounded-xl h-4 overflow-hidden border border-slate-600/50">
                    <div 
                      className={`h-4 rounded-xl relative overflow-hidden transition-all duration-2000 ease-out ${
                        isLeading 
                          ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400' 
                          : 'bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500'
                      }`}
                      style={{ width: `${Math.max(5, votePercentage)}%` }}
                    >
                      {/* Animated shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-pulse"></div>
                      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transition-transform duration-3000 ${
                        isHovered ? 'translate-x-full' : '-translate-x-full'
                      }`}></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                    <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                      {votePercentage}%
                    </span>
                    <span className="text-slate-400 text-xs font-semibold">of total</span>
                  </div>
                  <div className="text-slate-400 text-xs font-semibold">
                    {totalVotes.toLocaleString()} total
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Compact action button */}
          <div>
            {canVote && candidate.isActive ? (
              <button
                onClick={() => onVoteNow(candidate)}
                className="relative w-full group/button overflow-hidden"
              >
                <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-black py-4 px-6 rounded-xl transition-all duration-500 flex items-center justify-center gap-3 border-2 border-green-400/50 shadow-xl transform group-hover/button:scale-105">
                  <Vote className="w-5 h-5" />
                  <span className="text-lg tracking-wider">CAST VOTE</span>
                  <Zap className="w-4 h-4 animate-pulse" />
                </div>
              </button>
            ) : (
              <button
                disabled
                className="w-full bg-slate-700/50 text-slate-500 font-bold py-4 px-6 rounded-xl cursor-not-allowed flex items-center justify-center gap-3 border-2 border-slate-600/30"
              >
                <Vote className="w-5 h-5" />
                <span className="text-lg">{!candidate.isActive ? 'INACTIVE' : 'VOTING CLOSED'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom accent for active voting */}
        {canVote && candidate.isActive && (
          <div className={`h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent transition-all duration-700 ${
            isHovered ? 'opacity-100 shadow-lg shadow-green-400/50' : 'opacity-0'
          }`}>
            <div className="h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse"></div>
          </div>
        )}
      </div>

      {/* Floating elements */}
      <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400/20 rounded-full animate-ping opacity-0 group-hover:opacity-100"></div>
      <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-400/20 rounded-full animate-pulse opacity-0 group-hover:opacity-100"></div>
    </div>
  );
};

export default CandidateCard;