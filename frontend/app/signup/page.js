'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    if (!mobile || !password || !confirmPassword) {
      alert('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Save user to localStorage
    const userData = {
      mobile,
      password,
    };

    localStorage.setItem('registeredUser', JSON.stringify(userData));

    alert('Signup successful! Please login.');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-[#F2E9E4] flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md border-2 border-[#7B2CBF]/30">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#7B2CBF]">
          Signup
        </h1>

        <input
          className="w-full p-4 mb-4 border-2 border-gray-400 rounded-lg focus:border-[#7B2CBF] focus:outline-none text-gray-800 placeholder-gray-500"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <input
          className="w-full p-4 mb-4 border-2 border-gray-400 rounded-lg focus:border-[#7B2CBF] focus:outline-none text-gray-800 placeholder-gray-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="w-full p-4 mb-6 border-2 border-gray-400 rounded-lg focus:border-[#7B2CBF] focus:outline-none text-gray-800 placeholder-gray-500"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-[#7B2CBF] text-white p-4 rounded-lg font-semibold hover:bg-purple-800 transition"
        >
          Signup
        </button>

        <p className="mt-6 text-center text-gray-700">
          Already have account?{' '}
          <a
            href="/login"
            className="text-[#7B2CBF] underline font-medium"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
