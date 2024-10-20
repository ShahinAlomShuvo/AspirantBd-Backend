import UserModel from "./user.model";

const getAllUsers = async () => {
  const users = await UserModel.find().select("-password");
  return users;
};

export const userService = {
  getAllUsers,
};
