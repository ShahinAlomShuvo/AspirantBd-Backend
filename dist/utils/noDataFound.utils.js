"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const noDataFound = (res, message) => {
    return res.json({
        success: false,
        statusCode: http_status_1.default.NOT_FOUND,
        message,
        data: [],
    });
};
exports.default = noDataFound;
