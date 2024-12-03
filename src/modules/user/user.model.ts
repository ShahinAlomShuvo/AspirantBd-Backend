import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";
import { Role, Provider, TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
    },
    password: {
      type: String,
      required: function () {
        return this.provider === Provider.LOCAL;
      },
    },
    phone: {
      type: String,
      required: function () {
        return this.provider === Provider.LOCAL;
      },
    },
    address: {
      type: String,
      required: function () {
        return this.provider === Provider.LOCAL;
      },
    },
    avatar: { type: String },
    provider: {
      type: String,
      enum: Object.values(Provider),
      default: Provider.LOCAL,
      required: function () {
        return this.provider === Provider.LOCAL ? false : true;
      },
    },
    providerId: { type: String },
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving if it's a local user
userSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(
      this.password,
      Number(config.SALT_ROUNDS)
    );
    this.password = hashedPassword;
  }
  next();
});

const UserModel = model<TUser>("User", userSchema);

export default UserModel;
