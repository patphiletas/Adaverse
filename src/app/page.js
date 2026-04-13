import { desc, eq, isNotNull } from "drizzle-orm";
import { db } from "@/lib/db";
import { studentProjectsTable, promotionsTable, adaProjectsTable } from "@/db/schema";
import Link from "next/link";
import ProjectImage from "@/components/project-image";
import { getProjectImageSources } from "@/lib/project-images";

export const dynamic = "force-dynamic";

async function getPublishedProjects() {
  return db
    .select()
    .from(studentProjectsTable)
    .where(isNotNull(studentProjectsTable.publishedAt))
    .innerJoin(promotionsTable, eq(studentProjectsTable.promotionId, promotionsTable.id))
    .innerJoin(adaProjectsTable, eq(studentProjectsTable.adaProjectId, adaProjectsTable.id))
    .orderBy(desc(studentProjectsTable.publishedAt));
}

function groupBy(rows, keyFn) {
  return rows.reduce((acc, row) => {
    const key = keyFn(row);
    if (!acc[key]) acc[key] = [];
    acc[key].push(row);
    return acc;
  }, {});
}

function ProjectCard({ row }) {
  const project = row.student_projects;
  const promo = row.promotions;
  const imageSources = getProjectImageSources(project.githubUrl, project.imageUrl);

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-300 hover:shadow-md dark:hover:shadow-zinc-800 transition-shadow"
    >
      <div className="relative h-40 bg-zinc-100 dark:bg-zinc-800">
        <ProjectImage
          sources={imageSources}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">{project.title}</h3>
        <p className="text-zinc-500 dark:text-zinc-300 text-xs mt-1">Promo {promo.name}</p>
        {project.contributors && (
          <p className="text-zinc-400 dark:text-zinc-400 text-xs mt-1 truncate">{project.contributors}</p>
        )}
        <p className="text-zinc-400 dark:text-zinc-400 text-xs mt-1">
          Publié le{" "}
          {new Date(project.publishedAt).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>
    </Link>
  );
}

export default async function Home({ searchParams }) {
  const { tri = "projet" } = await searchParams;
  const rows = await getPublishedProjects();

  let grouped;
  if (tri === "promo") {
    grouped = groupBy(rows, (row) => row.promotions.name);
  } else if (tri === "contributeur") {
    grouped = groupBy(rows, (row) => row.student_projects.contributors || "Non renseigné");
  } else {
    grouped = groupBy(rows, (row) => row.ada_projects.name);
  }

  const sections = Object.entries(grouped);

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-full">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {sections.length === 0 ? (
          <p className="text-zinc-500 dark:text-zinc-400 text-center mt-20">Aucun projet publié pour l&apos;instant.</p>
        ) : (
          sections.map(([label, projects]) => (
            <section key={label} className="mb-12">
              <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-300">
                {label}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {projects.map((row) => (
                  <ProjectCard key={row.student_projects.id} row={row} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}
