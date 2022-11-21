export interface ProductDefinitionDetail {
    statusCode: number;
    message: string;
    result: Result[];
}

export interface Result {
    productDefinition: string;
    newBusinessDate: Date;
    renewalDate: Date;
    availabilityDate: Date;
    bi: number;
    pd: number;
    comp: number;
    state: string;
    projectName: string;
    lob: string;
    productFamily: string;
    productVersion: number;
    rateRevision: number;
    patch?: any;
    company: string;
    status: string;
    isBaseOrCW: boolean;
}
