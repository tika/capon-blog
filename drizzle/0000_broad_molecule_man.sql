CREATE TABLE IF NOT EXISTS "articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"author_id" varchar(255) NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"cover_image_url" varchar(255)
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "author_idx" ON "articles" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "title_idx" ON "articles" USING btree ("title");