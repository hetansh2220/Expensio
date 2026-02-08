"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUpWithEmail, signInWithGoogle } from "@/lib/firebase/auth";
import { useToast } from "@/providers/ToastProvider";
import { ROUTES } from "@/lib/constants/routes";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    if (password.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }
    setLoading(true);
    try {
      await signUpWithEmail(email, password, name);
      router.push(ROUTES.ONBOARDING);
    } catch (err: any) {
      showToast(err.message || "Signup failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      router.push(ROUTES.HOME);
    } catch (err: any) {
      showToast(err.message || "Google signup failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-10 text-center">
       
        <h1 className="text-2xl font-bold font-[family-name:var(--font-display)] text-foreground">Create account</h1>
        <p className="text-sm text-muted mt-1">Start your financial wellbeing journey</p>
      </div>

   

      
      <form onSubmit={handleSignup} className="w-full flex flex-col gap-3">
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full h-12 px-4 rounded-2xl bg-surface border border-border-subtle text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
        />
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-12 px-4 rounded-2xl bg-surface border border-border-subtle text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
        />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full h-12 px-4 rounded-2xl bg-surface border border-border-subtle text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
        />
        <button
          type="submit"
          disabled={loading || !name || !email || !password}
          className="w-full h-12 rounded-2xl bg-gradient-to-r from-success to-savings text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-success/25 disabled:opacity-50 disabled:cursor-not-allowed mt-1"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="mt-6 text-sm text-muted">
        Already have an account?{" "}
        <Link href={ROUTES.LOGIN} className="text-primary font-semibold hover:text-primary-light transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}
