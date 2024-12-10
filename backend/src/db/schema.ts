import { relations } from "drizzle-orm";
import { int, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  email: text().notNull().unique(),
  username: text().notNull().unique(),
  password: text().notNull(),
  firstName: text().notNull(),
  lastName: text().notNull(),
});

export const membersTable = sqliteTable("members", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int()
    .notNull()
    .references(() => usersTable.id),
});

export const postsTable = sqliteTable("posts", {
  id: int().primaryKey({ autoIncrement: true }),
  memberId: int()
    .notNull()
    .references(() => membersTable.id),
  postType: text().notNull(),
  title: text().notNull(),
  content: text().notNull(),
  dateCreated: integer({ mode: "timestamp" }).notNull(),
});

export const commentsTable = sqliteTable("comments", {
  id: int().primaryKey({ autoIncrement: true }),
  postId: int()
    .notNull()
    .references(() => postsTable.id),
  memberId: int()
    .notNull()
    .references(() => membersTable.id),
  text: text().notNull(),
  parentCommentId: int(),
  dateCreated: integer({ mode: "timestamp" }).notNull(),
});

export const votesTable = sqliteTable("votes", {
  id: int().primaryKey({ autoIncrement: true }),
  postId: int()
    .notNull()
    .references(() => postsTable.id),
  memberId: int()
    .notNull()
    .references(() => membersTable.id),
  voteType: text().notNull(),
});

export const userRelations = relations(usersTable, ({ one }) => ({
  member: one(membersTable, {
    fields: [usersTable.id],
    references: [membersTable.userId],
  }),
}));

export const memberRelations = relations(membersTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [membersTable.userId],
    references: [usersTable.id],
  }),
  posts: many(postsTable),
  votes: many(votesTable),
  comments: many(commentsTable),
}));

export const postRelations = relations(postsTable, ({ one, many }) => ({
  member: one(membersTable, {
    fields: [postsTable.memberId],
    references: [membersTable.id],
  }),
  comments: many(commentsTable),
  votes: many(votesTable),
}));

export const commentRelations = relations(commentsTable, ({ one, many }) => ({
  post: one(postsTable, {
    fields: [commentsTable.postId],
    references: [postsTable.id],
  }),
  member: one(membersTable, {
    fields: [commentsTable.memberId],
    references: [membersTable.id],
  }),
  parentComment: one(commentsTable, {
    fields: [commentsTable.parentCommentId],
    references: [commentsTable.id],
  }),
  replayComments: many(commentsTable),
}));

export const voteRelations = relations(votesTable, ({ one }) => ({
  post: one(postsTable, {
    fields: [votesTable.postId],
    references: [postsTable.id],
  }),
  member: one(membersTable, {
    fields: [votesTable.memberId],
    references: [membersTable.id],
  }),
}));
