import { z } from "zod";
import { Role, Provider } from "./user.interface";

// Base validation schema for common fields
const baseUserValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  role: z.enum([Role.ADMIN, Role.USER]).optional(),
  avatar: z.string().optional(),
  provider: z
    .enum([Provider.LOCAL, Provider.GOOGLE, Provider.FACEBOOK])
    .optional()
    .default(Provider.LOCAL),
});

// Validation schema for local users (with password, phone, and address)
const localUserValidationSchema = baseUserValidationSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .refine((value) => !!value, {
      message: "Phone number is required for local provider",
      path: ["phone"],
    }),
  address: z
    .string()
    .min(1, "Address is required")
    .refine((value) => !!value, {
      message: "Address is required for local provider",
      path: ["address"],
    }),
});

// Validation schema for external provider users (includes providerId)
const externalProviderUserValidationSchema = baseUserValidationSchema.extend({
  providerId: z.string().optional(),
  password: z.string().optional(), // No password required for external providers
  // Phone and address are not included for external providers
});

// Dynamically adjust schema based on provider type
export const userValidationSchema = z.union([
  localUserValidationSchema.refine((data) => data.provider === Provider.LOCAL, {
    message: "Password is required for local provider",
    path: ["password"],
  }),
  externalProviderUserValidationSchema.refine(
    (data) => data.provider !== Provider.LOCAL,
    {
      message:
        "External provider should not have a password, phone, or address",
      path: ["password", "phone", "address"],
    }
  ),
]);

export const userValidation = {
  localUserValidationSchema,
  externalProviderUserValidationSchema,
};
