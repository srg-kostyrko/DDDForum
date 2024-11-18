import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  email: text().notNull().unique(),
  username: text().notNull().unique(),
  password: text().notNull(),
  firstName: text().notNull(),
  lastName: text().notNull()
});