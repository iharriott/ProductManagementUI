export interface RatingChanges {
    version: string;
    statusCode: number;
    message: string;
    isError: boolean;
    result: Result;
}

export interface Result {
    filePath: string;
    fileName: string;
    history: FileChangeHistory[];
}

export interface FileChangeHistory {
    fileVersionId: Date;
    isLatestVersion: boolean;
    fileContent: string;
    productDefinitionVersions: ProductDefinitionVersion[];
}

export interface ProductDefinitionVersion {
    lastUpdated: Date;
    effectiveDate: Date;
    renewalDate: Date;
    comment: string;
    author: string;
    version: string;
}
