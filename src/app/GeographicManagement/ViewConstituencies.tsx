'use client';
import { useState } from 'react';

export default function ViewConstituencies() {
  const [province, setProvince] = useState('');
  const [constituencies, setConstituencies] = useState<string[]>([]);

  const handleFetch = async () => {
    console.log('Fetching for:', province);
    // Call smart contract
  };

  return (
    <div className="bg-black text-white p-6 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-pink-400">Constituencies by Province</h2>
      <input
        type="text"
        placeholder="Enter Province"
        value={province}
        onChange={(e) => setProvince(e.target.value)}
        className="w-full p-2 rounded border bg-gray-900 border-gray-700 placeholder-gray-400"
      />
      <button onClick={handleFetch} className="bg-pink-400 text-black px-3 py-1 rounded">Fetch</button>
      <ul className="list-disc list-inside mt-2">
        {constituencies.map((c, i) => <li key={i}>{c}</li>)}
      </ul>
    </div>
  );
}
