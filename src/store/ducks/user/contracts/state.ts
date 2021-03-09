export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  isOnline: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  email: string;
  name: string;
  password: string;
}
