import { Component, OnInit, ViewChild, Inject, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { FactorFile } from '../interfaces/factor-file';
import {
    MatDialogRef,
    MatDialog,
    MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { FileSelectionPopupComponent } from '../file-selection-popup/file-selection-popup.component';
import { RateRevisions } from '../interfaces/rate-revisions';
import { BehaviorSubject } from 'rxjs';

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
    tableData$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    backUrl: string = 'revision';
    showCheckbox = true;
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
    viewFileHistory = true;
    displayedColumns = [
        'fileName',
        'lob',
        'lastUpdated',
        'effectiveDate',
        'renewalDate',
        'fileVersionId',
        'action'
    ];

    ngOnInit(): void {
        this.setViewMode();
        this.onGetFiles();
        this.getRateRevisions();
    }

    setViewMode() {
        if (this.branch !== undefined) {
            this.selectedBranch = this.branch;
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
        this.apiService.getRatingTables(this.selectedBranch, false).subscribe({
            next: (data: FactorFile) => {
                this.dataService.currentFileData = data;
                this.fileSummaryData = data.result.map((fileData) => {
                    return {
                        fileName: fileData.fileName,
                        filePath: fileData.filePath,
                        lastUpdated: this.dataService.getDateFromUTCShort(
                            fileData.lastUpdated
                        ),
                        effectiveDate: this.dataService.getDateFromUTCShort(
                            fileData.effectiveDate
                        ),
                        renewalDate: this.dataService.getDateFromUTCShort(
                            fileData.renewalDate
                        ),
                        fileVersionId: fileData.fileVersionId,
                        lob: 'PPA'
                    };
                });

                this.dataSource.data = [...this.fileSummaryData];
                this.tableData$.next(this.dataSource.data);
                this.columnHeadings = this.dataService.getColumnHeadings(
                    this.fileSummaryData
                );

                this.dataLoaded = true;
            },
            error: (error: any) => console.log(error),
            complete: () => console.log('Done retrieving users')
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    onBranchChange() {
        this.onGetFiles();
        this.dataService.selectedBranch = this.selectedBranch;
        this.branchLoadComplete = true;
    }

    getRateRevisions() {
        this.apiService.getRateRevisions().subscribe((data: RateRevisions) => {
            this.factorFileList = data.result;
        });
    }

    loadData(row) {
        this.dataService.isListFileData = false;
        const { fileVersionId, fileName } = row;
        if (this.view === 'edit') {
            this.router.navigate(['editfile', fileVersionId, fileName]);
        } else {
            this.router.navigate(['viewfile', fileVersionId, fileName]);
        }
    }

    goToDashboard() {
        if (this.view == 'view' || this.view == 'edit')
            this.router.navigate(['dashboard']);
        else if (this.view === 'multirevision') {
            this.router.navigate(['revision']);
        }
    }

    onChange(row) {
        const dataObj = {
            fileName: row.data.fileName,
            fileVersionId: row.data.fileVersionId
        };
        this.dataService.selectedBranch = this.selectedBranch;
        this.fileList = [...this.fileList, dataObj];
    }

    onSelect() {
        if (this.fileList.length > 0) {
            this.dataService.isListFileData = true;
            this.dataService.filesData = this.fileList;
            this.router.navigate([this.navigatedRoute]);
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
        const { fileName } = row;
        console.log(row);
        this.dataService.currentFile = fileName;
        this.router.navigate(['filehistory', fileName]);
    }
}
