import {IPolicy} from './policy.interface';

export interface IUser {
  id: number;
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  address: string;
  birthday: any;
  gender: any;
  created_at: string;
  updated_at: string;
  status: number;
  accessToken: string;
  isDeleting: boolean;
  policy: IPolicy;
}

export enum UserStatus {
  active = 1,
  inactive = -1
}
