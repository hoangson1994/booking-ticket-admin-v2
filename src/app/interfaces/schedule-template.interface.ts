import {IVoyage} from './voyage.interface';

export interface IScheduleTemplate {
    id: number;
    timeStart: number;
    timeEnd: number;
    voyages: IVoyage[];
    status: number;
    listVoyageIds: any[];

    isDeleting: boolean;
}

export enum ScheduleTemplateStatus {
    Active = 1,
    Inactive = -1
}
