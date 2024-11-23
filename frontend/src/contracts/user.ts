import * as z from 'zod';

export const userRegisterShema = z.object({
  email: z.string().email(),
  username: z.string().min(2).max(255),
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
});

export type User = z.infer<typeof userRegisterShema>;
