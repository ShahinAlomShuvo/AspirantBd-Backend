import { authController } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest.middleware";

import passport from "passport";
import { Router } from "express";
import { ensureAuthenticated } from "./googleStrategy";
import { userValidation } from "../user/user.validation";

const router = Router();

router.post(
  "/signup",
  validateRequest(
    userValidation.localUserValidationSchema,
    userValidation.externalProviderUserValidationSchema
  ),
  authController.signUp
);

router.post("/signin", authController.signIn);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  authController.handleGoogleSignIn
);

router.get("/logOut", authController.logOut);

router.get("/me", ensureAuthenticated, authController.getAuthUser);

export const authRoute = router;
