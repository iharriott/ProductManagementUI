export interface DataVersion {
    state: string;
    version: string;
    name: string;
    createdBy: string;
    createdDate: string;
    modifiedBy?: string;
    modifiedDate?: string;
    data: any[];
}
