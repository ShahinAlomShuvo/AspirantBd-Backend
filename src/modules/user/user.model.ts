import { model, Schema } from "mongoose";
import { Role, TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: Object.values(Role), default: Role.USER },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const hashedPassword = await bcrypt.hash(
    this.password,
    Number(config.SALT_ROUNDS)
  );
  this.password = hashedPassword;

  next();
});

const UserModel = model<TUser>("User", userSchema);

export default UserModel;
