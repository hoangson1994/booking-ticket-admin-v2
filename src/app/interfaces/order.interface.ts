import {IUser} from './user.interface';
import {ICustomer} from './customer.interface';
import {IOrderDetail} from './order-detail.interface';
import {ISchedule} from './schedule.interface';

export interface IOrder {
    id: number;
    customer: ICustomer;
    createdBy: IUser;
    finalPrice: string;
    paidStatus: number;
    orderDetails: IOrderDetail[];
    createdAt: string;
    updatedAt: string;
    createdAtStr: string;
    updatedAtStr: string;
    status: number;
    scheduleId: number;
    schedule: ISchedule;

    isDeleting: boolean;
}

export enum OrderStatus {
    Active = 1,
    Inactive = -1
}

export enum OrderPaidStatus {
    Not_Paid = 2,
    Paided = 1
}
