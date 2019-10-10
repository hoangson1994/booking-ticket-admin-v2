export interface IVehicle {
  id: number;
  plate: string;
  name: string;
  color: string;
  category_id: number;
  last_maintenance: string;
  created_at: string;
  updated_at: string;
  status: number;
  isDeleting: boolean;
}
export enum VehicleStatus {
  active = 1,
  inactive = -1
}
