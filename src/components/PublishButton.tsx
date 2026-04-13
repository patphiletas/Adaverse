"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  projectId: number;
};

export default function PublishButton({ projectId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handlePublish() {
    setLoading(true);
    await fetch(`/api/projects/${projectId}/publish`, { method: "POST" });
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={handlePublish}
      disabled={loading}
      className="rounded-lg bg-green-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Publication…" : "Publier"}
    </button>
  );
}
