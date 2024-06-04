import {
  integer,
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

// Tables

export const menuItemTable = pgTable("menu_item", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  restaurant_id: integer("restaurant_id").references(() => restaurantTable.id),
  category_id: integer("category_id").references(() => categoryTable.id),
  description: varchar("description", { length: 256 }),
  ingredients: varchar("ingredients", { length: 256 }),
  price: varchar("price", { length: 256 }),
  active: boolean("active"),
  created_at: timestamp("created_at"),
  updated_at: timestamp("updated_at"),
});

export const cityTable = pgTable("city", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  state_id: integer("state_id").references(() => stateTable.id),
});

export const stateTable = pgTable("state", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  code: varchar("code", { length: 20 }),
});

export const addressTable = pgTable("address", {
  id: serial("id").primaryKey(),
  street_address_1: varchar("street_address_1", { length: 256 }),
  street_address_2: varchar("street_address_2", { length: 256 }),
  zip_code: varchar("zip_code", { length: 10 }),
  delivery_instructions: varchar("delivery_instructions", { length: 256 }),
  user_id: integer("user_id").references(() => usersTable.id),
  city_id: integer("city_id").references(() => cityTable.id),
  created_at: timestamp("created_at"),
  updated_at: timestamp("updated_at"),
});

export const categoryTable = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
});

export const commentTable = pgTable("comments", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id").references(() => ordersTable.id),
  user_id: integer("user_id").references(() => usersTable.id),
  comment_text: varchar("comment_text", { length: 256 }),
  is_complaint: boolean("is_complaint"),
  is_praise: boolean("is_praise"),
  created_at: timestamp("created_at"),
  updated_at: timestamp("updated_at"),
});

export const driversTable = pgTable("drivers", {
  id: serial("id").primaryKey(),
  car_make: varchar("car_make", { length: 256 }),
  car_model: varchar("car_model", { length: 256 }),
  car_year: integer("car_year"),
  user_id: integer("user_id").references(() => usersTable.id),
  online: boolean("online"),
  delivering: boolean("delivering"),
  created_at: timestamp("created_at"),
  updated_at: timestamp("updated_at"),
});

export const orderMenuItemTable = pgTable("order_menu_item", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id").references(() => ordersTable.id),
  menu_item_id: integer("menu_item_id").references(() => menuItemTable.id),
  quantity: integer("quantity"),
  item_price: varchar("item_price", { length: 256 }),
  price: timestamp("price"),
  comment: timestamp("comment"),
});

export const orderStatusTable = pgTable("order_status", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id").references(() => ordersTable.id),
  status_catalog_id: integer("status_catalog_id").references(
    () => statusCatalogueTable.id
  ),
  created_at: varchar("created_at", { length: 256 }),
});

export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  restaurant_id: integer("restaurant_id").references(() => restaurantTable.id),
  estimated_delivery_time: varchar("estimated_delivery_time", { length: 256 }),
  actual_delivery_time: varchar("actual_delivery_time", { length: 256 }),
  delivery_address_id: integer("delivery_address_id").references(
    () => addressTable.id
  ),
  user_id: integer("user_id").references(() => usersTable.id),
  driver_id: integer("driver_id").references(() => driversTable.id),
  price: varchar("price", { length: 256 }),
  discount: varchar("discount", { length: 256 }),
  final_price: varchar("final_price", { length: 256 }),
  comment: varchar("comment", { length: 256 }),
  created_at: timestamp("created_at"),
  updated_at: timestamp("updated_at"),
});

export const restaurantTable = pgTable("restaurantTable", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  street_address: varchar("street_address", { length: 256 }),
  zip_code: varchar("zip_code", { length: 10 }),
  city_id: integer("city_id").references(() => cityTable.id),
  created_at: varchar("created_at", { length: 256 }),
  updated_at: varchar("updated_at", { length: 256 }).notNull(),
});

export const statusCatalogueTable = pgTable("status_catalog", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
});

