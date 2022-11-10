export interface FactorFile {
    version: string;
    statusCode: string;
    message: string;
    isError: boolean;
    result: FileStructure[];
}

export interface FileStructure {
    fileName: string;
    filePath: string;
    lastUpdated: Date;
    effectiveDate: Date;
    renewalDate: Date;
    comment: string;
    fileVersionId: string;
}

export interface FactorFileContent {
    version: string;
    statusCode: string;
    message: string;
    isError: boolean;
    result: FileContentStructure;
}

export interface FileContentStructure {
    fileName: string;
    filePath: string;
    fileContent: string;
    fileVersionId: string;
}
