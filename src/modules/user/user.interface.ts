export enum Role {
  ADMIN = "admin",
  USER = "user",
}

export type TUser = {
  name: string;
  email: string;
  role?: Role;
  password: string;
  phone: string;
  address: string;
};

export type TSignIn = Pick<TUser, "email" | "password">;
