'use client';
import { useState } from 'react';

export default function RemoveCandidateForm() {
  const [candidateId, setCandidateId] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log('Removing candidate ID:', candidateId);
    // Call contract function here
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-black rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Remove Candidate</h2>
      <input
        type="number"
        name="candidateId"
        placeholder="Candidate ID"
        value={candidateId}
        onChange={(e) => setCandidateId(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-red-500 text-white p-2 rounded">Remove</button>
    </form>
  );
}
