export interface IUser {
  id: number;
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  address: string;
  birthday: number;
  created_at: string;
  updated_at: string;
  status: number;
  accessToken: string;
  isDeleting: boolean;
}

export enum UserStatus {
  active = 1,
  inactive = -1
}
