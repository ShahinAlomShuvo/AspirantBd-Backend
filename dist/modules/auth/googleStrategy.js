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
exports.ensureAuthenticated = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const config_1 = __importDefault(require("../../config"));
const user_interface_1 = require("../user/user.interface");
const user_model_1 = __importDefault(require("../user/user.model"));
// Configure Google OAuth Strategy
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: config_1.default.GOOGLE_CLIENT_ID,
    clientSecret: config_1.default.GOOGLE_CLIENT_SECRET,
    callbackURL: config_1.default.GOOGLE_CALLBACK_URL,
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Create user object from profile
        const user = {
            name: profile.displayName,
            email: (profile.emails && profile.emails[0] && profile.emails[0].value) ||
                "",
            avatar: profile.photos && profile.photos[0] && profile.photos[0].value,
            role: user_interface_1.Role.USER,
            password: "",
            phone: "",
            address: "",
        };
        // Check if the user exists in the database
        const existingUser = yield user_model_1.default.findOne({ email: user.email });
        // Create a new user if not found
        if (!existingUser) {
            const newUser = yield user_model_1.default.create(user);
            return done(null, newUser);
        }
        return done(null, existingUser);
    }
    catch (err) {
        return done(err);
    }
})));
// Serialize user into session (storing user ID)
passport_1.default.serializeUser((user, done) => {
    done(null, user.id); // Store the user ID in the session
});
// Deserialize user from session (retrieve the full user object)
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(id);
        done(null, user);
    }
    catch (err) {
        done(err);
    }
}));
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
};
exports.ensureAuthenticated = ensureAuthenticated;
exports.default = passport_1.default;
