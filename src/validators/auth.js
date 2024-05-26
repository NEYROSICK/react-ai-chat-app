import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid Email Address" }),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 character(s)" })
    .max(35, { message: "Password must contain at most 35 character(s)" }),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(6, { message: "Username must contain at least 6 character(s)" })
    .max(35, { message: "Username must contain at most 35 character(s)" }),
  email: z.string().email({ message: "Please enter a valid Email Address" }),
  password: z
    .string()
    .min(6, { message: "Password must contain at least 6 character(s)" })
    .max(35, { message: "Password must contain at most 35 character(s)" }),
});

