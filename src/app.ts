import express, { Application, Request, Response } from "express";
import passport from "../src/modules/auth/passportConfig";
import router from "./router/router";
import globalErrorHandler from "./middleware/globalErrorHandler.middleware";
import notFound from "./middleware/notFound.middleware";
import cors from "cors";

const app: Application = express();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(express.json());
app.use(passport.initialize());
app.use(cors(corsOptions));
app.use("/aspirantbd", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to AspirantBd");
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
