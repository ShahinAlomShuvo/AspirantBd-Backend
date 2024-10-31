import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import config from "../../config";
import { Role, TUser } from "../user/user.interface";
import UserModel from "../user/user.model";
import { NextFunction, Request, Response } from "express";

// Configure Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID as string,
      clientSecret: config.GOOGLE_CLIENT_SECRET as string,
      callbackURL: config.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Create user object from profile
        const user: TUser = {
          name: profile.displayName,
          email:
            (profile.emails && profile.emails[0] && profile.emails[0].value) ||
            "",
          avatar:
            profile.photos && profile.photos[0] && profile.photos[0].value,
          role: Role.USER,
          password: "",
          phone: "",
          address: "",
        };

        // Check if the user exists in the database
        const existingUser = await UserModel.findOne({ email: user.email });
        // Create a new user if not found
        if (!existingUser) {
          const newUser = await UserModel.create(user);
          return done(null, newUser);
        }
        return done(null, existingUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Serialize user into session (storing user ID)
passport.serializeUser((user: any, done) => {
  done(null, user.id); // Store the user ID in the session
});

// Deserialize user from session (retrieve the full user object)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};

export default passport;
