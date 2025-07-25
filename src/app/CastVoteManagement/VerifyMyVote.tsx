'use client';
import { useState, useEffect } from 'react';

export default function VerifyMyVote() {
  const [candidateId, setCandidateId] = useState('');
  const [pin, setPin] = useState('');
  const [cnic, setCnic] = useState('');
  const [voterAddress, setVoterAddress] = useState('');
  const [isValid, setIsValid] = useState<null | boolean>(null);

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
    console.log('Verifying vote:', { candidateId, pin, cnic, voterAddress });

    try {
      // Call contract.verifyMyVote(...)
      const result = true; // mock
      setIsValid(result);
    } catch (err) {
      console.error(err);
      setIsValid(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-black text-white p-6 rounded-xl shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-yellow-300">🔍 Verify Your Vote</h2>

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
        placeholder="Enter your PIN"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        className="w-full p-2 rounded border bg-gray-900 border-gray-700 placeholder-gray-400"
      />

      <button type="submit" className="bg-yellow-400 text-black px-4 py-2 rounded">Verify</button>

      {isValid !== null && (
        <p className={`mt-4 text-lg ${isValid ? 'text-green-500' : 'text-red-500'}`}>
          {isValid ? '✅ Vote Verified!' : '❌ Vote does not match.'}
        </p>
      )}
    </form>
  );
}
