import Link from "next/link";

export default function AuthPage() {
  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-semibold">ON UGC — Sign in</h1>
      <p className="mt-2 text-sm text-neutral-600">
        For MVP, auth supports email/password and magic link.
      </p>

      <div className="mt-6 grid gap-4">
        <Link
          className="rounded bg-black px-4 py-3 text-center text-white"
          href="/auth/login"
        >
          Email + password
        </Link>

        <Link
          className="rounded border px-4 py-3 text-center"
          href="/auth/magic"
        >
          Magic link
        </Link>
      </div>
    </main>
  );
}
