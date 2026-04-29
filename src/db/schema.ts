import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const userProgress = sqliteTable("user_progress", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: integer("user_id", { mode: "number" }).notNull(),
  module: text("module").notNull(),
  itemId: text("item_id").notNull(),
  correctCount: integer("correct_count", { mode: "number" }).notNull().default(0),
  incorrectCount: integer("incorrect_count", { mode: "number" }).notNull().default(0),
  lastReviewed: integer("last_reviewed", { mode: "timestamp" }),
});

export const mistakes = sqliteTable("mistakes", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: integer("user_id", { mode: "number" }).notNull(),
  module: text("module").notNull(),
  itemId: text("item_id").notNull(),
  mistakeCount: integer("mistake_count", { mode: "number" }).notNull().default(1),
  reviewCount: integer("review_count", { mode: "number" }).notNull().default(0),
  lastMistakeAt: integer("last_mistake_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
});
