import { useState } from 'react';
import { Plus } from 'lucide-react';
import CandidateSearchFilter from './CandidateSearchFilter';
import CandidateCard from './CandidateCard';

const CandidateManagement = ({ 
  candidates, 
  setActiveTab, 
  setCandidateStatus, 
  setError, 
  setSuccess, 
  isLoading,
  loadCandidates 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.partyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && candidate.isActive) ||
                         (filterStatus === 'inactive' && !candidate.isActive);
    return matchesSearch && matchesFilter;
  });

  const handleToggleCandidateStatus = async (candidateId, currentStatus) => {
    try {
      setError('');
      await setCandidateStatus(candidateId, !currentStatus);
      setSuccess('Candidate status updated successfully');
      await loadCandidates(); // Reload data
    } catch (err) {
      console.error('Error updating candidate status:', err);
      setError('Failed to update candidate status: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Candidate Management</h2>
        <button 
          onClick={() => setActiveTab('add-candidate')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Candidate</span>
        </button>
      </div>

      <CandidateSearchFilter 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredCandidates.map(candidate => (
          <CandidateCard
            key={candidate.candidateId}
            candidate={candidate}
            onToggleStatus={handleToggleCandidateStatus}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default CandidateManagement;