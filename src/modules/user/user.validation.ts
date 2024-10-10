import { z } from "zod";
import { Role } from "./user.interface";

export const userValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  role: z.enum([Role.ADMIN, Role.USER]).optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
});

export const userValidation = {
  userValidationSchema,
};
