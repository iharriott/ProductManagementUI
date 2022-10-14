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
