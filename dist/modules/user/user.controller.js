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
exports.userController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_utils_1 = __importDefault(require("../../utils/catchAsync.utils"));
const sendResponse_utils_1 = __importDefault(require("../../utils/sendResponse.utils"));
const user_service_1 = require("./user.service");
const getAllUsers = (0, catchAsync_utils_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_service_1.userService.getAllUsers();
    (0, sendResponse_utils_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "All users fetched successfully",
        data: users,
    });
}));
exports.userController = {
    getAllUsers,
};
