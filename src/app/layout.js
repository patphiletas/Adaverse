import "./globals.css";
import { Suspense } from "react";
import ProposalDialog from "@/components/ProposalDialog";
import NavFilters from "@/components/NavFilters";

export const metadata = {
  title: "Adaverse",
  description: "Les projets des apprenants d'Ada",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-50 bg-white border-b border-zinc-200 px-6 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center justify-between">
            <a href="/" className="text-xl font-bold text-zinc-900">Adaverse</a>
            <div className="sm:hidden">
              <ProposalDialog />
            </div>
          </div>
          <div className="flex items-center justify-between flex-1 gap-4">
            <Suspense>
              <NavFilters />
            </Suspense>
            <div className="hidden sm:block">
              <ProposalDialog />
            </div>
          </div>
        </header>

        <main className="flex-1">
          {children}
        </main>

        <footer className="border-t border-zinc-200 px-6 py-4 text-center text-xs text-zinc-400">
          Adaverse — Les projets des apprenants d&apos;Ada Tech School · Patrice Philétas 2026
        </footer>
      </body>
    </html>
  );
}
