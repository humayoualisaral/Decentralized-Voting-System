'use client';
import { useState } from 'react';

export default function AddProvinceForm() {
  const [provinceList, setProvinceList] = useState(['']);
  
  const handleChange = (index: number, value: string) => {
    const updated = [...provinceList];
    updated[index] = value;
    setProvinceList(updated);
  };

  const addField = () => setProvinceList([...provinceList, '']);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Adding provinces:', provinceList);
    // Contract call
  };

  return (
    <form onSubmit={handleSubmit} className="bg-black text-white p-6 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-green-400">Add Provinces</h2>
      {provinceList.map((val, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Province ${i + 1}`}
          value={val}
          onChange={(e) => handleChange(i, e.target.value)}
          className="w-full p-2 rounded border bg-gray-900 border-gray-700 placeholder-gray-400"
        />
      ))}
      <div className="flex space-x-2">
        <button type="button" onClick={addField} className="bg-gray-700 text-white px-3 py-1 rounded">+ Add Field</button>
        <button type="submit" className="bg-green-500 text-black px-3 py-1 rounded">Submit</button>
      </div>
    </form>
  );
}
