import { useVoting } from "@/context/ContractContext";
import { useState } from "react";

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
    const {createElection,isLoading}=useVoting()
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

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Election</h2>
          
          <form onSubmit={handleCreateElection} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Election Title
              </label>
              <input
                type="text"
                value={newElection.title}
                onChange={(e) => setNewElection({...newElection, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={newElection.description}
                onChange={(e) => setNewElection({...newElection, description: e.target.value})}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time
                </label>
                <input
                  type="datetime-local"
                  value={newElection.startTime}
                  onChange={(e) => setNewElection({...newElection, startTime: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time
                </label>
                <input
                  type="datetime-local"
                  value={newElection.endTime}
                  onChange={(e) => setNewElection({...newElection, endTime: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <span>Create Election</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default CreateElectionForm