import "./globals.css";
import { Suspense } from "react";
import ProposalDialog from "@/components/ProposalDialog";
import NavFilters from "@/components/NavFilters";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata = {
  title: "Adaverse",
  description: "Les projets des apprenants d'Ada",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* Evite le flash blanc au chargement en dark mode */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var stored = localStorage.getItem('theme');
            var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (stored === 'dark' || (!stored && prefersDark)) {
              document.documentElement.classList.add('dark');
            }
          })();
        `}} />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <header className="sticky top-0 z-50 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-300 px-6 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Adaverse</a>
            <div className="sm:hidden flex items-center gap-2">
              <ThemeToggle />
              <ProposalDialog />
            </div>
          </div>
          <div className="flex items-center justify-between flex-1 gap-4">
            <Suspense>
              <NavFilters />
            </Suspense>
            <div className="hidden sm:flex items-center gap-3">
              <ThemeToggle />
              <ProposalDialog />
            </div>
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>

        <footer className="border-t border-zinc-200 dark:border-zinc-300 px-6 py-4 text-center text-xs text-zinc-400 dark:text-zinc-500">
          Adaverse — Les projets des apprenants d&apos;Ada Tech School · Patrice Philétas 2026
        </footer>
      </body>
    </html>
  );
}
