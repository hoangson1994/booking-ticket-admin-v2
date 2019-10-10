import {IUser} from './user.interface';
import {IVoyage} from './voyage.interface';
import {IVehicle} from './vehicle.interface';
import {IScheduleTemplate} from './schedule-template.interface';
import {IVehicleCategory} from './vehicle-category.interface';

export interface ISchedule {
  id: number;
  vehicleId: number;
  vehicleCategoryId: number;
  driverId: number;
  voyageId: number;
  scheduleTemplateId: number;
  scheduleDate: number;
  startTime: number;
  endTime: number;
  status: number;
  isDeleting: boolean;
  driver: IUser;
  voyage: IVoyage;
  vehicle: IVehicle;
  scheduleTemplate: IScheduleTemplate;
  vehicleCategory: IVehicleCategory;
}

export enum ScheduleStatus {
  active = 1,
  inactive = -1
}
