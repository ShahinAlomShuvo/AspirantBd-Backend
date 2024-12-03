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
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const user_interface_1 = require("./user.interface");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
        type: String,
        enum: Object.values(user_interface_1.Role),
        default: user_interface_1.Role.USER,
    },
    password: {
        type: String,
        required: function () {
            return this.provider === user_interface_1.Provider.LOCAL;
        },
    },
    phone: { type: String },
    address: { type: String },
    avatar: { type: String },
    provider: {
        type: String,
        enum: Object.values(user_interface_1.Provider),
        default: user_interface_1.Provider.LOCAL,
        required: function () {
            return this.provider === user_interface_1.Provider.LOCAL ? false : true;
        },
    },
    providerId: { type: String },
}, {
    timestamps: true,
});
// Hash the password before saving if it's a local user
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.password && this.isModified("password")) {
            const hashedPassword = yield bcrypt_1.default.hash(this.password, Number(config_1.default.SALT_ROUNDS));
            this.password = hashedPassword;
        }
        next();
    });
});
const UserModel = (0, mongoose_1.model)("User", userSchema);
exports.default = UserModel;
