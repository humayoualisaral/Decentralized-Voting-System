'use client';
import { useState } from 'react';

export default function PartyList() {
  const [parties, setParties] = useState<string[]>([]);

  const fetchParties = async () => {
    console.log('Fetching all parties...');
    // Call getAllParties() here
    // setParties(['Party A', 'Party B']);
  };

  return (
    <div className="bg-black text-white p-6 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-blue-400">Registered Political Parties</h2>
      <button onClick={fetchParties} className="bg-blue-500 text-black px-4 py-2 rounded">
        Show Parties
      </button>
      <ul className="list-disc list-inside mt-2">
        {parties.map((party, index) => (
          <li key={index}>{party}</li>
        ))}
      </ul>
    </div>
  );
}
