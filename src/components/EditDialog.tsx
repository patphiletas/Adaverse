"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProjectForm, { ProjectFormValues } from "@/components/ProjectForm";
import type { Project } from "@/types";

export default function EditDialog({ project }: { project: Project }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const initialValues: ProjectFormValues = {
    title: project.title,
    githubUrl: project.githubUrl,
    demoUrl: project.demoUrl ?? "",
    promotionId: String(project.promotionId),
    adaProjectId: String(project.adaProjectId),
    contributors: project.contributors ?? "",
  };

  async function handleSubmit(values: ProjectFormValues): Promise<string | null> {
    if (!values.title || !values.githubUrl) {
      return "Le titre et le lien GitHub sont obligatoires.";
    }

    const res = await fetch(`/api/projects/${project.id}`, {
      method: "PATCH",
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

    setOpen(false);
    router.refresh();
    return null;
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg border border-zinc-300 dark:border-zinc-300 px-5 py-3 text-center font-semibold text-zinc-900 dark:text-zinc-100 transition hover:border-zinc-950 dark:hover:border-zinc-100"
      >
        Modifier
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Modifier le projet</h2>
              <button onClick={() => setOpen(false)} className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 text-xl font-bold">×</button>
            </div>
            <ProjectForm initialValues={initialValues} onSubmit={handleSubmit} submitLabel="Enregistrer" />
          </div>
        </div>
      )}
    </>
  );
}
