export interface TableExportFormat {
    value: string;
    viewValue: string;
}

export interface FileData {
    id: number;
    MinChangePercent: number;
    MaxChangePercent: number;
    GraduatedCappingLevel: number;
}

export interface DataSchema {
    version: string;
    name: string;
    createdBy: string;
    createdDate: string;
    state: string;
    data: any[];
}

export interface Characteristics {
    id: number;
    name: string;
}

export interface States {
    code: string;
    name: string;
}
