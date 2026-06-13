'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { KeyRound, User, ChevronLeft, ShieldAlert, Sparkles, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Pre-fetch checks: if already authenticated, forward to dashboard
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/status');
        const data = await res.json();
        if (data.authenticated) {
          router.replace('/admin/dashboard');
        }
      } catch (e) {
        console.error("Auth status poll failed", e);
      }
    };
    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Identity verification failed.');
      }
    } catch (err) {
      setError('A system communication error occurred. Retry.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main id="admin-login-view" className="min-h-screen bg-[#0A0A0C] text-[#E4E4E7] flex flex-col items-center justify-center relative p-6">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.2] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none" />

      {/* Floating navigation utility */}
      <div className="absolute top-8 left-8">
        <Button
          id="btn-return-home"
          variant="ghost"
          onClick={() => router.push('/')}
          className="text-zinc-500 hover:text-white hover:bg-zinc-900/60 transition-colors text-xs uppercase tracking-wider flex items-center gap-1 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 text-zinc-600" />
          Back to Portfolio
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card id="admin-login-card" className="bg-zinc-900/40 border-zinc-850/60 backdrop-blur-md rounded-2xl p-2 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
          
          <CardHeader className="text-center pt-8 pb-4">
            <div className="w-12 h-12 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <KeyRound className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl font-display font-medium text-white tracking-tight flex items-center justify-center gap-1.5">
              Admin Entry <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
            </CardTitle>
            <CardDescription className="text-zinc-500 text-xs">
              MERN Stack Administrator & Lead Architect Login
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error Callout */}
              {error && (
                <div id="login-error-alert" className="p-3 bg-red-950/20 border border-red-500/20 rounded-xl flex items-center gap-2.5 text-xs text-red-400 animate-shake">
                  <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Username field */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block" htmlFor="login-username">
                  Staff Username
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-600" />
                  <Input
                    id="login-username"
                    type="text"
                    required
                    placeholder="Enter admin identifier"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-11 pl-10 bg-zinc-950/60 border-zinc-800 text-white focus:border-teal-400 focus:ring-teal-500/10 placeholder:text-zinc-700 text-sm focus-visible:border-teal-400 focus-visible:ring-3 focus-visible:ring-teal-500/10"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block" htmlFor="login-password">
                  Security Passphrase
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-600" />
                  <Input
                    id="login-password"
                    type="password"
                    required
                    placeholder="••••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pl-10 bg-zinc-950/60 border-zinc-800 text-white focus:border-teal-400 focus:ring-teal-500/10 placeholder:text-zinc-700 text-sm focus-visible:border-teal-400 focus-visible:ring-3 focus-visible:ring-teal-500/10"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Action trigger button */}
              <Button
                id="btn-login-submit"
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-teal-500 hover:bg-teal-400 disabled:bg-teal-800 text-zinc-950 hover:text-black font-bold text-xs uppercase tracking-wide transition-all mt-4 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin shrink-0 mr-1.5" />
                    Checking Credentials
                  </>
                ) : (
                  'Authorize Access'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
