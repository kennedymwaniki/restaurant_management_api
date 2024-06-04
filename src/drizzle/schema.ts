import { integer, pgEnum, pgTable, serial, boolean, varchar } from 'drizzle-orm/pg-core';




// Tables
export const addresses = pgTable('addresses', {
  id: serial('id').primaryKey(),
  street_address_1: varchar('street_address_1', { length: 256 }),
  street_address_2: varchar('street_address_2', { length: 256 }),
  zip_code: varchar('zip_code', { length: 10 }),
  delivery_instructions: varchar('delivery_instructions', { length: 256 }),
  user_id: integer('user_id'),
  city_id: integer('city_id'),
  created_at: varchar('created_at', { length: 256 }),
  updated_at: varchar('updated_at', { length: 256 }),
});

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
});

export const cities = pgTable('cities', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  state_id: integer('state_id'),
});

export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  order_id: integer('order_id'),
  user_id: integer('user_id'),
  comment_text: varchar('comment_text', { length: 256 }),
  is_complaint: boolean('is_complaint'),
  is_praise: boolean('is_praise'),
  created_at: varchar('created_at', { length: 256 }),
  updated_at: varchar('updated_at', { length: 256 }),
});
