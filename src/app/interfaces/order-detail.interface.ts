import {IVehicleCategory} from './vehicle-category.interface';
import {ICustomer} from './customer.interface';
import {IOrder} from './order.interface';

export interface IOrderDetail {
  id: number;
  orderId: IOrder;
  vehicleCategoryId: IVehicleCategory;
  customerTypeId: ICustomer;
  travelFromId: number;
  travelToId: number;
  unitPrice: string;
  originTotalPrice: string;
  totalPrice: string;
  quantity: number;
  discount: number;
  createdAt: string;
  updatedAt: string;
  createdAtStr: string;
  updatedAtStr: string;
  status: number;
}
