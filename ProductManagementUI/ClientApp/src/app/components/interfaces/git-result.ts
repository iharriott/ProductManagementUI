export interface GitResult {
    version: string;
    statusCode: string;
    message: string;
    isError: boolean;
    result: FileStructure[];
}

export interface FileStructure {
    fileHistoryId: string;
    fileName: string;
    fileId: string;
    fileContent: string;
}
