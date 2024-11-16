import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import { drizzle } from "drizzle-orm/libsql";
import { usersTable } from "./db/schema";

const db = drizzle(process.env.DB_FILE_NAME!);

const app = express();
app.use(express.json());
app.use(cors());

// Create a new user
app.post("/users/new", async (req: Request, res: Response) => {
  const user: typeof usersTable.$inferInsert = {
    username: "john",
    email: "john@example.com",
    password: "password",
    firstName: "John",
    lastName: "Doe",
  };
  await db.insert(usersTable).values(user);
  console.log("New user created!");
  res.end();
});

// Edit a user
app.post("/users/edit/:userId", async (req: Request, res: Response) => {
  // ...
});

// Get a user by email
app.get("/users", async (req: Request, res: Response) => {
  console.log("start /users");
  console.log(await db.select().from(usersTable));
  console.log("end /users");
  res.end();
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
