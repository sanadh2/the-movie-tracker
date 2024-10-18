import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Email must be valid" })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});
type LoginData = z.infer<typeof loginSchema>;
export { loginSchema };
export type { LoginData };
