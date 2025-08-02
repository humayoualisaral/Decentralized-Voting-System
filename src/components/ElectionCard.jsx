'use client';

import React from 'react';
import { Calendar, Users, CheckCircle, Clock, Eye, Activity, Award, Timer } from 'lucide-react';

const ElectionCard = ({ election, onSelect, showInactive = false }) => {
  const startDate = new Date(parseInt(election.startTime) * 1000);
  const endDate = new Date(parseInt(election.endTime) * 1000);
  const now = new Date();
  
  const isActive = election.isActive && now >= startDate && now <= endDate;
  const hasEnded = now > endDate;
  const hasNotStarted = now < startDate;
  
  const getStatusInfo = () => {
    if (!election.isActive) {
      return { 
        text: 'Inactive', 
        color: 'bg-gray-500/20 text-gray-300 border-gray-400/30', 
        icon: null,
        gradient: 'from-gray-400 to-gray-500'
      };
    }
    if (hasEnded) {
      return { 
        text: 'Ended', 
        color: 'bg-red-500/20 text-red-300 border-red-400/30', 
        icon: Timer,
        gradient: 'from-red-400 to-red-500'
      };
    }
    if (hasNotStarted) {
      return { 
        text: 'Upcoming', 
        color: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30', 
        icon: Clock,
        gradient: 'from-yellow-400 to-orange-400'
      };
    }
    return { 
      text: 'Active', 
      color: 'bg-green-500/20 text-green-300 border-green-400/30', 
      icon: Activity,
      gradient: 'from-green-400 to-emerald-400'
    };
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  const getTimeRemaining = () => {
    if (hasEnded) return 'Ended';
    if (hasNotStarted) {
      const days = Math.ceil((startDate - now) / (1000 * 60 * 60 * 24));
      return days === 1 ? 'Starts tomorrow' : `Starts in ${days} days`;
    }
    const days = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
    return days === 1 ? 'Ends tomorrow' : `${days} days left`;
  };

  const getProgressPercentage = () => {
    if (!isActive) return 0;
    const totalDuration = endDate - startDate;
    const elapsed = now - startDate;
    return Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
  };

  return (
    <div className={`bg-slate-800/90 backdrop-blur-lg rounded-2xl shadow-xl border transition-all duration-300 hover:shadow-2xl hover:scale-105 group overflow-hidden ${
      isActive 
        ? 'border-green-400/40 hover:border-green-400/60' 
        : 'border-slate-600/50 hover:border-slate-500/70'
    }`}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className={`absolute inset-0 bg-gradient-to-br ${statusInfo.gradient} opacity-5`}></div>
      </div>

      {/* Status indicator bar */}
      {isActive && (
        <div className="h-1 bg-gradient-to-r from-green-400 to-emerald-400 animate-pulse"></div>
      )}

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 pr-4">
            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-green-200 transition-colors duration-300">
              {election.title}
            </h3>
            <p className="text-slate-200 text-sm line-clamp-2 leading-relaxed">
              {election.description}
            </p>
          </div>
          
          <div className={`px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap flex items-center gap-2 border backdrop-blur-sm ${statusInfo.color}`}>
            {StatusIcon && <StatusIcon className="w-3 h-3" />}
            {statusInfo.text}
          </div>
        </div>

        {/* Election Metrics */}
        <div className="space-y-4 mb-6">
          {/* Date Range */}
          <div className="flex items-center gap-3 text-sm text-slate-200">
            <div className="w-8 h-8 bg-blue-500/30 rounded-lg flex items-center justify-center">
              <Calendar className="w-4 h-4 text-blue-300" />
            </div>
            <div>
              <p className="font-medium text-white">
                {startDate.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })} - {endDate.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </p>
              <p className="text-xs text-slate-300">{getTimeRemaining()}</p>
            </div>
          </div>
          
          {/* Vote Count */}
          <div className="flex items-center gap-3 text-sm text-slate-200">
            <div className="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-purple-300" />
            </div>
            <div>
              <p className="font-medium text-white">
                {parseInt(election.totalVotes || 0).toLocaleString()} votes cast
              </p>
              <p className="text-xs text-slate-300">
                {isActive ? 'Live counting' : 'Final count'}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar for Active Elections */}
        {isActive && (
          <div className="mb-6">
            <div className="flex justify-between text-xs text-slate-200 mb-2">
              <span>Election Progress</span>
              <span>{Math.round(getProgressPercentage())}%</span>
            </div>
            <div className="w-full bg-slate-600/50 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full transition-all duration-700 ease-out relative overflow-hidden"
                style={{ width: `${getProgressPercentage()}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={() => onSelect(election)}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 transform group-hover:scale-105 ${
            isActive
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-green-500/25'
              : 'bg-slate-700/70 hover:bg-slate-600/70 text-slate-200 hover:text-white border border-slate-600/50 hover:border-slate-500/70'
          }`}
        >
          {isActive ? (
            <>
              <Award className="w-5 h-5" />
              Vote Now
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              View Details
            </>
          )}
        </button>

        {/* Live indicator for active elections */}
        {isActive && (
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-2 bg-red-500/20 backdrop-blur-sm px-2 py-1 rounded-full border border-red-400/30">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-red-200 text-xs font-medium">LIVE</span>
            </div>
          </div>
        )}

        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      </div>

      {/* Bottom gradient accent */}
      {isActive && (
        <div className="h-1 bg-gradient-to-r from-transparent via-green-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
    </div>
  );
};

export default ElectionCard;