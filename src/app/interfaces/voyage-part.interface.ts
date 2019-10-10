export interface IVoyagePart {
    id: number;
    fromId: number;
    fromName: string;
    toId: number;
    toName: string;
    distance: number;
    orderNumber: 1;
    createdAt: number;
    createdAtStr: string;
    updatedAtStr: string;
    updatedAt: number;
    status: number;
}
