CREATE TABLE IF NOT EXISTS "address" (
	"id" serial PRIMARY KEY NOT NULL,
	"street_address_1" varchar(256),
	"street_address_2" varchar(256),
	"zip_code" varchar(10),
	"delivery_instructions" varchar(256),
	"user_id" integer,
	"city_id" integer,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "city" (
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
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "drivers" (
	"id" serial PRIMARY KEY NOT NULL,
	"car_make" varchar(256),
	"car_model" varchar(256),
	"car_year" integer,
	"user_id" integer,
	"online" boolean,
	"delivering" boolean,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "menu_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"restaurant_id" integer,
	"category_id" integer,
	"description" varchar(256),
	"ingredients" varchar(256),
	"price" varchar(256),
	"active" boolean,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_menu_item" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer,
	"menu_item_id" integer,
	"quantity" integer,
	"item_price" varchar(256),
	"price" timestamp,
	"comment" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "order_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer,
	"status_catalog_id" integer,
	"created_at" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"restaurant_id" integer,
	"estimated_delivery_time" varchar(256),
	"actual_delivery_time" varchar(256),
	"delivery_address_id" integer,
	"user_id" integer,
	"driver_id" integer,
	"price" varchar(256),
	"discount" varchar(256),
	"final_price" varchar(256),
	"comment" varchar(256),
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "restaurant_owner" (
	"id" serial PRIMARY KEY NOT NULL,
	"restaurant_id" integer,
	"owner_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "restaurantTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"street_address" varchar(256),
	"zip_code" varchar(10),
	"city_id" integer,
	"created_at" timestamp,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "state" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"code" varchar(20)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "status_catalog" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"contact_phone" varchar(20),
	"phone_verified" boolean,
	"email" varchar(256),
	"email_verified" boolean,
	"confirmation_code" varchar(256),
	"password" varchar(256),
	"created_at" varchar(256)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "address_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "address" ADD CONSTRAINT "address_city_id_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."city"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "city" ADD CONSTRAINT "city_state_id_state_id_fk" FOREIGN KEY ("state_id") REFERENCES "public"."state"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "drivers" ADD CONSTRAINT "drivers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "menu_item" ADD CONSTRAINT "menu_item_restaurant_id_restaurantTable_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurantTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "menu_item" ADD CONSTRAINT "menu_item_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_menu_item" ADD CONSTRAINT "order_menu_item_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_menu_item" ADD CONSTRAINT "order_menu_item_menu_item_id_menu_item_id_fk" FOREIGN KEY ("menu_item_id") REFERENCES "public"."menu_item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_status" ADD CONSTRAINT "order_status_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_status" ADD CONSTRAINT "order_status_status_catalog_id_status_catalog_id_fk" FOREIGN KEY ("status_catalog_id") REFERENCES "public"."status_catalog"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_restaurant_id_restaurantTable_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurantTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_delivery_address_id_address_id_fk" FOREIGN KEY ("delivery_address_id") REFERENCES "public"."address"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_driver_id_drivers_id_fk" FOREIGN KEY ("driver_id") REFERENCES "public"."drivers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurant_owner" ADD CONSTRAINT "restaurant_owner_restaurant_id_restaurantTable_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurantTable"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurant_owner" ADD CONSTRAINT "restaurant_owner_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurantTable" ADD CONSTRAINT "restaurantTable_city_id_city_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."city"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
