"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const passport_1 = __importDefault(require("passport"));
const http_status_1 = __importDefault(require("http-status"));
const authAdmin = (req, res, next) => {
    passport_1.default.authenticate("jwt", { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({
                message: "An error occurred during authentication",
                error: err.message,
            });
        }
        if (!user) {
            return res.status(http_status_1.default.UNAUTHORIZED).json({
                message: "Unauthorized access",
                reason: info ? info.message : "Token is invalid or missing",
            });
        }
        if (user.role !== "admin") {
            return res
                .status(http_status_1.default.FORBIDDEN)
                .json({ message: "Forbidden: Admins only" });
        }
        req.user = user;
        next();
    })(req, res, next);
};
exports.default = authAdmin;
