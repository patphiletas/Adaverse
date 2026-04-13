import {
  integer,
  pgTable,
  varchar,
  timestamp,
  date,
} from "drizzle-orm/pg-core";

export const adaProjectsTable = pgTable("ada_projects", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull().unique(),
});

export const promotionsTable = pgTable("promotions", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  startDate: date("start_date").notNull(),
});

export const studentProjectsTable = pgTable("student_projects", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  githubUrl: varchar("github_url", { length: 255 }).notNull(),
  demoUrl: varchar("demo_url", { length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  publishedAt: timestamp("published_at"),
  promotionId: integer("promotion_id")
    .notNull()
    .references(() => promotionsTable.id),
  adaProjectId: integer("ada_project_id")
    .notNull()
    .references(() => adaProjectsTable.id),
});

export const adaProjects = adaProjectsTable;
export const promotions = promotionsTable;
export const studentProjects = studentProjectsTable;
