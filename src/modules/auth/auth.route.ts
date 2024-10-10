import { Router } from "express";
import { authController } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest.middleware";
import { userValidationSchema } from "../user/user.validation";

const router = Router();

router.post(
  "/signup",
  validateRequest(userValidationSchema),
  authController.signUp
);

router.post("/signin", authController.signIn);

export const authRoute = router;
