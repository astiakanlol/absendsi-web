"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login, getSession } from "@/lib/auth";
import { Eye, EyeOff, Lock, User } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getSession()) {
      router.replace("/");
    }
  }, [router]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const result = login(username, password);
      setLoading(false);
      if (result.ok) {
        router.replace("/");
      } else {
        setError(result.error);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kai-800 via-kai-900 to-kai-950 flex flex-col items-center justify-center px-5">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mx-auto mb-4 border border-white/20">
          <span className="text-2xl font-bold text-white tracking-tight">A</span>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-wide">ABSENDSI</h1>
        <p className="text-kai-200 text-sm mt-1">Geprekin · Absensi Karyawan</p>
      </div>

      <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 sm:p-8">
        <h2 className="text-lg font-bold text-gray-900 text-center mb-1">Masuk Akun</h2>
        <p className="text-xs text-gray-500 text-center mb-6">
          Gunakan username & password dari perusahaan
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-600 mb-1.5 block">Username</label>
            <div className="relative">
              <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                placeholder="Contoh: CEOMiro"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-kai-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-600 mb-1.5 block">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="••••"
                className="w-full border border-gray-200 rounded-xl pl-10 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-kai-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                tabIndex={-1}
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 text-sm rounded-xl px-4 py-2.5 border border-red-100">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-kai-700 text-white font-semibold text-sm hover:bg-kai-800 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Masuk"
            )}
          </button>
        </form>
      </div>

      <p className="text-kai-300/60 text-[11px] mt-8 text-center">
        Akun dibuat oleh perusahaan · Tidak pakai Google / email
      </p>
    </div>
  );
}
