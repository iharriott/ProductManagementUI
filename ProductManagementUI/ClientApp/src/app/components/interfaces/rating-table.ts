export interface RatingTable {
    version: string;
    statusCode: number;
    message: string;
    isError: boolean;
    result: RatingTableResult[];
}

export interface RatingTableResult {
    fileName: string;
    filePath: string;
    fileContent: string;
    lastUpdatedDate: string;
    effectiveDate: string;
    renewalDate: string;
    comment: string;
    fileVersionId: string;
}
