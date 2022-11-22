import {
    Characteristics,
    States
} from '../components/interfaces/table-export-format';

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

    public static states: States[] = [
        {
            name: 'Alabama',
            code: 'AL'
        },
        {
            name: 'Alaska',
            code: 'AK'
        },
        {
            name: 'Arizona',
            code: 'AZ'
        },
        {
            name: 'Arkansas',
            code: 'AR'
        },
        {
            name: 'California',
            code: 'CA'
        },
        {
            name: 'Colorado',
            code: 'CO'
        },
        {
            name: 'Connecticut',
            code: 'CT'
        },
        {
            name: 'Delaware',
            code: 'DE'
        },
        {
            name: 'Florida',
            code: 'FL'
        },
        {
            name: 'Georgia',
            code: 'GA'
        },
        {
            name: 'Hawaii',
            code: 'HI'
        },
        {
            name: 'Idaho',
            code: 'ID'
        },
        {
            name: 'Illinois',
            code: 'IL'
        },
        {
            name: 'Indiana',
            code: 'IN'
        },
        {
            name: 'Iowa',
            code: 'IA'
        },
        {
            name: 'Kansas',
            code: 'KS'
        },
        {
            name: 'Kentucky',
            code: 'KY'
        },
        {
            name: 'Louisiana',
            code: 'LA'
        },
        {
            name: 'Maine',
            code: 'ME'
        },
        {
            name: 'Maryland',
            code: 'MD'
        },
        {
            name: 'Massachusetts',
            code: 'MA'
        },
        {
            name: 'Michigan',
            code: 'MI'
        },
        {
            name: 'Minnesota',
            code: 'MN'
        },
        {
            name: 'Mississippi',
            code: 'MS'
        },
        {
            name: 'Missouri',
            code: 'MO'
        },
        {
            name: 'Montana',
            code: 'MT'
        },
        {
            name: 'Nebraska',
            code: 'NE'
        },
        {
            name: 'Nevada',
            code: 'NV'
        },
        {
            name: 'New Hampshire',
            code: 'NH'
        },
        {
            name: 'New Jersey',
            code: 'NJ'
        },
        {
            name: 'New Mexico',
            code: 'NM'
        },
        {
            name: 'New York',
            code: 'NY'
        },
        {
            name: 'North Carolina',
            code: 'NC'
        },
        {
            name: 'North Dakota',
            code: 'ND'
        },
        {
            name: 'Ohio',
            code: 'OH'
        },
        {
            name: 'Oklahoma',
            code: 'OK'
        },
        {
            name: 'Oregon',
            code: 'OR'
        },
        {
            name: 'Pennsylvania',
            code: 'PA'
        },
        {
            name: 'Rhode Island',
            code: 'RI'
        },
        {
            name: 'South Carolina',
            code: 'SC'
        },
        {
            name: 'South Dakota',
            code: 'SD'
        },
        {
            name: 'Tennessee',
            code: 'TN'
        },
        {
            name: 'Texas',
            code: 'TX'
        },
        {
            name: 'Utah',
            code: 'UT'
        },
        {
            name: 'Vermont',
            code: 'VT'
        },
        {
            name: 'Virginia',
            code: 'VA'
        },
        {
            name: 'Washington',
            code: 'WA'
        },
        {
            name: 'West Virginia',
            code: 'WV'
        },
        {
            name: 'Wisconsin',
            code: 'WI'
        },
        {
            name: 'Wyoming',
            code: 'WY'
        }
    ];

    public static listOfCharacteristicsView: any = {
        rawChar: 'rawCharacteristics',
        rawJson: 'rawCharacteristicsJson',
        refinement: 'refinement',
        refinementJson: 'refinementJson'
    };
}
