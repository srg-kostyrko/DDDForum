import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";

import { postsTable, usersTable } from "./db/schema.js";
import { randomBytes } from "node:crypto";
import { desc, eq } from "drizzle-orm";
import { LibsqlError } from "@libsql/client";
import { db } from "./db/index.js";

enum Errors {
  UserNotFound = "UserNotFound",
  ValidationError = "ValidationError",
  ServerError = "ServerError",
  UsernameAlreadyTaken = "UsernameAlreadyTaken",
  EmailAlreadyInUse = "EmailAlreadyInUse",
  ClientError = "ClientError",
}

const app = express();
app.use(express.json());
app.use(cors());

app.get("/posts", async (req: Request, res: Response) => {
  try {
    const { sort } = req.query;

    if (sort !== "recent") {
      return void res.status(400).json(buildErrorResponse(Errors.ClientError));
    }
    const posts = await db.query.postsTable.findMany({
      orderBy: [desc(postsTable.dateCreated)],
      with: {
        votes: true,
        member: {
          with: {
            user: true,
          },
        },
        comments: true,
      },
    });
    return void res.status(200).json(buildDataResponse(posts));
  } catch (error) {
    return void res.status(500).json(buildErrorResponse(Errors.ServerError));
  }
});

// Create a new user
app.post("/users/new", async (req: Request, res: Response) => {
  if (!req.body || !isValidUsedData(req.body)) {
    return void res
      .status(400)
      .json(buildErrorResponse(Errors.ValidationError));
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
    return void res.status(201).json(
      buildDataResponse({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      })
    );
  } catch (error) {
    console.error(error);
    if (isLibsqlError(error)) {
      if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
        if (error.message.includes("users.username")) {
          return void res
            .status(409)
            .json(buildErrorResponse(Errors.UsernameAlreadyTaken));
        } else if (error.message.includes("users.email")) {
          return void res
            .status(409)
            .json(buildErrorResponse(Errors.EmailAlreadyInUse));
        }
      }
    }
    return void res.status(500).json(buildErrorResponse(Errors.ServerError));
  }
});

// Edit a user
app.post("/users/edit/:userId", async (req: Request, res: Response) => {
  if (!req.body || !isValidUsedData(req.body)) {
    return void res
      .status(400)
      .json(buildErrorResponse(Errors.ValidationError));
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
      return void res.status(404).json(buildErrorResponse(Errors.UserNotFound));
    }
    return void res.status(200).json(
      buildDataResponse({
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
      })
    );
  } catch (error) {
    console.log(error);
    if (isLibsqlError(error)) {
      if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
        if (error.message.includes("users.username")) {
          return void res
            .status(409)
            .json(buildErrorResponse(Errors.UsernameAlreadyTaken));
        } else if (error.message.includes("users.email")) {
          return void res
            .status(409)
            .json(buildErrorResponse(Errors.EmailAlreadyInUse));
        }
      }
    }
    return void res.status(500).json(buildErrorResponse(Errors.ServerError));
  }
});

// Get a user by email
app.get("/users", async (req: Request, res: Response) => {
  const { email } = req.query;
  if (!email || typeof email !== "string") {
    return void res
      .status(400)
      .json(buildErrorResponse(Errors.ValidationError));
  }
  try {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    if (!user) {
      return void res.status(404).json(buildErrorResponse(Errors.UserNotFound));
    }
    return void res.status(200).json(
      buildDataResponse({
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      })
    );
  } catch (error) {
    return void res.status(500).json(buildErrorResponse(Errors.ServerError));
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

function isValidUsedData(data: any) {
  return data.username && data.email && data.firstName && data.lastName;
}

function buildDataResponse(data: any) {
  return {
    error: undefined,
    data,
    success: true,
  };
}

function buildErrorResponse(error: Errors) {
  return {
    error,
    data: undefined,
    success: false,
  };
}

function isLibsqlError(err: any): err is LibsqlError {
  return err?.libsqlError;
}
