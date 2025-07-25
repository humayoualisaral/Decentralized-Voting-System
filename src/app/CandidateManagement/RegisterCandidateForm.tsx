'use client';
import { useState } from 'react';

export default function RegisterCandidateForm() {
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    cnic: '',
    party: '',
    province: '',
    constituency: '',
  });

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log('Registering candidate:', form);
    // Call contract function here
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-grey rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Register Candidate</h2>
      {['name', 'lastName', 'cnic', 'party', 'province', 'constituency'].map((field) => (
        <input
          key={field}
          name={field}
          type="text"
          placeholder={field}
          value={(form as any)[field]}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      ))}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Register</button>
    </form>
  );
}
