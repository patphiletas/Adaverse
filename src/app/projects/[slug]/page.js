import Link from "next/link";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { adaProjects, promotions, studentProjects } from "@/db/schema";
import ProjectImage from "@/components/project-image";
import { getProjectImageSources } from "@/lib/project-images";
import EditDialog from "@/components/EditDialog";
import PublishButton from "@/components/PublishButton";
import DeleteButton from "@/components/DeleteButton";

function formatDate(date) {
  if (!date) return null;
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;

  const result = await db
    .select({
      id: studentProjects.id,
      title: studentProjects.title,
      slug: studentProjects.slug,
      githubUrl: studentProjects.githubUrl,
      demoUrl: studentProjects.demoUrl,
      imageUrl: studentProjects.imageUrl,
      contributors: studentProjects.contributors,
      publishedAt: studentProjects.publishedAt,
      promotionId: studentProjects.promotionId,
      adaProjectId: studentProjects.adaProjectId,
      promotionName: promotions.name,
      adaProjectName: adaProjects.name,
    })
    .from(studentProjects)
    .innerJoin(promotions, eq(studentProjects.promotionId, promotions.id))
    .innerJoin(adaProjects, eq(studentProjects.adaProjectId, adaProjects.id))
    .where(eq(studentProjects.slug, slug))
    .limit(1);

  const project = result[0];
  if (!project) notFound();

  const imageSources = getProjectImageSources(project.githubUrl, project.imageUrl);
  const hasDemoUrl = Boolean(project.demoUrl?.trim());

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-6 py-10 text-zinc-950 dark:text-zinc-100 sm:px-10">
      <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 rounded-lg bg-white dark:bg-zinc-900 p-6 shadow-sm dark:border-2 dark:border-zinc-300 sm:p-10">
        <Link href="/" className="text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100">
          Retour aux projets
        </Link>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3 sm:flex-1">
            <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {project.adaProjectName}
            </p>
            <h1 className="text-4xl font-bold">{project.title}</h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              {project.promotionName}
              {project.publishedAt ? ` - publié le ${formatDate(project.publishedAt)}` : ""}
            </p>
            {project.contributors && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                <span className="font-medium">Contributeurs :</span> {project.contributors}
              </p>
            )}
          </div>

          <div className="relative aspect-[1.8/1] w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800 shadow-[10px_12px_24px_rgba(24,24,27,0.16)] sm:w-80 sm:flex-none">
            <ProjectImage
              sources={imageSources}
              alt={project.title}
              width={640}
              height={356}
              sizes="(max-width: 640px) 100vw, 320px"
              className="h-auto w-full"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          {hasDemoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-zinc-950 dark:bg-zinc-100 px-5 py-3 text-center font-semibold text-white dark:text-zinc-900 transition hover:bg-zinc-700 dark:hover:bg-zinc-300"
            >
              Voir la demo
            </a>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-zinc-300 dark:border-zinc-300 px-5 py-3 text-center font-semibold transition hover:border-zinc-950 dark:hover:border-zinc-100"
          >
            Voir le code
          </a>
          <EditDialog project={project} />
          {!project.publishedAt && <PublishButton projectId={project.id} />}
          <DeleteButton projectId={project.id} />
        </div>
      </article>
    </main>
  );
}
