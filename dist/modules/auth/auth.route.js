"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const auth_controller_1 = require("./auth.controller");
const passport_1 = __importDefault(require("passport"));
const express_1 = require("express");
const googleStrategy_1 = require("./googleStrategy");
const router = (0, express_1.Router)();
router.post("/signup", 
// validateRequest(userValidationSchema),
auth_controller_1.authController.signUp);
router.post("/signin", auth_controller_1.authController.signIn);
router.get("/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "/login",
    failureMessage: true,
}), auth_controller_1.authController.handleGoogleSignIn);
router.get("/logOut", auth_controller_1.authController.logOut);
router.get("/me", googleStrategy_1.ensureAuthenticated, auth_controller_1.authController.getAuthUser);
exports.authRoute = router;
