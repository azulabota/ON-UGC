"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function MagicLinkPage() {
  const supabase = createSupabaseBrowserClient();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    try {
      const redirectTo = `${window.location.origin}/auth/callback`;
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: redirectTo },
      });
      if (error) throw error;
      setStatus("Magic link sent. Check your email.");
    } catch (err: unknown) {
      setStatus(err instanceof Error ? err.message : "Error sending magic link");
    }
  }

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold">Magic link</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Enter your email. We’ll send a sign-in link.
      </p>

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

        <button className="mt-2 rounded bg-black px-4 py-3 text-white" type="submit">
          Send magic link
        </button>

        {status ? <p className="text-sm text-neutral-700">{status}</p> : null}
      </form>
    </main>
  );
}

