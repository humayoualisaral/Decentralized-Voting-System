'use client';

import React from 'react';
import { Calendar, Users, CheckCircle, Clock, Eye } from 'lucide-react';

const ElectionCard = ({ election, onSelect, showInactive = false }) => {
  const startDate = new Date(parseInt(election.startTime) * 1000);
  const endDate = new Date(parseInt(election.endTime) * 1000);
  const now = new Date();
  
  const isActive = election.isActive && now >= startDate && now <= endDate;
  const hasEnded = now > endDate;
  const hasNotStarted = now < startDate;
  
  const getStatusInfo = () => {
    if (!election.isActive) {
      return { text: 'Inactive', color: 'bg-gray-100 text-gray-800', icon: null };
    }
    if (hasEnded) {
      return { text: 'Ended', color: 'bg-red-100 text-red-800', icon: null };
    }
    if (hasNotStarted) {
      return { text: 'Upcoming', color: 'bg-yellow-100 text-yellow-800', icon: Clock };
    }
    return { text: 'Active', color: 'bg-green-100 text-green-800', icon: null };
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <div className={`bg-white rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md ${
      isActive ? 'border-l-4 border-l-green-500' : 'border-gray-200'
    }`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-2">
              {election.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2">
              {election.description}
            </p>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2 flex items-center gap-1 ${statusInfo.color}`}>
            {StatusIcon && <StatusIcon className="w-3 h-3" />}
            {statusInfo.text}
          </div>
        </div>

        {/* Election Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>
              {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
            </span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            <span>{election.totalVotes || '0'} votes cast</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onSelect(election)}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
            isActive
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
        >
          <Eye className="w-4 h-4" />
          {isActive ? 'View & Vote' : 'View Details'}
        </button>
      </div>

      {/* Progress Bar for Active Elections */}
      {isActive && (
        <div className="px-6 pb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(100, (now - startDate) / (endDate - startDate) * 100)}%`
              }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Started</span>
            <span>
              {Math.ceil((endDate - now) / (1000 * 60 * 60 * 24))} days left
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ElectionCard;