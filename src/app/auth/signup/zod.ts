import { z } from "zod";

const signUpSchema = z.object({
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
  name: z.string().min(6, { message: "Name must be at least 6 characters" }),
  otp: z
    .string()
    .min(6, { message: "OTP must be at least 6 characters" })
    .optional(),
  image: z.string().optional(),
});
type SignUpData = z.infer<typeof signUpSchema>;
export { signUpSchema };
export type { SignUpData };
