'use client'

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-3 rounded border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
          required
        />

        <label className="block mb-2 text-sm font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 p-3 rounded border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200"
          required
        />

        <button className="w-full py-3 bg-cyan-950 text-white font-semibold rounded hover:bg-cyan-700 transition">Login</button>

        <p className="mt-4 text-sm text-center text-gray-500 dark:text-gray-400">
          Don't have an account? <a href="/auth/register" className="text-blue-600 hover:underline">Register</a>
        </p>
      </form>
    </main>
  );
}
