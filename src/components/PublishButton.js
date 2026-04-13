"use client";

import { useRouter } from "next/navigation";

export default function PublishButton({ projectId }) {
  const router = useRouter();

  async function handlePublish() {
    await fetch(`/api/projects/${projectId}/publish`, { method: "POST" });
    router.refresh();
  }

  return (
    <button
      onClick={handlePublish}
      className="rounded-lg bg-green-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-green-700"
    >
      Publier
    </button>
  );
}
