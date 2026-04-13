"use client";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-6">
      <p className="text-4xl">⚠️</p>
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
        Service temporairement indisponible
      </h2>
      <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-sm">
        Impossible de récupérer les projets. Vérifie ta connexion ou réessaie dans quelques instants.
      </p>
      <a
        href="/"
        className="mt-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 px-5 py-2 text-sm font-medium text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-300 transition-colors"
      >
        Réessayer
      </a>
    </div>
  );
}
