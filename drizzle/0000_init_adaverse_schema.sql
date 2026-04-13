CREATE TABLE "ada_projects" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "ada_projects_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	CONSTRAINT "ada_projects_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "promotions" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "promotions_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"start_date" date NOT NULL,
	CONSTRAINT "promotions_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "student_projects" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "student_projects_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"github_url" varchar(255) NOT NULL,
	"demo_url" varchar(255) NOT NULL,
	"image_url" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"published_at" timestamp,
	"promotion_id" integer NOT NULL,
	"ada_project_id" integer NOT NULL,
	CONSTRAINT "student_projects_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "student_projects" ADD CONSTRAINT "student_projects_promotion_id_promotions_id_fk" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_projects" ADD CONSTRAINT "student_projects_ada_project_id_ada_projects_id_fk" FOREIGN KEY ("ada_project_id") REFERENCES "public"."ada_projects"("id") ON DELETE no action ON UPDATE no action;