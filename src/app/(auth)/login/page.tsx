"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithEmail, signInWithGoogle } from "@/lib/firebase/auth";
import { useToast } from "@/providers/ToastProvider";
import { ROUTES } from "@/lib/constants/routes";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    try {
      await signInWithEmail(email, password);
      router.push(ROUTES.HOME);
    } catch (err: any) {
      showToast(err.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      router.push(ROUTES.HOME);
    } catch (err: any) {
      showToast(err.message || "Google login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full items-center">
      <div className="mb-10 text-center">
        
        <h1 className="text-2xl font-bold font-[family-name:var(--font-display)] text-foreground">Welcome back</h1>
        <p className="text-sm text-muted mt-1">Sign in to continue to Expensio</p>
      </div>

    

      

      <form onSubmit={handleEmailLogin} className="w-full flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-12 px-4 rounded-2xl bg-surface border border-border-subtle text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-12 px-4 rounded-2xl bg-surface border border-border-subtle text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
        />
        <button
          type="submit"
          disabled={loading || !email || !password}
          className="w-full h-12 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed mt-1"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <p className="mt-6 text-sm text-muted">
        Don&apos;t have an account?{" "}
        <Link href={ROUTES.SIGNUP} className="text-primary font-semibold hover:text-primary-light transition-colors">
          Sign up
        </Link>
      </p>
    </div>
  );
}
