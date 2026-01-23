'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem('registeredUser'));

    // ❌ No user registered
    if (!savedUser) {
      setError('No account found. Please signup first.');
      return;
    }

    // ❌ Invalid credentials
    if (
      savedUser.mobile !== mobile ||
      savedUser.password !== password
    ) {
      setError('Invalid mobile number or password');
      return;
    }

    // ✅ Login success
    localStorage.setItem('isLoggedIn', 'true');
    router.push('/'); // Home page
  };

  return (
    <div className="min-h-screen bg-[#F2E9E4] flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md border-2 border-[#7B2CBF]/30">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#7B2CBF]">
          Login
        </h1>

        {error && (
          <p className="mb-4 text-red-600 font-medium text-center">
            {error}
          </p>
        )}

        <input
          className="w-full p-4 mb-5 border-2 border-gray-400 rounded-lg focus:border-[#7B2CBF] focus:outline-none text-gray-800 placeholder-gray-500"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <input
          className="w-full p-4 mb-6 border-2 border-gray-400 rounded-lg focus:border-[#7B2CBF] focus:outline-none text-gray-800 placeholder-gray-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-[#7B2CBF] text-white p-4 rounded-lg font-semibold hover:bg-purple-800 transition"
        >
          Login
        </button>

        <p className="mt-6 text-center text-gray-700">
          No account?{' '}
          <a
            href="/signup"
            className="text-[#7B2CBF] underline font-medium"
          >
            Signup
          </a>
        </p>
      </div>
    </div>
  );
}
