import {
  integer,
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";

// Declaring enums in the database
export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "accepted",
  "preparing",
  "on_the_way",
  "delivered",
  "cancelled",
]);

// Tables
export const addresses = pgTable("addresses", {
  id: serial("id").primaryKey(),
  street_address_1: varchar("street_address_1", { length: 256 }),
  street_address_2: varchar("street_address_2", { length: 256 }),
  zip_code: varchar("zip_code", { length: 10 }),
  delivery_instructions: varchar("delivery_instructions", { length: 256 }),
  user_id: integer("user_id").references(() => users.id),
  city_id: integer("city_id").references(() => cities.id),
  created_at: varchar("created_at", { length: 256 }),
  updated_at: varchar("updated_at", { length: 256 }),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
});

export const cities = pgTable("cities", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  state_id: integer("state_id").references(() => states.id),
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id").references(() => orders.id),
  user_id: integer("user_id").references(() => users.id),
  comment_text: varchar("comment_text", { length: 256 }),
  is_complaint: boolean("is_complaint"),
  is_praise: boolean("is_praise"),
  created_at: varchar("created_at", { length: 256 }),
  updated_at: varchar("updated_at", { length: 256 }),
});

export const drivers = pgTable("drivers", {
  id: serial("id").primaryKey(),
  car_make: varchar("car_make", { length: 256 }),
  car_model: varchar("car_model", { length: 256 }),
  car_year: integer("car_year"),
  user_id: integer("user_id").references(() => users.id),
  online: boolean("online"),
  delivering: boolean("delivering"),
  created_at: varchar("created_at", { length: 256 }),
  updated_at: varchar("updated_at", { length: 256 }),
});

export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  restaurant_id: integer("restaurant_id").references(() => restaurants.id),
  category_id: integer("category_id").references(() => categories.id),
  description: varchar("description", { length: 256 }),
  ingredients: varchar("ingredients", { length: 256 }),
  price: varchar("price", { length: 256 }),
  active: boolean("active"),
  created_at: varchar("created_at", { length: 256 }),
  updated_at: varchar("updated_at", { length: 256 }),
});

export const orderMenuItems = pgTable("order_menu_items", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id").references(() => orders.id),
  menu_item_id: integer("menu_item_id").references(() => menuItems.id),
  quantity: integer("quantity"),
  item_price: varchar("item_price", { length: 256 }),
  price: varchar("price", { length: 256 }),
  comment: varchar("comment", { length: 256 }),
});

export const orderStatuses = pgTable("order_statuses", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id").references(() => orders.id),
  status_catalog_id: integer("status_catalog_id").references(
    () => statusCatalogs.id
  ),
  created_at: varchar("created_at", { length: 256 }),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  restaurant_id: integer("restaurant_id").references(() => restaurants.id),
  estimated_delivery_time: varchar("estimated_delivery_time", { length: 256 }),
  actual_delivery_time: varchar("actual_delivery_time", { length: 256 }),
  delivery_address_id: integer("delivery_address_id").references(
    () => addresses.id
  ),
  user_id: integer("user_id").references(() => users.id),
  driver_id: integer("driver_id").references(() => drivers.id),
  price: varchar("price", { length: 256 }),
  discount: varchar("discount", { length: 256 }),
  final_price: varchar("final_price", { length: 256 }),
  comment: varchar("comment", { length: 256 }),
  created_at: varchar("created_at", { length: 256 }),
  updated_at: varchar("updated_at", { length: 256 }),
});

export const restaurants = pgTable("restaurants", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  street_address: varchar("street_address", { length: 256 }),
  zip_code: varchar("zip_code", { length: 10 }),
  city_id: integer("city_id").references(() => cities.id),
  created_at: varchar("created_at", { length: 256 }),
  updated_at: varchar("updated_at", { length: 256 }),
});

export const states = pgTable("states", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  code: varchar("code", { length: 2 }),
});

export const statusCatalogs = pgTable("status_catalogs", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  contact_phone: varchar("contact_phone", { length: 20 }),
  phone_verified: boolean("phone_verified"),
  email: varchar("email", { length: 256 }),
  email_verified: boolean("email_verified"),
  confirmation_code: varchar("confirmation_code", { length: 256 }),
  password: varchar("password", { length: 256 }),
  created_at: varchar("created_at", { length: 256 }),
  updated_at: varchar("created_at", { length: 256 }),
});

export const restaurantOwners = pgTable("restaurant_owners", {
  id: serial("id").primaryKey(),
  restaurant_id: integer("restaurant_id").references(() => restaurants.id),
  owner_id: integer("owner_id").references(() => users.id),
});
