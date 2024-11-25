import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema.js";

export const db = drizzle({
  connection: process.env.DB_FILE_NAME!,
  schema,
});
