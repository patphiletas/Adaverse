"use client";

import { useState } from "react";
import ProjectForm, { ProjectFormValues } from "@/components/ProjectForm";

const emptyValues: ProjectFormValues = {
  title: "",
  githubUrl: "",
  demoUrl: "",
  promotionId: "",
  adaProjectId: "",
  contributors: "",
};

export default function ProposalDialog() {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(values: ProjectFormValues): Promise<string | null> {
    if (!values.title || !values.githubUrl || !values.demoUrl) {
      return "Le titre, le lien GitHub et le lien démo sont obligatoires.";
    }

    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        promotionId: Number(values.promotionId),
        adaProjectId: Number(values.adaProjectId),
        contributors: values.contributors || null,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      return data.error || "Une erreur est survenue.";
    }

    setSuccess(true);
    setTimeout(() => { setOpen(false); setSuccess(false); }, 1500);
    return null;
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
              <ProjectForm initialValues={emptyValues} onSubmit={handleSubmit} submitLabel="Envoyer" />
            )}
          </div>
        </div>
      )}
    </>
  );
}
