import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import passport from "passport";
import UserModel from "../user/user.model";
import config from "../../config";

// JWT Strategy options
const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_ACCESS_SECRET as string,
};

// JWT strategy for Passport
passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      // Find user by ID from JWT payload
      const user = await UserModel.findById(jwtPayload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

export default passport;
