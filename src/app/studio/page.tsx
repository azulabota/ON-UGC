import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function StudioPage() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return (
      <main className="mx-auto max-w-xl p-6">
        <h1 className="text-2xl font-semibold">UGC Studio</h1>
        <p className="mt-2">You’re not signed in.</p>
        <Link className="mt-4 inline-block rounded bg-black px-4 py-3 text-white" href="/auth">
          Go to auth
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-semibold">UGC Studio</h1>
      <p className="mt-2 text-sm text-neutral-600">Signed in as {data.user.email}</p>

      <div className="mt-6 rounded border p-4">
        <p className="text-sm">
          Next: wire up Supabase Storage uploads (product image / character image / audio) and the
          generation API.
        </p>
      </div>
    </main>
  );
}
