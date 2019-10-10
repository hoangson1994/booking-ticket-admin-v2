export interface ICustomerType {
  id: number;
  name: string;
  description: string;
  discount: number;
  createdAt: string;
  updatedAt: string;
  createdAtStr: string;
  updatedAtStr: string;
  status: number;

  isDeleting: boolean;
}

export enum CustomerTypeStatus {
  Active = 1,
  Inactive = -1
}
