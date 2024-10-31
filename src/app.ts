import express, { Application, Request, Response } from "express";
import JwtStrategy from "./modules/auth/jwtStrategy";
import GoogleStrategy from "./modules/auth/googleStrategy";
import router from "./router/router";
import globalErrorHandler from "./middleware/globalErrorHandler.middleware";
import notFound from "./middleware/notFound.middleware";
import cors from "cors";
import session from "express-session";
import config from "./config";

const app: Application = express();

const corsOptions = {
  origin: ["http://localhost:5173", "*"],
  credentials: true,
};

app.use(
  session({
    secret: config.JWT_ACCESS_SECRET as string,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(JwtStrategy.initialize());
app.use(GoogleStrategy.initialize());
app.use(GoogleStrategy.session());
app.use(cors(corsOptions));
app.use("/aspirantbd", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to AspirantBd");
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
