'use client';
import { useState } from 'react';

export default function AddConstituenciesForm() {
  const [province, setProvince] = useState('');
  const [constituencies, setConstituencies] = useState(['']);

  const handleChange = (i: number, val: string) => {
    const updated = [...constituencies];
    updated[i] = val;
    setConstituencies(updated);
  };

  const addField = () => setConstituencies([...constituencies, '']);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Adding to:', province, constituencies);
    // Contract call
  };

  return (
    <form onSubmit={handleSubmit} className="bg-black text-white p-6 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-yellow-300">Add Constituencies</h2>
      <input
        type="text"
        placeholder="Province"
        value={province}
        onChange={(e) => setProvince(e.target.value)}
        className="w-full p-2 rounded border bg-gray-900 border-gray-700 placeholder-gray-400"
      />
      {constituencies.map((val, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Constituency ${i + 1}`}
          value={val}
          onChange={(e) => handleChange(i, e.target.value)}
          className="w-full p-2 rounded border bg-gray-900 border-gray-700 placeholder-gray-400"
        />
      ))}
      <div className="flex space-x-2">
        <button type="button" onClick={addField} className="bg-gray-700 px-3 py-1 rounded">+ Add Field</button>
        <button type="submit" className="bg-yellow-400 text-black px-3 py-1 rounded">Submit</button>
      </div>
    </form>
  );
}
