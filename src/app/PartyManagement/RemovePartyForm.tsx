'use client';
import { useState } from 'react';

export default function RemovePartyForm() {
  const [party, setParty] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Removing party:', party);
    // Call smart contract here
  };

  return (
    <form onSubmit={handleSubmit} className="bg-black text-white p-6 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-red-400">Remove Political Party</h2>
      <input
        type="text"
        value={party}
        onChange={(e) => setParty(e.target.value)}
        placeholder="Party Name"
        className="w-full p-2 rounded border bg-gray-900 border-gray-700 placeholder-gray-400"
      />
      <button type="submit" className="bg-red-500 text-black px-4 py-2 rounded">
        Remove Party
      </button>
    </form>
  );
}
