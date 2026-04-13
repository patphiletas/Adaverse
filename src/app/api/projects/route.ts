import { db } from "@/lib/db";
import { studentProjects } from "@/db/schema";
import { isNotNull, like } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const projects = await db
    .select()
    .from(studentProjects)
    .where(isNotNull(studentProjects.publishedAt))
    .orderBy(studentProjects.publishedAt);

  return NextResponse.json(projects);
}

function toBaseSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function generateUniqueSlug(baseSlug: string): Promise<string> {
  // Récupère tous les slugs qui commencent par le slug de base
  const existing = await db
    .select({ slug: studentProjects.slug })
    .from(studentProjects)
    .where(like(studentProjects.slug, `${baseSlug}%`));

  const existingSlugs = new Set(existing.map((r) => r.slug));

  if (!existingSlugs.has(baseSlug)) return baseSlug;

  let counter = 2;
  while (existingSlugs.has(`${baseSlug}-${counter}`)) {
    counter++;
  }
  return `${baseSlug}-${counter}`;
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, githubUrl, demoUrl, promotionId, adaProjectId, contributors } = body;

  if (!title || !githubUrl || !demoUrl) {
    return NextResponse.json(
      { error: "Titre et liens obligatoires" },
      { status: 400 }
    );
  }

  const baseSlug = toBaseSlug(title);
  const slug = await generateUniqueSlug(baseSlug);

  const newProject = await db
    .insert(studentProjects)
    .values({
      title,
      slug,
      githubUrl,
      demoUrl,
      promotionId,
      adaProjectId,
      contributors: contributors || null,
    })
    .returning();

  return NextResponse.json(newProject[0], { status: 201 });
}
