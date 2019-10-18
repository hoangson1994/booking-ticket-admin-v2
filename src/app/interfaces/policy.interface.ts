import {IRole} from './role.interface';

export interface IPolicy {
    id: number;
    name: string;
    specialRole: number;
    roles: IRole[];
    status: number;

    isDeleting: boolean;
}

export enum PolicyStatus {
    Active = 1,
    Inactive = -1
}
