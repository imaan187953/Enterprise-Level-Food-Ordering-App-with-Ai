export type UserRole = "customer" | "admin";

export interface IUser {
  name: string;
  email: string;
  password: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  isActive: boolean;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateProfileInput {
  name?: string | undefined;
  phone?: string | undefined;
}

export interface ChangeAvatarInput {
  avatar: string;
}

export interface ChangePhoneInput {
  phone: string;
}

export interface UpdateUserStatusInput {
  isActive: boolean;
}