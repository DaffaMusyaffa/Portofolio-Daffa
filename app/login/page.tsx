'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (res.ok) router.push('/dashboard');
    else setError((await res.json()).error ?? 'Login gagal');
  };

  return (
    <main className="min-h-screen bg-black-100 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-black-200 border border-white/10 rounded-2xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">CMS Portfolio</h1>
          <p className="text-white-100 text-sm">Login untuk mengelola projects</p>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3">{error}</div>}

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-white-100 text-sm">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black-100 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-purple focus:outline-none"
              placeholder="admin@contoh.com"
            />
          </div>
          <div className="space-y-1">
            <label className="text-white-100 text-sm">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black-100 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-purple focus:outline-none"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple hover:bg-purple/80 disabled:opacity-50 text-white font-medium rounded-lg py-3 transition-colors"
        >
          {loading ? 'Memproses...' : 'Login'}
        </button>
      </form>
    </main>
  );
}
