import { db } from "@/lib/db";
import { promotions } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  const rows = await db.select().from(promotions);
  return NextResponse.json(rows);
}
