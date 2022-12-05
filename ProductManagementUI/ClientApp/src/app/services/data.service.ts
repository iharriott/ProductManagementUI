import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { FactorFile } from '../components/interfaces/factor-file';
import { ProductSearch } from '../components/interfaces/product-search';
import * as R from 'ramda';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor() {}
    currentMinorVersion!: number;
    isVersionExists!: boolean;
    dataVersion!: string;
    fileMode = false;
    currentFileData!: FactorFile;
    filesData!: any[];
    selectedBranch: string = 'CW';
    currentFileHistoryData!: any;
    currentFile!: string;
    isListFileData: boolean = false;
    dateList!: any[];
    revisionList!: string[];
    loggedInUser!: string;
    mode!: string;
    revisionSelectedTabIndex: number = 0;
    characteristicsList: any[] = [];
    productSearchData!: ProductSearch;
    searchedProduct!: string;
    selectProductCharacteristics!: any;
    currentCharacteristic!: any;
    fileLoadedFromDBForEditing: boolean = false;
    headerDiffColumn!: string;
    arrayFirstLength!: number;
    arraySecondLength!: number;

    getLoggedInUser() {
        return window.localStorage.getItem('userName');
    }

    convertCsvToJason(sourceData: string): any[] {
        let workbook = XLSX.read(sourceData, { type: 'binary' });
        let convertedJson;
        let convertedJsonArray: any[] = [];

        workbook.SheetNames.map((sheet) => {
            const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
            convertedJson = JSON.stringify(data, undefined, 4);
            convertedJsonArray = JSON.parse(convertedJson);
        });
        return convertedJsonArray;
    }

    convertJasonToCsv(sourceData: any[]): any {
        const data = XLSX.utils.json_to_sheet(sourceData);
        return data;
    }

    getColumnHeadings(dataArray: any[]): string[] {
        const columnheadings = Object.keys(dataArray[0]);
        return columnheadings;
    }

    getDateFromUTC(date: Date): string {
        return moment(date, 'YYYY-MM-DDTHH:mm')
            .format('YYYY-MM-DDTHH:mm')
            .toString();
    }

    getDateFromUTCShort(date: Date): string {
        return moment(date, 'YYYY-MM-DDTHH:mm').format('YYYY-MM-DD').toString();
    }

    getFilename(file: string): string {
        return file.substring(0, file.indexOf('.'));
    }

    checkInList(data: any[], val: string): boolean {
        return data.some((x) => x === val);
    }

    removeFromList(data: any[], val: string): any[] {
        return data.filter((x) => x !== val);
    }

    addToList(data: any[], val: string): any[] {
        return [...data, val];
    }

    checkCharacteristicsInList(data: any[], val: string): boolean {
        return data.some((x) => x.name === val);
    }

    getProductMgmtAPIBaseURL():any {
        return window.localStorage.getItem('ProductMgmtAPIBaseURL');
    }

    getTenantId():any {
        return window.localStorage.getItem('TenantId');
    }

    getClientId():any {
        return window.localStorage.getItem('ClientId');
    }
    getAuthority():any {
        return window.localStorage.getItem('Authority');
    }
    getRedirectUrl():any {
        return window.localStorage.getItem('RedirectUrl');
    }
    getPostLogoutUrl():any {
        return window.localStorage.getItem('PostLogoutUrl');
    }
    getApiScope():any {
        return window.localStorage.getItem('ApiScope');
    }


    validateFileStructure(arrayFirst: any[], arraySecond: any[]): boolean {
        arrayFirst = R.map(R.toLower, arrayFirst);
        arraySecond = R.map(R.toLower, arraySecond);
        this.headerDiffColumn = R.difference(arraySecond, arrayFirst);
        this.arrayFirstLength = arrayFirst.length;
        this.arraySecondLength = arraySecond.length;

        const lengthValidation =
            this.arrayFirstLength === this.arraySecondLength;
        return this.headerDiffColumn.length === 0 && lengthValidation
            ? true
            : false;
    }

}
