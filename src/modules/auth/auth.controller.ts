import catchAsync from "../../utils/catchAsync.utils";
import sendResponse from "../../utils/sendResponse.utils";
import httpStatus from "http-status";
import { authService } from "./auth.service";
import config from "../../config";
import passport from "passport";
import { Request, Response } from "express";
import { TUser } from "../user/user.interface";

const signUp = catchAsync(async (req, res) => {
  const userData = req.body;
  const user = await authService.signUp(userData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: user,
  });
});

const signIn = catchAsync(async (req, res) => {
  const userData = req.body;
  const user = await authService.signIn(userData);

  res.cookie("token", user.refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: user.user,
    token: user.accessToken,
  });
});

const googleSignIn = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const handleGoogleSignIn = catchAsync(async (req, res) => {
  res.redirect("http://localhost:5173");
});

const logOut = (req: Request, res: Response) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid", { path: "/" });
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged out successfully",
      data: null,
    });
  });
};

const getAuthUser = catchAsync(async (req, res) => {
  const user = req.user;

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User fetched successfully",
    data: user,
  });
});

export const authController = {
  signUp,
  signIn,
  googleSignIn,
  handleGoogleSignIn,
  logOut,
  getAuthUser,
};
