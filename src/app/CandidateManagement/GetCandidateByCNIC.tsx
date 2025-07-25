'use client';
import { useState } from 'react';

export default function GetCandidateByCNIC() {
  const [cnic, setCnic] = useState('');
  const [candidate, setCandidate] = useState<any>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log('Fetching by CNIC:', cnic);
    // Call contract and set result in candidate
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-black rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Get Candidate by CNIC</h2>
      <input
        type="text"
        name="cnic"
        placeholder="Enter CNIC"
        value={cnic}
        onChange={(e) => setCnic(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-purple-500 text-white p-2 rounded">Search</button>

      {candidate && (
        <div className="mt-4 border p-2 rounded">
          <p>ID: {candidate.id}</p>
          <p>Name: {candidate.name} {candidate.lastName}</p>
          <p>Party: {candidate.party}</p>
          <p>Province: {candidate.province}</p>
          <p>Constituency: {candidate.constituency}</p>
        </div>
      )}
    </form>
  );
}
