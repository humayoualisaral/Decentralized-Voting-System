'use client';
import { useState } from 'react';

export default function RegisterVoterForm() {
  const [form, setForm] = useState({
    cnic: '',
    name: '',
    lastName: '',
    province: '',
    constituency: '',
    password: '',
    pin: '',
  });

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log('Registering voter:', form);
    // Call contract function here
  };

  return (
    <form onSubmit={handleSubmit} className="bg-black text-white p-6 rounded-xl shadow-lg space-y-4">
      <h2 className="text-2xl font-bold text-green-400">Register Voter</h2>
      {['cnic', 'name', 'lastName', 'province', 'constituency', 'password', 'pin'].map((field) => (
        <input
          key={field}
          name={field}
          type={field === 'password' || field === 'pin' ? 'password' : 'text'}
          placeholder={field}
          value={(form as any)[field]}
          onChange={handleChange}
          className="w-full p-2 rounded border bg-gray-900 border-gray-700 placeholder-gray-400"
        />
      ))}
      <button type="submit" className="bg-green-500 text-black font-semibold p-2 rounded hover:bg-green-600">
        Register
      </button>
    </form>
  );
}
