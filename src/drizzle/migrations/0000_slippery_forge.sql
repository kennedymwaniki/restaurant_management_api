CREATE TABLE IF NOT EXISTS "addresses" (
	"id" serial PRIMARY KEY NOT NULL,
	"street_address_1" varchar(256),
	"street_address_2" varchar(256),
	"zip_code" varchar(10),
	"delivery_instructions" varchar(256),
	"user_id" integer,
	"city_id" integer,
	"created_at" varchar(256),
	"updated_at" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cities" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"state_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer,
	"user_id" integer,
	"comment_text" varchar(256),
	"is_complaint" boolean,
	"is_praise" boolean,
	"created_at" varchar(256),
	"updated_at" varchar(256)
);
