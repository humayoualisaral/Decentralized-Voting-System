'use client';
import { useState, useEffect } from 'react';

export default function CastVoteForm() {
  const [candidateId, setCandidateId] = useState('');
  const [pin, setPin] = useState('');
  const [cnic, setCnic] = useState('');
  const [voterAddress, setVoterAddress] = useState('');
  const [status, setStatus] = useState('');

  // Fetch wallet address
//   useEffect(() => {
//     (async () => {
//       if ((window as any).ethereum) {
//         const [account] = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
//         setVoterAddress(account);
//       }
//     })();
//   }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log('Casting vote with:', { candidateId, pin, cnic, voterAddress });

    try {
      // Contract interaction goes here
      setStatus('✅ Vote submitted successfully');
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to cast vote');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-black text-white p-6 rounded-xl shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-green-400">🗳️ Cast Vote</h2>

      <input
        type="text"
        placeholder="Connected Wallet Address"
        value={voterAddress}
        readOnly
        className="w-full p-2 rounded border bg-gray-800 border-gray-700 text-gray-400"
      />

      <input
        type="number"
        placeholder="Your CNIC"
        value={cnic}
        onChange={(e) => setCnic(e.target.value)}
        className="w-full p-2 rounded border bg-gray-900 border-gray-700 placeholder-gray-400"
      />

      <input
        type="number"
        placeholder="Candidate ID"
        value={candidateId}
        onChange={(e) => setCandidateId(e.target.value)}
        className="w-full p-2 rounded border bg-gray-900 border-gray-700 placeholder-gray-400"
      />

      <input
        type="password"
        placeholder="Your Secret PIN"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        className="w-full p-2 rounded border bg-gray-900 border-gray-700 placeholder-gray-400"
      />

      <button type="submit" className="bg-green-500 text-black px-4 py-2 rounded">Submit Vote</button>
      {status && <p className="text-sm text-gray-300 mt-2">{status}</p>}
    </form>
  );
}
