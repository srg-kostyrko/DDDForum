import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import { drizzle } from "drizzle-orm/libsql";
import { usersTable } from "./db/schema.js";
import { randomBytes } from "node:crypto";
import { LibsqlError } from "@libsql/client";
import { isLibsqlError } from "./utils.js";
import { eq } from "drizzle-orm";

const db = drizzle(process.env.DB_FILE_NAME!);

const app = express();
app.use(express.json());
app.use(cors());

// Create a new user
app.post("/users/new", async (req: Request, res: Response) => {
  if (!req.body) {
    return void res
      .status(400)
      .json({ error: "ValidationError", data: undefined, success: false });
  }
  if (
    !req.body.username ||
    !req.body.email ||
    !req.body.firstName ||
    !req.body.lastName
  ) {
    return void res
      .status(400)
      .json({ error: "ValidationError", data: undefined, success: false });
  }
  const user: typeof usersTable.$inferInsert = {
    username: req.body.username,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: randomBytes(8).toString("hex"),
  };
  try {
    const [newUser] = await db.insert(usersTable).values(user).returning();
    return void res.status(201).json({
      error: undefined,
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
      success: true,
    });
  } catch (error) {
    if (isLibsqlError(error)) {
      console.log(error);
      if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
        if (error.message.includes("users_table.username")) {
          return void res.status(409).json({
            error: "UsernameAlreadyTaken",
            data: undefined,
            success: false,
          });
        } else if (error.message.includes("users_table.email")) {
          return void res.status(409).json({
            error: "EmailAlreadyInUse",
            data: undefined,
            success: false,
          });
        }
      }
    }
    return void res
      .status(500)
      .json({ error: "ServerError", data: undefined, success: false });
  }
});

// Edit a user
app.post("/users/edit/:userId", async (req: Request, res: Response) => {
  if (!req.body) {
    return void res
      .status(400)
      .json({ error: "ValidationError", data: undefined, success: false });
  }
  if (
    !req.body.username ||
    !req.body.email ||
    !req.body.firstName ||
    !req.body.lastName
  ) {
    return void res
      .status(400)
      .json({ error: "ValidationError", data: undefined, success: false });
  }
  try {
    const [updatedUser] = await db
      .update(usersTable)
      .set({
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      })
      .where(eq(usersTable.id, parseInt(req.params.userId)))
      .returning();
    if (!updatedUser) {
      return void res.status(404).json({
        error: "UserNotFound",
        data: undefined,
        success: false,
      });
    }
    return void res.status(200).json({
      error: undefined,
      data: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
      },
      success: true,
    });
  } catch (error) {
    if (isLibsqlError(error)) {
      console.log(error);
      if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
        if (error.message.includes("users_table.username")) {
          return void res.status(409).json({
            error: "UsernameAlreadyTaken",
            data: undefined,
            success: false,
          });
        } else if (error.message.includes("users_table.email")) {
          return void res.status(409).json({
            error: "EmailAlreadyInUse",
            data: undefined,
            success: false,
          });
        }
      }
    }
    return void res
      .status(500)
      .json({ error: "ServerError", data: undefined, success: false });
  }
  res.end();
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
