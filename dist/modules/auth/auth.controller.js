"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const catchAsync_utils_1 = __importDefault(require("../../utils/catchAsync.utils"));
const sendResponse_utils_1 = __importDefault(require("../../utils/sendResponse.utils"));
const http_status_1 = __importDefault(require("http-status"));
const auth_service_1 = require("./auth.service");
const config_1 = __importDefault(require("../../config"));
const passport_1 = __importDefault(require("passport"));
const signUp = (0, catchAsync_utils_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const user = yield auth_service_1.authService.signUp(userData);
    (0, sendResponse_utils_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: "User registered successfully",
        data: user,
    });
}));
const signIn = (0, catchAsync_utils_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const user = yield auth_service_1.authService.signIn(userData);
    res.cookie("token", user.refreshToken, {
        httpOnly: true,
        secure: config_1.default.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(http_status_1.default.OK).json({
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User logged in successfully",
        data: user.user,
        token: user.accessToken,
    });
}));
const googleSignIn = passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
});
const handleGoogleSignIn = (0, catchAsync_utils_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.redirect("http://localhost:5173");
}));
const logOut = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie("connect.sid", { path: "/" });
        (0, sendResponse_utils_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: "User logged out successfully",
            data: null,
        });
    });
};
const getAuthUser = (0, catchAsync_utils_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    (0, sendResponse_utils_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "User fetched successfully",
        data: user,
    });
}));
exports.authController = {
    signUp,
    signIn,
    googleSignIn,
    handleGoogleSignIn,
    logOut,
    getAuthUser,
};
