import { useVoting } from "@/context/ContractContext";
import { useState } from "react";
import { 
  Calendar, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  ArrowLeft,
  Loader2,
  Vote
} from 'lucide-react';

// Create Election Form
const CreateElectionForm = () => {
  const [newElection, setNewElection] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { createElection, isLoading } = useVoting();

  const handleCreateElection = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const startTimestamp = Math.floor(new Date(newElection.startTime).getTime() / 1000);
      const endTimestamp = Math.floor(new Date(newElection.endTime).getTime() / 1000);
      
      await createElection(
        newElection.title,
        newElection.description,
        startTimestamp,
        endTimestamp
      );
      
      setSuccess('Election created successfully!');
      setNewElection({ title: '', description: '', startTime: '', endTime: '' });
      await loadElections(); // Reload data
    } catch (err) {
      console.error('Failed to create election:', err);
      setError('Failed to create election: ' + err.message);
    }
  };

  // Helper function to get current datetime in local format
  const getCurrentDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  // Helper function to validate dates
  const isValidDateRange = () => {
    if (!newElection.startTime || !newElection.endTime) return true;
    return new Date(newElection.startTime) < new Date(newElection.endTime);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-[10px] mb-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <img 
              src="/SOS-EXPLAINER-3-AUDITS-xxsmall.gif"
              alt="Election Animation"
              className="w-[150px] h-[150px] rounded-xl shadow-lg"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
            <div>
              <h1 className="text-3xl font-bold">Create New Election</h1>
              <p className="text-blue-100 mt-2">Set up a new democratic voting process on the blockchain</p>
            </div>
          </div>
        
        </div>
      </div>

      {/* Alert Messages */}
      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
          <div className="flex">
            <CheckCircle className="h-5 w-5 text-green-400" />
            <div className="ml-3">
              <p className="text-sm text-green-700 font-medium">{success}</p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Election Details</h2>
          <p className="text-sm text-gray-600 mt-1">Fill in the information below to create a new election</p>
        </div>

        <div className="p-8 space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Basic Information
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Election Title *
                </label>
                <input
                  type="text"
                  value={newElection.title}
                  onChange={(e) => setNewElection({...newElection, title: e.target.value})}
                  placeholder="Enter a descriptive title for your election"
                  className="w-full px-4 py-3 text-black bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 font-medium"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Election Description *
                </label>
                <textarea
                  value={newElection.description}
                  onChange={(e) => setNewElection({...newElection, description: e.target.value})}
                  rows="4"
                  placeholder="Provide a detailed description of the election purpose and scope"
                  className="w-full px-4 py-3 text-black bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 placeholder-gray-400 font-medium resize-none"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">
                  Describe the election goals, voting criteria, and any important information for voters
                </p>
              </div>
            </div>
          </div>

          {/* Timeline Configuration */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-green-600" />
              Timeline Configuration
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <Calendar className="w-4 h-4 inline mr-2 text-green-500" />
                  Start Date & Time *
                </label>
                <input
                  type="datetime-local"
                  value={newElection.startTime}
                  onChange={(e) => setNewElection({...newElection, startTime: e.target.value})}
                  min={getCurrentDateTime()}
                  className="w-full px-4 py-3 text-black bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-medium"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">When voting will begin</p>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <Calendar className="w-4 h-4 inline mr-2 text-red-500" />
                  End Date & Time *
                </label>
                <input
                  type="datetime-local"
                  value={newElection.endTime}
                  onChange={(e) => setNewElection({...newElection, endTime: e.target.value})}
                  min={newElection.startTime || getCurrentDateTime()}
                  className="w-full px-4 py-3 text-black bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 font-medium"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">When voting will end</p>
              </div>
            </div>

            {/* Date validation warning */}
            {newElection.startTime && newElection.endTime && !isValidDateRange() && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-amber-400" />
                  <div className="ml-3">
                    <p className="text-sm text-amber-700 font-medium">
                      Invalid date range: End time must be after start time
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Duration display */}
            {newElection.startTime && newElection.endTime && isValidDateRange() && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-blue-700">
                      Election Duration: {Math.ceil((new Date(newElection.endTime) - new Date(newElection.startTime)) / (1000 * 60 * 60 * 24))} days
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      From {new Date(newElection.startTime).toLocaleDateString()} to {new Date(newElection.endTime).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 font-semibold transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </button>
            
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                handleCreateElection(e);
              }}
              disabled={isLoading || !isValidDateRange()}
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl hover:from-blue-600 hover:to-indigo-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Creating Election...</span>
                </>
              ) : (
                <>
                  <Vote className="h-5 w-5" />
                  <span>Create Election</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Form Guidelines */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-8 py-6 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">📋 Guidelines</h4>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
              Choose a clear, descriptive title that voters will easily understand
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
              Provide detailed description including voting criteria and objectives
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
              Ensure adequate time between start and end dates for proper voting
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
              Once created, you can add candidates to this election
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateElectionForm;