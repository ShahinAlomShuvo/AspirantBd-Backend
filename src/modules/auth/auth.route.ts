import { authController } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest.middleware";
import { userValidationSchema } from "../user/user.validation";
import passport from "passport";
import { Router } from "express";
import { ensureAuthenticated } from "./googleStrategy";

const router = Router();

router.post(
  "/signup",
  // validateRequest(userValidationSchema),
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
