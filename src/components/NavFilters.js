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
              ? "bg-zinc-900 text-white"
              : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
          }`}
        >
          {f.label}
        </Link>
      ))}
    </nav>
  );
}
