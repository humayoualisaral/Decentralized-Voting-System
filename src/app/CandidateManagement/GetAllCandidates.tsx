'use client';
import { useState } from 'react';

export default function GetAllCandidates() {
  const [candidates, setCandidates] = useState<any[]>([]);

  const fetchCandidates = async () => {
    console.log('Fetching candidates...');
    // Call contract function here and set results
  };

  return (
    <div className="p-4 bg-yellow rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-2">All Candidates</h2>
      <button onClick={fetchCandidates} className="bg-green-500 text-white p-2 rounded mb-4">
        Load Candidates
      </button>
      {candidates.map((c, idx) => (
        <div key={idx} className="border p-2 rounded mb-2">
          <p><strong>{c.name} {c.lastName}</strong></p>
          <p>Party: {c.party} | Province: {c.province} | Constituency: {c.constituency}</p>
        </div>
      ))}
    </div>
  );
}
