export interface FileHistory {
    version: string;
    statusCode: number;
    message: string;
    isError: boolean;
    result: Result;
}

export interface Result {
    version: string;
    fileId: string;
    history: History2[];
}

export interface History2 {
    fileHistoryId: string;
    date: Date;
    comment: string;
    authorName: string;
    fileContent: string;
}
