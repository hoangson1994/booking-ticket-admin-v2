export interface IVehicleCategory {
  id: number;
  name: string;
  seatQuantity: number;
  price: number;
  created_at: string;
  updated_at: string;
  status: VehicleCategoryStatus;
  isDeleting: boolean;
}

export enum VehicleCategoryStatus {
  active = 1,
  inactive = -1
}
