import { z } from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "Please fill in your first name" })
    .min(3, { message: "Name cannot go below 3 characters" }),
  lastName: z
    .string()
    .min(1, { message: "Please fill in your last name" })
    .min(3, { message: "Name cannot go below 3 characters" }),
  email: z
    .string()
    .min(1, { message: "Please fill in your email" })
    .email({ message: "Invalid email" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password need to contains atleast 6 characters" }),
});
