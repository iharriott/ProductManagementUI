import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
    MatDialogRef,
    MatDialog,
    MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { FileSelectionPopupComponent } from '../file-selection-popup/file-selection-popup.component';
import { FileHistory } from '../interfaces/file-history';
import { FileHistorySummary } from '../interfaces/file-history-summary';
import { GitResult } from '../interfaces/git-result';

@Component({
    selector: 'app-file-history-list',
    templateUrl: './file-history-list.component.html',
    styleUrls: ['./file-history-list.component.css']
})
export class FileHistoryListComponent implements OnInit {
    dataSource!: MatTableDataSource<any>;
    @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort!: MatSort;
    displayedColumns!: string[];
    columnHeadings!: string[];
    selectedBranch!: string;
    branchList!: string[];
    view!: string;
    fileId!: string;
    fileSummaryData!: any[];
    version!: string;
    fileName!: string;
    dateList: any[] = [];

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

    ngOnInit(): void {
        //debugger;
        this.fileName = this.dataService.currentFile;
        this.fileId = this.route.snapshot.params['fileId'];
        this.selectedBranch = this.route.snapshot.params['version'];
        this.onGetFiles();
    }

    onGetFiles(): void {
        this.apiService
            .getRateFileHistory(this.selectedBranch, this.fileId)
            .subscribe(
                (data: FileHistory) => {
                    this.dataService.currentFileHistoryData = data;
                    this.version = data.version;
                    this.fileId = data.result.fileId;
                    this.fileSummaryData = data.result.history.map(
                        (fileData) => {
                            return {
                                version: this.version,
                                filedId: this.fileId,
                                fileHistoryId: fileData.fileHistoryId,
                                date: this.dataService.getDateFromUTC(
                                    fileData.date
                                ),
                                comment: fileData.comment.substring(0, 35),
                                authorName: fileData.authorName
                            };
                        }
                    );

                    this.dataSource.data = [...this.fileSummaryData];
                    this.columnHeadings = this.dataService.getColumnHeadings(
                        this.fileSummaryData
                    );
                    //this.displayedColumns = [...this.columnHeadings, 'action'];
                    this.displayedColumns = [
                        'date',
                        'comment',
                        'authorName',
                        'action'
                    ];
                    //this.dataLoaded = true;
                    console.log(`column headings ${this.displayedColumns}`);
                    console.log(`${JSON.stringify(this.fileSummaryData)}`);
                },
                (error: any) => console.log(error),
                () => console.log('Done retrieving users')
            );
    }

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

    onClick(row) {
        //debugger;
        const { date } = row;
        this.dateList = [...this.dateList, date];
    }

    onSelect() {
        this.dataService.isListFileData = false;
        this.dataService.dateList = this.dateList;
        this.router.navigate(['multiview']);
    }
}
