"use client";

import { useState, useEffect } from "react";

export default function ProposalDialog() {
  const [open, setOpen] = useState(false);
  const [promotions, setPromotions] = useState([]);
  const [adaProjects, setAdaProjects] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    title: "",
    githubUrl: "",
    demoUrl: "",
    promotionId: "",
    adaProjectId: "",
    contributors: "",
  });

  // Chargement des listes dès que la popup s'ouvre
  useEffect(() => {
    if (!open) return;
    fetch("/api/promotions").then((r) => r.json()).then(setPromotions);
    fetch("/api/ada-projects").then((r) => r.json()).then(setAdaProjects);
  }, [open]);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function fetchContributors(githubUrl) {
    const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) return;
    const [, owner, repo] = match;
    try {
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors`);
      if (!res.ok) return;
      const data = await res.json();
      const logins = data.map((c) => c.login).join(", ");
      setForm((prev) => ({ ...prev, contributors: logins }));
    } catch {
      // silencieux si ça échoue
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.title || !form.githubUrl || !form.demoUrl) {
      setError("Le titre, le lien GitHub et le lien démo sont obligatoires.");
      return;
    }

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        githubUrl: form.githubUrl,
        demoUrl: form.demoUrl,
        promotionId: Number(form.promotionId),
        adaProjectId: Number(form.adaProjectId),
        contributors: form.contributors || null,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Une erreur est survenue.");
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      setOpen(false);
      setSuccess(false);
      setForm({ title: "", githubUrl: "", demoUrl: "", promotionId: "", adaProjectId: "" });
    }, 1500);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-700 transition-colors"
      >
        Proposer un projet
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-zinc-900">Proposer un projet</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 text-xl font-bold"
              >
                ×
              </button>
            </div>

            {success ? (
              <p className="text-green-600 font-medium text-center py-4">
                Projet soumis avec succès !
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Titre *
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
                    placeholder="Mon super projet"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Lien GitHub *
                  </label>
                  <input
                    name="githubUrl"
                    value={form.githubUrl}
                    onChange={handleChange}
                    onBlur={(e) => fetchContributors(e.target.value)}
                    className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
                    placeholder="https://github.com/user/repo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Lien démo *
                  </label>
                  <input
                    name="demoUrl"
                    value={form.demoUrl}
                    onChange={handleChange}
                    className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
                    placeholder="https://mon-projet.vercel.app"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Promotion
                  </label>
                  <select
                    name="promotionId"
                    value={form.promotionId}
                    onChange={handleChange}
                    className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
                  >
                    <option value="">-- Choisir une promotion --</option>
                    {promotions.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Projet Ada
                  </label>
                  <select
                    name="adaProjectId"
                    value={form.adaProjectId}
                    onChange={handleChange}
                    className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
                  >
                    <option value="">-- Choisir un projet Ada --</option>
                    {adaProjects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">
                    Contributeurs <span className="text-zinc-400 font-normal">(pseudos GitHub, séparés par des virgules)</span>
                  </label>
                  <input
                    name="contributors"
                    value={form.contributors}
                    onChange={handleChange}
                    className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
                    placeholder="alice-ada, bob-dev"
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm">{error}</p>
                )}

                <button
                  type="submit"
                  className="bg-zinc-900 text-white rounded-lg py-2 text-sm font-medium hover:bg-zinc-700 transition-colors"
                >
                  Envoyer
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
