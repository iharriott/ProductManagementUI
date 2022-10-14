import { Characteristics } from '../components/interfaces/table-export-format';

export class CommonConstants {
    public static cappingLevel: string = 'cappingLevel';
    public static cappingLevelV2: string = 'cappingLevelV2';
    public static calenarVersion: string = 'calendar';
    public static semanticVersion: string = 'semantic';
    public static characteristics: Characteristics[] = [
        { id: 1, name: 'AccidentCount' },
        { id: 2, name: 'Calculated' },
        { id: 3, name: 'CurrentAccidentCount' },
        { id: 4, name: 'CurrentMinorCount' },
        { id: 5, name: 'CurrentSpeedCount' },
        { id: 6, name: 'CurrentTier' },
        { id: 7, name: 'GeicoAccidentCount' },
        { id: 8, name: 'GeicoMinorCount' },
        { id: 9, name: 'GeicoSpeedCount' },
        { id: 10, name: 'HomeownershipIndicator' },
        { id: 11, name: 'MaxNamedInsuredAge' },
        { id: 12, name: 'MinorCount' },
        { id: 13, name: 'MinorNumberChargeableOcc' },
        { id: 14, name: 'NamedInsuredAge' },
        { id: 15, name: 'NamedInsuredGender' },
        { id: 16, name: 'NamedInsuredMaritalStatus' },
        { id: 17, name: 'NinIndicator' },
        { id: 18, name: 'NonGeicoAccidentCount' },
        { id: 19, name: 'NonGeicoMinorCount' },
        { id: 20, name: 'NonGeicoSpeedCount' },
        { id: 21, name: 'OperatorAge' },
        { id: 22, name: 'PriorAccidentCount' },
        { id: 23, name: 'PriorMinorCount' },
        { id: 24, name: 'PriorSpeedCount' },
        { id: 25, name: 'RatedGender' },
        { id: 26, name: 'RatedMaritalStatus' },
        { id: 27, name: 'RatedVehicleLocation' },
        { id: 28, name: 'ResidenceType' },
        { id: 29, name: 'RiskGroup' },
        { id: 30, name: 'SpeedCount' },
        { id: 31, name: 'SpeedNumberChargeableOcc' },
        { id: 32, name: 'Tenure' },
        { id: 33, name: 'Term' }
    ];
}
