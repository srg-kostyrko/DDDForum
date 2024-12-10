import "dotenv/config";
import { db } from "./index.js";
import {
  commentsTable,
  membersTable,
  postsTable,
  usersTable,
  votesTable,
} from "./schema.js";

const initialUsers: Array<typeof usersTable.$inferInsert> = [
  {
    id: 1,
    email: "bobvance@gmail.com",
    firstName: "Bob",
    lastName: "Vance",
    username: "bobvance",
    password: "123",
  },
  {
    id: 2,
    email: "tonysoprano@gmail.com",
    firstName: "Tony",
    lastName: "Soprano",
    username: "tonysoprano",
    password: "123",
  },
  {
    id: 3,
    email: "billburr@gmail.com",
    firstName: "Bill",
    lastName: "Burr",
    username: "billburr",
    password: "123",
  },
];

const initialMemberUserIds: Array<typeof membersTable.$inferInsert> = [
  { id: 1, userId: 1 },
  { id: 2, userId: 2 },
  { id: 3, userId: 3 },
];

const initialPosts: Array<typeof postsTable.$inferInsert> = [
  {
    id: 1,
    title: "First post!",
    content: "This is bob vances first post",
    postType: "Text",
    dateCreated: new Date(),
    memberId: 1,
  },
  {
    id: 2,
    title: "Second post!",
    content: "This is bobs second post",
    postType: "Text",
    dateCreated: new Date(),
    memberId: 1,
  },
  {
    id: 3,
    title: "another post",
    content: "This is tonys first post",
    postType: "Text",
    dateCreated: new Date(),
    memberId: 2,
  },
  {
    id: 4,
    title: "Links",
    content: "This is a link post",
    postType: "<https://khalilstemmler.com>",
    dateCreated: new Date(),
    memberId: 2,
  },
];

const initialPostVotes: Array<typeof votesTable.$inferInsert> = [
  // Everyone upvotes their own first post
  { id: 1, postId: 1, voteType: "Upvote", memberId: 1 },
  { id: 2, postId: 2, voteType: "Upvote", memberId: 1 },
  { id: 3, postId: 3, voteType: "Upvote", memberId: 2 },
  { id: 4, postId: 4, voteType: "Upvote", memberId: 2 },

  // Tony's post upvoted by Bob
  { id: 5, postId: 3, voteType: "Upvote", memberId: 1 },

  // Bob's second post downvoted by Bill
  { id: 6, postId: 2, voteType: "Downvote", memberId: 3 },
];

const initialPostComments: Array<typeof commentsTable.$inferInsert> = [
  {
    id: 1,
    text: "I posted this!",
    memberId: 1,
    postId: 1,
    parentCommentId: null,
    dateCreated: new Date(),
  },
  {
    id: 2,
    text: "Nice",
    memberId: 2,
    postId: 2,
    parentCommentId: null,
    dateCreated: new Date(),
  },
];

async function seed() {
  await db.insert(usersTable).values(initialUsers);
  await db.insert(membersTable).values(initialMemberUserIds);
  await db.insert(postsTable).values(initialPosts);
  await db.insert(votesTable).values(initialPostVotes);
  await db.insert(commentsTable).values(initialPostComments);

  console.info("Database seeded");
}

seed();
