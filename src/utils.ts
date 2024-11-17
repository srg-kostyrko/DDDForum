import { LibsqlError } from "@libsql/client";

export function isLibsqlError(err: any): err is LibsqlError {
    return err?.libsqlError;
}