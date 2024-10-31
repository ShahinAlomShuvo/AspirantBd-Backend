/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from "passport";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

const authUser = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (err: Error, user: any, info: any) => {
      if (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
          message: "An error occurred during authentication",
          error: err.message,
        });
      }

      if (!user) {
        return res.status(httpStatus.UNAUTHORIZED).json({
          message: "Unauthorized access",
          reason: info ? info.message : "Token is invalid or missing",
        });
      }

      req.user = user;
      next();
    }
  )(req, res, next);
};

export default authUser;
