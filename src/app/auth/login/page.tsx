"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function LoginPage() {
  const supabase = createSupabaseBrowserClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setStatus("Signed in. Go to /studio.");
        window.location.href = "/studio";
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setStatus("Check your email to confirm, then log in.");
      }
    } catch (err: unknown) {
      setStatus(err instanceof Error ? err.message : "Auth error");
    }
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold">{mode === "login" ? "Log in" : "Sign up"}</h1>

      <form className="mt-6 grid gap-3" onSubmit={onSubmit}>
        <label className="grid gap-1">
          <span className="text-sm">Email</span>
          <input
            className="rounded border px-3 py-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className="grid gap-1">
          <span className="text-sm">Password</span>
          <input
            className="rounded border px-3 py-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button className="mt-2 rounded bg-black px-4 py-3 text-white" type="submit">
          {mode === "login" ? "Log in" : "Create account"}
        </button>

        <button
          type="button"
          className="rounded border px-4 py-3"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          Switch to {mode === "login" ? "Sign up" : "Log in"}
        </button>

        {status ? <p className="text-sm text-neutral-700">{status}</p> : null}
      </form>
    </main>
  );
}

