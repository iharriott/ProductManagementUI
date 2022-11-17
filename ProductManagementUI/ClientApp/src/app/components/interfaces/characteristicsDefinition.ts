export interface CharacteristicsDefinition {
    statusCode: number;
    message: string;
    result: CharacteristicsDetail[];
}

export interface CharacteristicsDetail {
    name: string;
    fileVersionId: Date;
    refinements?: any;
    dataType: string;
    state: string;
}
