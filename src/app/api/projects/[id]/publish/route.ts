import { db } from "@/lib/db";
import { studentProjects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const updated = await db
    .update(studentProjects)
    .set({ publishedAt: new Date() })
    .where(eq(studentProjects.id, Number(id)))
    .returning();

  return NextResponse.json(updated[0]);
}
