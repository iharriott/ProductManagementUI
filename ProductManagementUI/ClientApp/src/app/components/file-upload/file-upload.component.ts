import {
    Component,
    OnInit,
    ViewChild,
    AfterViewInit,
    Inject,
    Input
} from '@angular/core';
import * as XLSX from 'xlsx';
import {
    DataSchema,
    TableExportFormat
} from '../interfaces/table-export-format';
import { ExportType } from 'mat-table-exporter';
import { ApiService } from 'src/app/services/api.service';
import * as R from 'ramda';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonConstants } from '../../constants/common-constants';
import * as moment from 'moment';
import { DataVersion } from '../interfaces/data-version';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/message.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { GitResult } from '../interfaces/git-result';
import { convertCsvToJson } from 'convert-csv-to-json';
import { ActivatedRoute, Router } from '@angular/router';
import { Branch } from '../interfaces/branch';
import { FileSummary } from '../interfaces/file-summary';
import { ApiResponse } from '../interfaces/api-response';
import { History2 } from '../interfaces/file-history';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit, AfterViewInit {
    constructor(
        private apiService: ApiService,
        public dialogRef: MatDialogRef<FileUploadComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData: any,
        public dataService: DataService,
        private messageService: MessageService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.dataSource = new MatTableDataSource();
    }

    tableExportFormats: TableExportFormat[] = [
        { value: 'csv', viewValue: 'csv' },
        { value: 'txt', viewValue: 'txt' },
        { value: 'xls', viewValue: 'xls' },
        { value: 'xlsx', viewValue: 'xlsx' },
        { value: 'json', viewValue: 'json' }
    ];

    fileHeadings!: string[];

    dataSource!: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @Input() filesList!: FileSummary;
    @Input() filesHistoryList!: History2;

    selectedTableExportFormat: ExportType = this.tableExportFormats[0]
        .value as ExportType;
    showToolbar = true;
    data!: DataSchema[];
    fileHeader: any;
    tableData!: any[];
    action: string = 'idAction001';
    disabled = true;
    fileId = 0;
    fileLoad = false;
    fileDataBeforeEdit;
    clonedDataSource: any[] = [];
    cloneStatus = false;
    currentVersion!: string;
    fileMode = false;
    fileName!: string;
    gitResponseObject!: GitResult;
    columnHeadings!: string[];
    fileHistoryId!: string;
    fileSavePath!: string;
    showHideLoader = false;
    showHideTitle = 'Show File Loader';
    branchList!: string[];
    selectedBranch!: string;
    view!: string;
    viewState = false;
    formTitle!: string;
    defaultFilePath = '/CW/RatingFactors/Tables/';
    comment!: string;
    fileLabel!: string;
    state!: string;
    isListFileData!: boolean;

    options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        showTitle: false,
        //title: 'Your title',
        useBom: true,
        noDownload: true,
        headers: this.columnHeadings
    };

    ngOnInit(): void {
        //debugger;
        this.view = this.route.snapshot.data['view'];
        this.isListFileData = this.dataService.isListFileData;
        this.selectedBranch = this.dataService.selectedBranch;
        if (this.view !== 'add') {
            this.setViewMode();
            if (this.isListFileData) {
                this.onGetFiles();
            } else {
                this.onGetFileHistory();
            }
        }

        this.getBranches();
    }

    onShowHideFileLoader() {
        this.showHideLoader = !this.showHideLoader;
        this.showHideTitle = this.showHideLoader
            ? 'Hide File Loader'
            : 'Show File Loader';
    }

    setViewMode() {
        this.view = this.route.snapshot.data['view'];
        this.viewState = this.view === 'edit' ? false : true;
        this.formTitle = this.view === 'edit' ? 'Data Editor' : 'Data Viewer';
        this.fileLabel = this.view === 'edit' ? 'Editing File' : 'Viewing File';
    }

    getBranches() {
        this.apiService.getAllBranches().subscribe((data: Branch) => {
            this.branchList = data.result;
        });
    }

    onGetFiles(): void {
        if (this.filesList !== undefined) {
            this.fileHistoryId = this.filesList.fileHistoryId;
            this.fileName = this.filesList.fileName;
            this.fileSavePath = this.filesList.fileId;
        } else {
            this.fileHistoryId = this.route.snapshot.params['fileHistoryId'];
            this.fileName = this.route.snapshot.params['fileName'];
            this.fileSavePath = this.route.snapshot.params['fileId'];
        }

        console.log(
            `fileHistoryId ${this.fileHistoryId} filename ${this.fileName} fileSavepath ${this.fileSavePath}`
        );
        this.apiService
            .getRatingFileContent(
                this.selectedBranch,
                this.fileSavePath,
                this.fileHistoryId
            )
            .subscribe(
                (data) => {
                    const { result } = data;
                    const { fileContent } = result;
                    console.log(`${JSON.stringify(fileContent)}`);
                    const convertedJsonData =
                        this.dataService.convertCsvToJason(fileContent);
                    this.dataSource.data = convertedJsonData;
                    this.columnHeadings =
                        this.dataService.getColumnHeadings(convertedJsonData);
                    this.displayColumns = [...this.columnHeadings];
                },
                (error: any) => console.log(error),
                () => console.log('Done retrieving files')
            );
    }

    onGetFileHistory() {
        //debugger;
        if (this.filesHistoryList !== undefined) {
            const { fileContent, comment } = this.filesHistoryList;
            const convertedJsonData =
                this.dataService.convertCsvToJason(fileContent);
            this.dataSource.data = convertedJsonData;
            this.columnHeadings =
                this.dataService.getColumnHeadings(convertedJsonData);
            this.displayColumns = [...this.columnHeadings];
            this.comment = comment;
        }
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    save() {
        // debugger;
        if (this.fileLoad) {
            this.fileSavePath = this.defaultFilePath + this.fileName;
            this.columnHeadings = Object.keys(this.dataSource.data[0]);
        }
        this.options.headers = this.columnHeadings;
        const data = this.dataSource.data;
        const convertedData = new ngxCsv(
            data,
            this.fileName,
            this.options
        ).getCsv();
        if (!this.fileLoad) {
            this.apiService
                .updateRatingFile(
                    this.fileSavePath,
                    convertedData,
                    this.selectedBranch,
                    this.comment
                )
                .subscribe(
                    (response: ApiResponse) => {
                        this.messageService.openSnackBar(
                            `${response.result.fileName} was Successfully saved to branch ${response.result.branchName}`
                        );
                    },
                    (error: ApiResponse) => {
                        this.messageService.openSnackBar(
                            `Error occurred while saving ${this.fileName} to branch ${error.result.branchName}`
                        );
                    },
                    () => console.log('Done updating file')
                );
        } else {
            this.apiService
                .addNewRatingFile(
                    this.fileSavePath,
                    convertedData,
                    this.selectedBranch,
                    this.comment
                )
                .subscribe(
                    (response: ApiResponse) => {
                        this.messageService.openSnackBar(
                            `${response.result.fileName} was Successfully added to branch ${response.result.branchName}`
                        );
                    },
                    (error: ApiResponse) => {
                        // this.messageService.openSnackBar(
                        //     `Error occurred while adding ${error.result.fileName} to branch ${error.result.branchName}`
                        // );
                    },
                    () => console.log('Done adding file')
                );
        }
    }

    loadFileData(file: any) {
        if (file) {
            this.showToolbar = true;
            this.fileLoad = true;
            this.dataService.fileMode = true;
            const fileReader = new FileReader();
            fileReader.readAsBinaryString(file);
            fileReader.onload = (event) => {
                let binaryData = event.target?.result;
                let workbook = XLSX.read(binaryData, { type: 'binary' });
                workbook.SheetNames.map((sheet) => {
                    const data = XLSX.utils.sheet_to_json(
                        workbook.Sheets[sheet]
                    );
                    this.convertedJson = JSON.stringify(data, undefined, 4);
                    this.convertedJsonArray = JSON.parse(this.convertedJson);
                    console.log(
                        `LOADING ${JSON.stringify(
                            Object.keys(this.convertedJsonArray[0])
                        )}`
                    );
                    this.fileHeadings = Object.keys(this.convertedJsonArray[0]);
                    this.dataSource.data = this.convertedJsonArray;
                    this.fileDataBeforeEdit = this.dataSource.data;
                    this.displayColumns = Object.keys(this.dataSource.data[0]);
                    this.fileName = file.name;
                    // this.displayColumns = [...this.displayColumns, 'Action'];
                    this.displayColumns = [...this.displayColumns];
                });
            };
            this.dataService.fileMode = false;
        }
    }

    download() {
        //debugger;
        const data = this.dataSource.data;
        if (this.fileHeadings == undefined) {
            this.fileHeadings = Object.keys(this.dataSource.data[0]);
        }
        this.options.headers = this.fileHeadings;
        this.options.noDownload = false;
        new ngxCsv(data, this.fileName, this.options);
    }

    resetTable() {
        this.displayColumns = [];
        this.dataSource.data = [];
    }

    // getDataFromDB() {
    //     let dbData: any[];
    //     let data;
    //     this.fileLoad = false;
    //     this.resetTable();
    //     const url = this.determineUrl();
    //     this.apiService.getAllData(url).subscribe((val) => {
    //         dbData = [...val];
    //         data = dbData[0].data;

    //         if (typeof data === 'object') {
    //             this.displayColumns = Object.keys(data[0]);
    //             this.dataSource.data = [...data];
    //         }

    //         if (Array.isArray(data)) {
    //             this.displayColumns = Object.keys(data[0]);
    //             dbData.map((data) => {
    //                 this.dataSource.data = [...this.dataSource.data, ...data];
    //                 this.dataSource.data = this.dataSource.data.filter(
    //                     (data) => data.id >= 1
    //                 );
    //             });
    //         }
    //         this.fileDataBeforeEdit = this.dataSource.data;
    //         this.displayColumns = [...this.displayColumns, 'Action'];
    //     });
    // }

    async drop(event: any) {
        event.preventDefault();
        const selectedFile = event.dataTransfer.files[0];
        this.loadFileData(selectedFile);
    }

    allowDrop(ev: any) {
        ev.preventDefault();
    }

    convertedJson!: string;
    convertedJsonArray!: any[];
    displayColumns!: string[];

    fileUpload(event: any) {
        const selectedFile = event.target.files[0];
        this.loadFileData(selectedFile);
    }

    idExists(id: any): boolean {
        return this.fileDataBeforeEdit.some((x) => x.id === id);
    }

    // editData(data: any) {
    //     this.disabled = !this.disabled;
    //     if (this.fileLoad) {
    //         if (!this.idExists(data.id)) {
    //             this.dataSource.data = [...this.dataSource.data, data];
    //         } else {
    //             this.dataSource.data = R.map(
    //                 this.updatedTableRow(data),
    //                 this.dataSource.data
    //             );
    //         }
    //     } else {
    //         const url = this.determineUrl();
    //         if (!this.idExists(data.id)) {
    //             this.apiService.createData(url, data).subscribe({
    //                 next: (res) => {
    //                     this.messageService.openSnackBar(
    //                         `Data updated Successfully`
    //                     );
    //                     this.getDataFromDB();
    //                 },
    //                 error: (err) => {
    //                     this.messageService.openSnackBar(`Error updating data`);
    //                 }
    //             });
    //         } else {
    //             this.apiService.updateRow(url, data, data.id).subscribe({
    //                 next: (res) => {
    //                     this.messageService.openSnackBar(
    //                         `Data updated Successfully`
    //                     );
    //                     this.getDataFromDB();
    //                 },
    //                 error: (err) => {
    //                     this.messageService.openSnackBar(`Error updating data`);
    //                 }
    //             });
    //         }
    //     }
    // }

    getId(): number {
        return (
            Math.max(
                ...this.dataSource.data.map((val: { id: any }) => val.id)
            ) + 1
        );
    }

    addRow() {
        let row = this.dataSource[0];
        row = { ...row, id: this.getId() };
        this.dataSource.data = [row, ...this.dataSource.data];
    }

    // deleteRow(id: number) {
    //     if (this.fileLoad) {
    //         this.dataSource.data = this.dataSource.data.filter(
    //             (x: { id: number }) => x.id !== id
    //         );
    //     } else {
    //         this.apiService
    //             .deleteRow(CommonConstants.cappingLevel, id)
    //             .subscribe({
    //                 next: (res) => {
    //                     this.messageService.openSnackBar(
    //                         `Data deleted Successfully`
    //                     );
    //                     this.getDataFromDB();
    //                 },
    //                 error: (err) => {
    //                     this.messageService.openSnackBar(`Error deleting data`);
    //                 }
    //             });
    //     }
    // }

    updatedTableRow = R.curry((updatedRow, data) => {
        if (updatedRow.id == data.id) {
            return { ...data, ...updatedRow };
        }
        return data;
    });

    closeDialog(): void {
        //this.dialogRef.close();
        if (this.view === 'view') {
            this.router.navigate(['viewfilelist']);
        } else {
            this.router.navigate(['editfilelist']);
        }
    }

    onBranchChange() {
        this.dataService.selectedBranch = this.selectedBranch;
    }
}
