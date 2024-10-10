import passport from "passport";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

const authAdmin = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({
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

    if (user.role !== "admin") {
      return res
        .status(httpStatus.FORBIDDEN)
        .json({ message: "Forbidden: Admins only" });
    }

    req.user = user;
    next();
  })(req, res, next);
};

export default authAdmin;
