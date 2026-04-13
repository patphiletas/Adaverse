"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";

type Promotion = { id: number; name: string };
type AdaProject = { id: number; name: string };

export type ProjectFormValues = {
  title: string;
  githubUrl: string;
  demoUrl: string;
  promotionId: string;
  adaProjectId: string;
  contributors: string;
};

type Props = {
  initialValues: ProjectFormValues;
  onSubmit: (values: ProjectFormValues) => Promise<string | null>;
  submitLabel: string;
};

const inputClass = "w-full border border-zinc-300 dark:border-zinc-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-400";
const labelClass = "block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1";

export default function ProjectForm({ initialValues, onSubmit, submitLabel }: Props) {
  const [form, setForm] = useState<ProjectFormValues>(initialValues);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [adaProjects, setAdaProjects] = useState<AdaProject[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/promotions").then((r) => r.json()).then(setPromotions);
    fetch("/api/ada-projects").then((r) => r.json()).then(setAdaProjects);
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function fetchContributors(githubUrl: string) {
    const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) return;
    const [, owner, repo] = match;
    try {
      const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors`);
      if (!res.ok) return;
      const data: { login: string }[] = await res.json();
      setForm((prev) => ({ ...prev, contributors: data.map((c) => c.login).join(", ") }));
    } catch {
      // silencieux si ça échoue
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const errorMsg = await onSubmit(form);
    if (errorMsg) setError(errorMsg);
    setLoading(false);
  }

  return (
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
        <label className={labelClass}>Lien démo</label>
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
      <button type="submit" disabled={loading} className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg py-2 text-sm font-medium hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
        {loading ? "En cours…" : submitLabel}
      </button>
    </form>
  );
}
