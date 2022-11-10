import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { FactorFile, FileStructure } from '../interfaces/factor-file';
import {
    MatDialogRef,
    MatDialog,
    MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { FileSelectionPopupComponent } from '../file-selection-popup/file-selection-popup.component';
import { RateRevisions } from '../interfaces/rate-revisions';

@Component({
    selector: 'app-file-list',
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {
    @Input() branch!: any;
    dataSource!: MatTableDataSource<any>;
    @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort!: MatSort;
    constructor(
        private apiService: ApiService,
        public dataService: DataService,
        private router: Router,
        private route: ActivatedRoute,
        public dialogRef: MatDialogRef<FileSelectionPopupComponent>,
        private dialog: MatDialog,
        @Inject(MAT_DIALOG_DATA) public dialogData: string
    ) {
        this.dataSource = new MatTableDataSource();
    }
    fileSummaryData!: any[];
    displayedColumns!: string[];
    columnHeadings!: string[];
    action: string = 'idAction001';
    selectedBranch!: string;
    factorFileList!: string[];
    view!: string;
    branchLoadComplete = false;
    dataLoaded = false;
    checkBoxLabel!: string;
    buttonLabel!: string;
    navigatedRoute!: string;
    fileList: any[] = [];
    fontIcon!: string;
    dialogText!: string;

    ngOnInit(): void {
        //debugger;
        this.setViewMode();
        this.onGetFiles();
        this.getRateRevisions();
    }

    setViewMode() {
        //debugger;
        if (this.branch !== undefined) {
            this.selectedBranch = this.branch.revision;
        } else {
            this.selectedBranch = this.dataService.selectedBranch;
        }

        this.dataService.selectedBranch = this.selectedBranch;
        this.view = this.route.snapshot.data['view'];
        this.checkBoxLabel = this.view === 'edit' ? 'Edit' : 'View';
        this.fontIcon = this.view === 'edit' ? 'Edit' : 'Visibility';
        this.buttonLabel =
            this.view === 'edit' ? 'Select For Edit' : 'Select For View';
        this.navigatedRoute = this.view === 'edit' ? 'multiedit' : 'multiview';
        this.dialogText = this.view === 'edit' ? 'Editing' : 'Viewing';
    }

    onGetFiles(): void {
        this.apiService.getRatingTables(this.selectedBranch, false).subscribe(
            (data: FactorFile) => {
                this.dataService.currentFileData = data;
                this.fileSummaryData = data.result.map((fileData) => {
                    return {
                        fileName: fileData.fileName,
                        filePath: fileData.filePath,
                        lastUpdated: this.dataService.getDateFromUTC(
                            fileData.lastUpdated
                        ),
                        effectiveDate: this.dataService.getDateFromUTC(
                            fileData.effectiveDate
                        ),
                        renewalDate: this.dataService.getDateFromUTC(
                            fileData.renewalDate
                        ),
                        fileVersionId: fileData.fileVersionId,
                        // state: this.dataService.getStateFromPath(
                        //     fileData.fileId
                        // ),
                        lob: 'PPA'
                    };
                });

                this.dataSource.data = [...this.fileSummaryData];
                this.columnHeadings = this.dataService.getColumnHeadings(
                    this.fileSummaryData
                );
                //this.displayedColumns = [...this.columnHeadings, 'action'];
                this.displayedColumns = [
                    'fileName',
                    'lob',
                    'lastUpdated',
                    'effectiveDate',
                    'renewalDate',
                    'fileVersionId',
                    'action'
                ];
                this.dataLoaded = true;
                console.log(`column headings ${this.displayedColumns}`);
                console.log(JSON.stringify(this.fileSummaryData));
            },
            (error: any) => console.log(error),
            () => console.log('Done retrieving users')
        );
    }

    // onGetFileFromCache() {
    //     const cacheData = this.dataService.currentFileData;
    //     this.fileSummaryData = cacheData.result.map((fileData) => {
    //         return {
    //             commitId: fileData.commitId,
    //             fileName: fileData.fileName,
    //             path: fileData.path
    //         };
    //     });
    //     this.dataSource.data = [...this.fileSummaryData];

    //     this.columnHeadings = this.dataService.getColumnHeadings(
    //         this.fileSummaryData
    //     );
    //     this.displayedColumns = [...this.columnHeadings, 'action'];
    // }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        console.log(JSON.stringify(this.dataSource.data));

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    onBranchChange() {
        // debugger;
        this.onGetFiles();
        this.dataService.selectedBranch = this.selectedBranch;
        this.branchLoadComplete = true;
        //console.log(this.selectedBranch);
    }

    getRateRevisions() {
        this.apiService.getRateRevisions().subscribe((data: RateRevisions) => {
            this.factorFileList = data.result;
        });
    }

    loadData(row) {
        // debugger;
        const { fileHistoryId, fileName, fileId } = row;
        if (this.view === 'edit') {
            this.router.navigate(['editfile', fileHistoryId, fileName, fileId]);
        } else {
            this.router.navigate(['viewfile', fileHistoryId, fileName, fileId]);
        }
    }

    goToDashboard() {
        //debugger;
        if (this.view == 'view' || this.view == 'edit')
            this.router.navigate(['dashboard']);
        else if (this.view === 'multirevision') {
            this.router.navigate(['revision']);
        }
    }

    onChange(event, row) {
        //debugger;
        this.dataService.selectedBranch = this.selectedBranch;
        this.fileList = [...this.fileList, row];
        console.log(this.fileList);
    }

    onSelect() {
        //debugger;
        if (this.fileList.length > 0) {
            this.dataService.isListFileData = true;
            this.dataService.filesData = this.fileList;
            this.router.navigate([this.navigatedRoute]);
            console.log(this.route);
        } else {
            this.dialogData = this.dialogText;
            this.openDialog();
        }
    }

    openDialog(): any {
        return this.dialog.open(FileSelectionPopupComponent, {
            width: '20%',
            height: '15%',
            autoFocus: false,
            data: this.dialogData
        });
    }

    viewHistory(row) {
        //debugger;
        const { filePath, fileName } = row;
        console.log(row);
        this.dataService.currentFile = fileName;
        //const branch = this.selectedBranch;
        this.router.navigate(['filehistory', fileName]);
    }
}
