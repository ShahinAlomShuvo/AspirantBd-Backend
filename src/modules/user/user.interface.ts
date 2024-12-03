/* eslint-disable no-unused-vars */

export enum Role {
  ADMIN = "admin",
  USER = "user",
}

export enum Provider {
  LOCAL = "local",
  GOOGLE = "google",
  FACEBOOK = "facebook",
}

export type TUser = {
  name: string;
  email: string;
  role?: Role;
  password?: string;
  phone?: string;
  address?: string;
  provider?: Provider;
  providerId?: string;
  avatar?: string;
};

export type TSignIn = Pick<TUser, "email" | "password">;
