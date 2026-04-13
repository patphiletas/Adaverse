"use client";

import { useState, useEffect } from "react";

const inputClass = "w-full border border-zinc-300 dark:border-zinc-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400";
const labelClass = "block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1";

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
      setForm((prev) => ({ ...prev, contributors: data.map((c) => c.login).join(", ") }));
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
      setForm({ title: "", githubUrl: "", demoUrl: "", promotionId: "", adaProjectId: "", contributors: "" });
    }, 1500);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
      >
        Proposer un projet
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Proposer un projet</h2>
              <button onClick={() => setOpen(false)} className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 text-xl font-bold">×</button>
            </div>

            {success ? (
              <p className="text-green-600 font-medium text-center py-4">Projet soumis avec succès !</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className={labelClass}>Titre *</label>
                  <input name="title" value={form.title} onChange={handleChange} className={inputClass} placeholder="Mon super projet" />
                </div>
                <div>
                  <label className={labelClass}>Lien GitHub *</label>
                  <input name="githubUrl" value={form.githubUrl} onChange={handleChange} onBlur={(e) => fetchContributors(e.target.value)} className={inputClass} placeholder="https://github.com/user/repo" />
                </div>
                <div>
                  <label className={labelClass}>Lien démo *</label>
                  <input name="demoUrl" value={form.demoUrl} onChange={handleChange} className={inputClass} placeholder="https://mon-projet.vercel.app" />
                </div>
                <div>
                  <label className={labelClass}>Promotion</label>
                  <select name="promotionId" value={form.promotionId} onChange={handleChange} className={inputClass}>
                    <option value="">-- Choisir une promotion --</option>
                    {promotions.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Projet Ada</label>
                  <select name="adaProjectId" value={form.adaProjectId} onChange={handleChange} className={inputClass}>
                    <option value="">-- Choisir un projet Ada --</option>
                    {adaProjects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>
                    Contributeurs <span className="text-zinc-400 font-normal">(pseudos GitHub, séparés par des virgules)</span>
                  </label>
                  <input name="contributors" value={form.contributors} onChange={handleChange} className={inputClass} placeholder="alice-ada, bob-dev" />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg py-2 text-sm font-medium hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors">
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
