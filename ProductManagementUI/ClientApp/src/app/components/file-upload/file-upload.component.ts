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
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/message.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { GitResult } from '../interfaces/git-result';
import { ActivatedRoute, Router } from '@angular/router';
import { FileSummary } from '../interfaces/file-summary';
import { ApiResponse, FileSaveApiResonse } from '../interfaces/api-response';
import { History } from '../interfaces/file-history';
import { RateRevisions } from '../interfaces/rate-revisions';
import { RatingTable } from '../interfaces/rating-table';
import { FileStructureErrorComponent } from '../file-structure-error/file-structure-error.component';
import { ProductFactorFileContent } from '../interfaces/factor-file-content';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit, AfterViewInit {
    constructor(
        private apiService: ApiService,
        public dialogRef: MatDialogRef<FileUploadComponent>,
        public fileStructuredailog: MatDialog,
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
    @Input() filesHistoryList!: History;

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
    fileVersionId!: string;
    fileSavePath!: string;
    showHideLoader = false;
    showHideTitle = 'Show File Loader';
    branchList!: string[];
    selectedBranch!: string;
    view!: string;
    viewState = false;
    formTitle!: string;
    defaultFilePath = '/CW/RatingFactors/Tables/';
    comment: string = 'updating file';
    fileLabel!: string;
    state!: string;
    isListFileData!: boolean;
    fileNameWithOutExtension!: string;
    existingTableColumns!: string[];

    options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        showTitle: false,
        useBom: true,
        noDownload: true,
        headers: this.columnHeadings
    };

    ngOnInit(): void {
        debugger;
        this.view = this.route.snapshot.data['view'];
        this.isListFileData = this.dataService.isListFileData;
        this.selectedBranch = this.dataService.selectedBranch;
        if (this.view === 'viewhistory') {
            this.isListFileData = false;
        }
        if (this.view !== 'add') {
            this.setViewMode();
            this.onGetFiles();
        }

        this.getRateRevisions();
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

    getRateRevisions() {
        this.apiService.getRateRevisions().subscribe((data: RateRevisions) => {
            this.branchList = data.result;
        });
    }

    onGetFiles(): void {
        if (this.filesList !== undefined) {
            this.fileVersionId = this.filesList.fileVersionId;
            this.fileName = this.filesList.fileName;
            this.fileSavePath = this.filesList.filePath;
        } else {
            this.fileVersionId = this.route.snapshot.params['fileVersionId'];
            this.fileName = this.route.snapshot.params['fileName'];
        }
        this.apiService
            .getFileContent(this.fileName, this.fileVersionId)
            .subscribe({
                next: (data) => {
                    const { result } = data;
                    const { fileContent } = result;
                    console.log(`${JSON.stringify(fileContent)}`);
                    const convertedJsonData =
                        this.dataService.convertCsvToJason(fileContent);
                    this.dataSource.data = convertedJsonData;
                    this.columnHeadings =
                        this.dataService.getColumnHeadings(convertedJsonData);
                    this.displayColumns = [...this.columnHeadings];
                    this.dataService.fileLoadedFromDBForEditing = true;
                },
                error: (error: any) => console.log(error),
                complete: () => console.log('Done retrieving files')
            });
    }

    getExistingFileHeaders() {
        this.existingTableColumns = [];
        const existingCols = this.fileNameWithOutExtension
            ? this.fileNameWithOutExtension
            : this.fileName;
        this.apiService
            .getProductDefinitionFileContent('CW', existingCols)
            .subscribe({
                next: (data: ProductFactorFileContent) => {
                    const { result } = data;
                    const fileContent = R.pathOr('', ['fileContent'], result);

                    if (fileContent) {
                        const convertedJsonData =
                            this.dataService.convertCsvToJason(fileContent);
                        this.existingTableColumns =
                            this.dataService.getColumnHeadings(
                                convertedJsonData
                            );
                    }

                    console.log(
                        `existing table cols ${this.existingTableColumns}`
                    );
                },
                error: (error: any) =>
                    console.log(
                        `the following error occurred ${JSON.stringify(error)}`
                    ),
                complete: () => console.log('Done retrieving files')
            });
    }

    onGetFileHistory() {
        if (this.filesHistoryList !== undefined) {
            const { fileContent, comment } = this.filesHistoryList;
            if (fileContent) {
                const convertedJsonData =
                    this.dataService.convertCsvToJason(fileContent);
                this.dataSource.data = convertedJsonData;
                this.columnHeadings =
                    this.dataService.getColumnHeadings(convertedJsonData);
            }

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
        debugger;
        let fileValid;

        if (this.fileLoad) {
            this.fileSavePath = this.defaultFilePath + this.fileName;
            this.columnHeadings = Object.keys(this.dataSource.data[0]);
        }

        //do not validate structure if file is loaded from db
        if (!this.dataService.fileLoadedFromDBForEditing) {
            fileValid = this.dataService.validateFileStructure(
                this.existingTableColumns,
                this.displayColumns
            );
        }

        this.options.headers = this.columnHeadings;
        const data = this.dataSource.data;
        const convertedData = new ngxCsv(
            data,
            this.fileName,
            this.options
        ).getCsv();
        if (fileValid || this.dataService.fileLoadedFromDBForEditing) {
            this.apiService
                .updateRatingFile(
                    this.fileName,
                    convertedData,
                    this.selectedBranch,
                    this.comment
                )
                .subscribe({
                    next: (response: FileSaveApiResonse) => {
                        this.messageService.openSnackBar(
                            `File ${this.fileName} was Successfully saved to branch `
                        );
                    },
                    error: (error: ApiResponse) => {
                        this.messageService.openSnackBar(
                            `Error occurred while saving ${this.fileName} to branch ${error}`
                        );
                        console.log(error);
                    },
                    complete: () => console.log('Done updating file')
                });
        } else if (
            this.existingTableColumns?.length === 0 &&
            !this.dataService.fileLoadedFromDBForEditing
        ) {
            this.fileName = this.dataService.getFilename(this.fileName);
            this.apiService
                .addNewRatingFile(this.fileName, convertedData, this.comment)
                .subscribe({
                    next: (response: ApiResponse) => {
                        this.messageService.openSnackBar(
                            `${response.result.fileName} was Successfully added to branch ${response.result.branchName}`
                        );
                    },
                    error: (error: ApiResponse) => {
                        this.messageService.openSnackBar(
                            `Error occurred while adding to branch `
                        );
                    },
                    complete: () => console.log('Done adding file')
                });
        } else {
            this.openDialog();
            console.log('loading modal');
        }
    }

    loadFileData(file: any) {
        if (file) {
            this.showToolbar = true;
            this.fileLoad = true;
            this.dataService.fileMode = true;
            const fileReader = new FileReader();
            this.displayColumns = [];
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
                    this.fileHeadings = Object.keys(this.convertedJsonArray[0]);
                    this.dataSource.data = this.convertedJsonArray;
                    this.fileDataBeforeEdit = this.dataSource.data;
                    this.displayColumns = Object.keys(this.dataSource.data[0]);
                    this.fileName = this.dataService.getFilename(file.name);
                    this.fileNameWithOutExtension =
                        this.dataService.getFilename(this.fileName);
                    this.displayColumns = [...this.displayColumns];
                    this.getExistingFileHeaders();
                });
            };
            this.dataService.fileMode = false;
            this.fileLabel = 'Editing File';
        }
    }

    download() {
        const data = this.dataSource.data;
        if (this.fileHeadings == undefined) {
            this.fileHeadings = Object.keys(this.dataSource.data[0]);
        }
        this.options.headers = this.fileHeadings;
        this.options.noDownload = false;
        new ngxCsv(data, this.fileName, this.options);
    }

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

    closeDialog(): void {
        if (this.view === 'view') {
            this.router.navigate(['viewfilelist']);
        } else if (this.view === 'edit') {
            this.router.navigate(['editfilelist']);
        } else if (this.view === 'viewhistory') {
            this.router.navigate(['filehistory', this.fileName]);
        } else {
            this.router.navigate(['dashboard']);
        }
    }

    onBranchChange() {
        this.dataService.selectedBranch = this.selectedBranch;
    }

    openDialog() {
        debugger;
        let message = 'File structure failed validation';
        let firstAppend = false;
        if (this.dataService.headerDiffColumn.length > 0) {
            message =
                message +
                ` because of column difference ${this.dataService.headerDiffColumn}`;
            firstAppend = true;
        }

        if (
            this.dataService.arrayFirstLength !==
            this.dataService.arraySecondLength
        ) {
            if (firstAppend) {
                message = message + ' and ';
            }
            message =
                message +
                ` because the expected column count is ${this.dataService.arrayFirstLength} and the actual column count is ${this.dataService.arraySecondLength}`;
        }
        const dialogRef = this.fileStructuredailog.open(
            FileStructureErrorComponent,
            {
                data: {
                    message: message,
                    buttonText: {
                        cancel: 'Ok'
                    }
                }
            }
        );
    }
}
