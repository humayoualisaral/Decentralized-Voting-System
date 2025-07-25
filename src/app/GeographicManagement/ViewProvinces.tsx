'use client';
import { useState } from 'react';

export default function ViewProvinces() {
  const [provinces, setProvinces] = useState<string[]>([]);

  const fetchProvinces = async () => {
    console.log("Fetching provinces...");
    // Call smart contract
    // setProvinces([...])
  };

  return (
    <div className="bg-black text-white p-6 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-blue-400">All Provinces</h2>
      <button onClick={fetchProvinces} className="bg-blue-500 text-black px-3 py-1 rounded">Fetch</button>
      <ul className="list-disc list-inside mt-2">
        {provinces.map((p, i) => <li key={i}>{p}</li>)}
      </ul>
    </div>
  );
}
