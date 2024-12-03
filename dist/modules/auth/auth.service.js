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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = require("../../errors/AppError");
const user_model_1 = __importDefault(require("../user/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUp = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield existingUser(user.email);
    if (isExist) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, "User already exist");
    }
    const newUser = yield user_model_1.default.create(user);
    const result = yield user_model_1.default.findById(newUser._id).select("-password");
    return result;
});
const existingUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.default.findOne({ email });
    return existingUser;
});
const signIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.default.findOne({ email: payload.email });
    if (!existingUser) {
        throw new AppError_1.AppError(http_status_1.default.BAD_REQUEST, "Invalid email or password");
    }
    // const isMatch = comparePassword(payload?.password, existingUser.password);
    // if (!isMatch) {
    //   throw new AppError(httpStatus.BAD_REQUEST, "Invalid email or password");
    // }
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const _a = existingUser.toJSON(), { password } = _a, jwtPayload = __rest(_a, ["password"]);
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.JWT_ACCESS_SECRET, {
        expiresIn: config_1.default.JWT_ACCESS_EXPIRE_IN,
    });
    const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.JWT_REFRESH_SECRET, {
        expiresIn: config_1.default.JWT_REFRESH_EXPIRE_IN,
    });
    return { user: jwtPayload, accessToken, refreshToken };
});
exports.authService = {
    signUp,
    signIn,
    existingUser,
};
