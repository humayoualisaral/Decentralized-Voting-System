'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="md:flex md:items-center md:justify-between p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">VotingMachine</h1>
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 mt-2 md:mt-0">
          <li><Link href="/registration">Nadra</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col w-full bg-gray-900 text-white">
          <li className="border-b border-gray-700 p-4"><Link href="/registration">Nadra</Link></li>
          <li className="border-b border-gray-700 p-4"><Link href="/about">About</Link></li>
          <li className="border-b border-gray-700 p-4"><Link href="/services">Services</Link></li>
          <li className="border-b border-gray-700 p-4"><Link href="/contact">Contact</Link></li>
        </ul>
      )}
    </nav>
  );
}
