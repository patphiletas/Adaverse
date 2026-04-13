import { db } from "@/lib/db";
import { studentProjects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const { title, githubUrl, demoUrl, promotionId, adaProjectId, contributors } = body;

  if (!title || !githubUrl) {
    return NextResponse.json({ error: "Titre et lien GitHub obligatoires" }, { status: 400 });
  }

  const updated = await db
    .update(studentProjects)
    .set({
      title,
      githubUrl,
      demoUrl,
      promotionId: Number(promotionId),
      adaProjectId: Number(adaProjectId),
      contributors: contributors || null,
    })
    .where(eq(studentProjects.id, Number(id)))
    .returning();

  return NextResponse.json(updated[0]);
}
