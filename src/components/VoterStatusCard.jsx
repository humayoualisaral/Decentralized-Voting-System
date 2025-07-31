'use client';

import React from 'react';
import { CheckCircle, AlertCircle, UserCheck, Clock, Vote } from 'lucide-react';

const VoterStatusCard = ({ voterStatus, electionId }) => {
  const getStatusConfig = () => {
    if (!voterStatus.isRegistered) {
      return {
        icon: AlertCircle,
        title: 'Registration Required',
        description: 'You need to register before you can participate in elections.',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        iconColor: 'text-orange-600',
        actionButton: {
          text: 'Register Now',
          color: 'bg-orange-600 hover:bg-orange-700'
        }
      };
    }
    
    if (voterStatus.hasVoted) {
      return {
        icon: CheckCircle,
        title: 'Vote Successfully Cast',
        description: `You have already voted in this election. Thank you for participating!`,
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        iconColor: 'text-green-600',
        actionButton: null
      };
    }
    
    return {
      icon: UserCheck,
      title: 'Ready to Vote',
      description: 'You are registered and eligible to cast your vote in active elections.',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      iconColor: 'text-blue-600',
      actionButton: {
        text: 'Find Elections',
        color: 'bg-blue-600 hover:bg-blue-700'
      }
    };
  };

  const config = getStatusConfig();
  const StatusIcon = config.icon;

  return (
    <div className={`${config.bgColor} ${config.borderColor} border rounded-lg p-6 mb-6`}>
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-12 h-12 ${config.iconColor} bg-white rounded-lg flex items-center justify-center`}>
          <StatusIcon className="w-6 h-6" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {config.title}
          </h3>
          <p className="text-gray-600 mb-4">
            {config.description}
          </p>
          
          {/* Status Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${
                voterStatus.isRegistered ? 'bg-green-500' : 'bg-gray-300'
              }`}></div>
              <span className={voterStatus.isRegistered ? 'text-green-700' : 'text-gray-500'}>
                Registration Status: {voterStatus.isRegistered ? 'Registered' : 'Not Registered'}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full ${
                voterStatus.hasVoted ? 'bg-blue-500' : 'bg-gray-300'
              }`}></div>
              <span className={voterStatus.hasVoted ? 'text-blue-700' : 'text-gray-500'}>
                Voting Status: {voterStatus.hasVoted ? 'Voted' : 'Not Voted'}
              </span>
            </div>
          </div>

          {/* Action Button */}
          {config.actionButton && (
            <button className={`${config.actionButton.color} text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center gap-2`}>
              {config.actionButton.text === 'Register Now' && <UserCheck className="w-4 h-4" />}
              {config.actionButton.text === 'Find Elections' && <Vote className="w-4 h-4" />}
              {config.actionButton.text}
            </button>
          )}

          {/* Additional Info for Voted Status */}
          {voterStatus.hasVoted && voterStatus.votedCandidateId && voterStatus.votedCandidateId !== '0' && (
            <div className="mt-4 p-3 bg-white rounded-lg border border-green-200">
              <div className="flex items-center gap-2 text-sm text-green-700">
                <Vote className="w-4 h-4" />
                <span>You voted for candidate #{voterStatus.votedCandidateId}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoterStatusCard;