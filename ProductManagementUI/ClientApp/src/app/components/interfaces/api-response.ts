export interface ApiResponse {
    version: string;
    statusCode: number;
    message: string;
    isError: boolean;
    result: Result;
}

export interface Result {
    branchName: string;
    path: string;
    fileName: string;
    sucessfull: boolean;
    date: Date;
}

export interface FileSaveApiResonse {
    fileName: string;
    fileContent: string;
    lastUpdated: Date;
    effectiveDate: Date;
    renewalDate: Date;
    author: string;
    filePath: string;
    fileVersionId: string;
}
