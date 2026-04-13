import { db } from "@/lib/db";
import { adaProjects } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const rows = await db.select().from(adaProjects);
  return NextResponse.json(rows);
}
