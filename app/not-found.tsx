"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-8xl font-bold"
      >
        404
      </motion.h1>
      <p className="mt-4 text-lg text-slate-300 text-center">
        Page not found
      </p>
      <Link
        href="/"
        className="mt-6 rounded bg-white px-5 py-3 text-slate-900 font-medium hover:bg-slate-200"
      >
        Go Home
      </Link>
    </div>
  );
}