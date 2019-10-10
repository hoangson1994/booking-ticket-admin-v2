import {IVoyagePart} from './voyage-part.interface';

export interface IVoyage {
    id: number;
    name: string;
    createdAt: number;
    updatedAt: number;
    status: number;
    voyageParts: IVoyagePart[];

    isDeleting: boolean;
}

export enum VoyageStatus {
    Active = 1,
    Inactive = 2
}
