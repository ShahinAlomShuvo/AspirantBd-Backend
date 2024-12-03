"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const handleDuplicateKeyError = (err) => {
    var _a;
    const message = (_a = err.message.match(/: "([^"]+)"/)) === null || _a === void 0 ? void 0 : _a[1];
    const errorMessages = [
        {
            path: "",
            message: `${message} is already exist`,
        },
    ];
    return {
        statusCode: http_status_1.default.BAD_REQUEST,
        message: "Duplicate key error",
        errorMessages,
    };
};
exports.default = handleDuplicateKeyError;
