"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  projectId: number;
};

export default function DeleteButton({ projectId }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setError("");
    setLoading(true);
    const res = await fetch(`/api/projects/${projectId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Une erreur est survenue.");
      setLoading(false);
      return;
    }

    router.push("/");
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg border border-red-300 dark:border-red-400 px-5 py-3 text-center font-semibold text-red-600 dark:text-red-400 transition hover:bg-red-50 dark:hover:bg-red-950"
      >
        Supprimer
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl w-full max-w-sm p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Supprimer ce projet ?</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Cette action est irréversible. Entrez le mot de passe pour confirmer.</p>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe"
              className="w-full border border-zinc-300 dark:border-zinc-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-red-400"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex gap-3">
              <button
                onClick={() => { setOpen(false); setPassword(""); setError(""); }}
                className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-300 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:border-zinc-950 dark:hover:border-zinc-100 transition"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 rounded-lg bg-red-600 py-2 text-sm font-semibold text-white hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Suppression…" : "Confirmer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
