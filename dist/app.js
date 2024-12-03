"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwtStrategy_1 = __importDefault(require("./modules/auth/jwtStrategy"));
const googleStrategy_1 = __importDefault(require("./modules/auth/googleStrategy"));
const router_1 = __importDefault(require("./router/router"));
const globalErrorHandler_middleware_1 = __importDefault(require("./middleware/globalErrorHandler.middleware"));
const notFound_middleware_1 = __importDefault(require("./middleware/notFound.middleware"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: ["http://localhost:5173", "*"],
    credentials: true,
};
app.use((0, express_session_1.default)({
    secret: config_1.default.JWT_ACCESS_SECRET,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: true,
}));
app.use(express_1.default.json());
app.use(jwtStrategy_1.default.initialize());
app.use(googleStrategy_1.default.initialize());
app.use(googleStrategy_1.default.session());
app.use((0, cors_1.default)(corsOptions));
app.use("/aspirantbd", router_1.default);
app.get("/", (req, res) => {
    res.send("Welcome to AspirantBd");
});
app.use(notFound_middleware_1.default);
app.use(globalErrorHandler_middleware_1.default);
exports.default = app;
