import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { CommonConstants } from '../constants/common-constants';
import * as XLSX from 'xlsx';
import { GitResult } from '../components/interfaces/git-result';
import { FileHistory } from '../components/interfaces/file-history';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    constructor() {}
    currentMinorVersion!: number;
    isVersionExists!: boolean;
    dataVersion!: string;
    fileMode = false;
    currentFileData!: GitResult;
    filesData!: any[];
    selectedBranch: string = 'master';
    //currentFileHistoryData!: FileHistory;
    currentFileHistoryData!: any;
    currentFile!: string;
    isListFileData: boolean = false;
    dateList!: any[];
    revisionList!: string[];

    determineVersion(data: any[]) {
        if (CommonConstants.calenarVersion) {
            this.dataVersion = this.getCalendarVersion(data);
        }

        if (CommonConstants.semanticVersion) {
            return '';
        }
        return '';
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

    getCalendarVersion(data: any[]): string {
        const isExist = this.isVersionExistsForDate(data);
        let minorVersion: number;
        if (!isExist) {
            minorVersion = 0;
        } else {
            const filteredData = data.filter(
                (x) =>
                    this.getVersionDate(x.version) === this.getFormattedDate()
            );
            minorVersion = this.getMinorVersion(filteredData);
        }

        let version = this.getVersion(minorVersion);
        return version;
    }
    getSemanticVersion(priorVersion: string): string {
        return 'sem';
    }

    getFormattedDate(): string {
        return moment().format('YY-MM-DD').toString();
    }

    getDateFromUTC(date: Date): string {
        return moment(date, 'YYYY-MM-DDTHH:mm')
            .format('YYYY-MM-DDTHH:mm')
            .toString();
        //return date.toLocaleDateString;
    }

    isSameVersionDate(version: string): boolean {
        const versionDate = this.getVersionDate(version);
        const currentDate = this.getFormattedDate();
        return versionDate === currentDate;
    }

    getVersionDate(version: string): string {
        const versionDate = version.substring(0, version.indexOf('.'));
        return versionDate;
    }

    getId(dataSource: any[]): number {
        return Math.max(...dataSource.map((val: { id: any }) => val.id)) + 1;
    }

    getMinorVersion(dataSource: any[]): number {
        const minorVersion = dataSource.map((val) => {
            return val.version.substring(val.version.indexOf('.') + 1);
        });
        return Math.max(...minorVersion) + 1;
    }

    isVersionExistsForDate(data: any[]): boolean {
        const currentDate = this.getFormattedDate();
        return data.some((x) => this.getVersionDate(x.version) === currentDate);
    }

    getVersion(minorVersion: number): string {
        const version = this.getFormattedDate() + '.' + minorVersion;
        return version;
    }

    getStateFromPath(filePath: string): string {
        let state;
        if (filePath.length > 0) {
            const firstIndex = filePath.indexOf('/');
            const secondIndex = filePath.indexOf('/', firstIndex + 1);
            state = filePath.substring(firstIndex + 1, secondIndex);
            if (state.length > 2) {
                //debugger;
                state = this.getStateFromPath(filePath.substring(secondIndex));
            }
        }

        return state;
    }
}
