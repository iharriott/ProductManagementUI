export interface ProductFactorFileContent {
    statusCode: number;
    message: string;
    result: Result;
}

export interface Result {
    filePath: string;
    fileName: string;
    fileContent: string;
    lastUpdatedDate: Date;
    fileVersionId: Date;
}
