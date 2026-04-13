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
  startDate: date("startDate").notNull(),
});

export const studentProjectsTable = pgTable("student_projects", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  githubUrl: varchar("githubUrl", { length: 255 }).notNull(),
  demoUrl: varchar("demoUrl", { length: 255 }).notNull(),
  imageUrl: varchar("imageUrl", { length: 255 }),
  contributors: varchar("contributors", { length: 500 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  publishedAt: timestamp("publishedAt"),
  promotionId: integer("promotionId")
    .notNull()
    .references(() => promotionsTable.id),
  adaProjectId: integer("adaProjectId")
    .notNull()
    .references(() => adaProjectsTable.id),
});

export const adaProjects = adaProjectsTable;
export const promotions = promotionsTable;
export const studentProjects = studentProjectsTable;
