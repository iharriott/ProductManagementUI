import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import { FactorFile } from '../components/interfaces/factor-file';

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
}
