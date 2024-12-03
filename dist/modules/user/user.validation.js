"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = exports.userValidationSchema = void 0;
const zod_1 = require("zod");
const user_interface_1 = require("./user.interface");
exports.userValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    email: zod_1.z.string().email("Invalid email format"),
    role: zod_1.z.enum([user_interface_1.Role.ADMIN, user_interface_1.Role.USER]).optional(),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    phone: zod_1.z.string().min(10, "Phone number must be at least 10 digits"),
    address: zod_1.z.string().min(1, "Address is required"),
});
exports.userValidation = {
    userValidationSchema: exports.userValidationSchema,
};
