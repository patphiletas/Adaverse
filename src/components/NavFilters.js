"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const filters = [
  { label: "Par projet", value: "projet" },
  { label: "Par promo", value: "promo" },
  { label: "Par contributeur", value: "contributeur" },
];

export default function NavFilters() {
  const searchParams = useSearchParams();
  const tri = searchParams.get("tri") || "projet";

  return (
    <nav className="flex gap-1">
      {filters.map((f) => (
        <Link
          key={f.value}
          href={`/?tri=${f.value}`}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            tri === f.value
              ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900"
              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          }`}
        >
          {f.label}
        </Link>
      ))}
    </nav>
  );
}
