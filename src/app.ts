import express, { Application, Request, Response } from "express";
import passport from "../src/modules/auth/passportConfig";
import router from "./router/router";
import globalErrorHandler from "./middleware/globalErrorHandler.middleware";
import notFound from "./middleware/notFound.middleware";
const app: Application = express();

app.use(express.json());
app.use(passport.initialize());
app.use("/aspirantbd", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to AspirantBd");
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
