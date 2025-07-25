'use client';
import { useState } from 'react';

export default function RemoveVoterForm() {
  const [address, setAddress] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log('Removing voter address:', address);
    // Call contract function here
  };

  return (
    <form onSubmit={handleSubmit} className="bg-black text-white p-6 rounded-xl shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-red-400">Remove Voter</h2>
      <input
        type="text"
        name="address"
        placeholder="Voter Ethereum Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full p-2 rounded border bg-gray-900 border-gray-700 placeholder-gray-400"
      />
      <button type="submit" className="bg-red-500 text-black font-semibold p-2 rounded hover:bg-red-600">
        Remove
      </button>
    </form>
  );
}
