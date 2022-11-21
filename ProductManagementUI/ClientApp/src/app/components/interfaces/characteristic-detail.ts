export interface CharacteristicDetail {
    schemaVersion: string;
    name: string;
    dataType: string;
    isRequired: boolean;
    validations: Validation[];
    refinements: Refinement[];
    fileVersionId: string;
    fileContent: string;
}

export interface Refinement {
    schemaVersion: string;
    name: string;
    refinementType: string;
    requiredCharacteristics: RequiredCharacteristic[];
    expression: string;
    priority: number;
    fileVersionId: string;
    fileContent: string;
}

export interface RequiredCharacteristic {
    entityType: string;
    characteristicName: string;
}

export interface Validation {
    name: string;
    validationType: string;
    validValues: string[];
    expression: string;
    parsedExpression: string;
    errorMessage: string;
}

export interface CharacteristicsRoot {
    statusCode: number;
    message: string;
    result: CharacteristicDetail;
}

export interface BaseTableResponse {
    statusCode: number;
    message: string;
    result: string[];
}
