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
const passport_jwt_1 = require("passport-jwt");
const passport_1 = __importDefault(require("passport"));
const user_model_1 = __importDefault(require("../user/user.model"));
const config_1 = __importDefault(require("../../config"));
// JWT Strategy options
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config_1.default.JWT_ACCESS_SECRET,
};
// JWT strategy for Passport
passport_1.default.use(new passport_jwt_1.Strategy(opts, (jwtPayload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find user by ID from JWT payload
        const user = yield user_model_1.default.findById(jwtPayload.id);
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }
    catch (err) {
        return done(err, false);
    }
})));
exports.default = passport_1.default;