export const usersTable = pgTable("users", {
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

export const restaurantOwnerTable = pgTable("restaurant_owner", {
  id: serial("id").primaryKey(),
  restaurant_id: integer("restaurant_id").references(() => restaurantTable.id),
  owner_id: integer("owner_id").references(() => usersTable.id),
});

// relationships

//1 menu_item

export const menuItemRelations = relations(menuItemTable, ({ one }) => ({
  restaurant: one(restaurantTable, {
    fields: [menuItemTable.restaurant_id],
    references: [restaurantTable.id],
  }),
  category: one(categoryTable, {
    fields: [menuItemTable.category_id],
    references: [categoryTable.id],
  }),
}));

//2 category
export const categoryMenuRelations = relations(categoryTable, ({ many }) => ({
  menuItems: many(menuItemTable),
}));

//3 restaurant
//one restaurant contains many menu items and orders
export const restaurantRelations = relations(restaurantTable, ({ many }) => ({
  menuItem: many(menuItemTable),
  orders: many(ordersTable),
}));

// A restaurant owner can own many restaurants
export const restaurantOwnerRelations = relations(
  restaurantOwnerTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [restaurantOwnerTable.owner_id],
      references: [usersTable.id],
    }),
    restaurant: one(restaurantTable, {
      fields: [restaurantOwnerTable.restaurant_id],
      references: [restaurantTable.id],
    }),
  })
);

//4 city
// a city can have many restaurants and addresses
export const cityRestaurantRelations = relations(
  cityTable,
  ({ many, one }) => ({
    restaurants: many(restaurantTable),
    addresses: many(addressTable),
    
    // one city belongs to one state
    state: one(stateTable, {
      fields: [cityTable.state_id],
      references: [stateTable.id],
    }),
  })
);

//5 state
// one state can have many cities
export const stateRelations = relations(stateTable, ({ many }) => ({
  cities: many(cityTable),
}));

//7. address
// An address belongs to one city and can be associated with many orders
export const addressRelations = relations(addressTable, ({ one, many }) => ({
  city: one(cityTable, {
    fields: [addressTable.city_id],
    references: [cityTable.id],
  }),
  orders: many(ordersTable),
}));

//8. order
// An order is associated with one restaurant, one delivery address, one user, and can have many order items, order statuses, and commentTable
export const orderRelations = relations(ordersTable, ({ one, many }) => ({
  restaurant: one(restaurantTable, {
    fields: [ordersTable.restaurant_id],
    references: [restaurantTable.id],
  }),
  deliveryAddress: one(addressTable, {
    fields: [ordersTable.delivery_address_id],
    references: [addressTable.id],
  }),
  user: one(usersTable, {
    fields: [ordersTable.user_id],
    references: [usersTable.id],
  }),
  driver: one(driversTable, {
    fields: [ordersTable.driver_id],
    references: [driversTable.id],
  }),
  orderMenuItems: many(orderMenuItemTable),
  orderStatuses: many(orderStatusTable),
  commentTable: many(commentTable),
}));

//9. order_menu_item
// An order menu item is associated with one order and one menu item
export const orderMenuItemRelations = relations(
  orderMenuItemTable,
  ({ one }) => ({
    order: one(ordersTable, {
      fields: [orderMenuItemTable.order_id],
      references: [ordersTable.id],
    }),
    menuItem: one(menuItemTable, {
      fields: [orderMenuItemTable.menu_item_id],
      references: [menuItemTable.id],
    }),
  })
);

//10. order_status
// An order status is associated with one order and one status catalogue entry
export const orderStatusRelations = relations(orderStatusTable, ({ one }) => ({
  order: one(ordersTable, {
    fields: [orderStatusTable.order_id],
    references: [ordersTable.id],
  }),
  statusCatalogue: one(statusCatalogueTable, {
    fields: [orderStatusTable.status_catalog_id],
    references: [statusCatalogueTable.id],
  }),
}));

//11. status_catalogue
// A status catalogue can have many order statuses
export const statusCatalogueRelations = relations(
  statusCatalogueTable,
  ({ many }) => ({
    orderStatuses: many(orderStatusTable),
  })
);

//12. drivers
// A driver is associated with one user and can have many orders
export const driverRelations = relations(driversTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [driversTable.user_id],
    references: [usersTable.id],
  }),
  orders: many(ordersTable),
}));

//13. comment
// A comment is associated with one order and one user
export const commentRelations = relations(commentTable, ({ one }) => ({
  order: one(ordersTable, {
    fields: [commentTable.order_id],
    references: [ordersTable.id],
  }),
  user: one(usersTable, {
    fields: [commentTable.user_id],
    references: [usersTable.id],
  }),
}));
