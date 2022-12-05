import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { FileSelectionPopupComponent } from '../file-selection-popup/file-selection-popup.component';

import {
    FileChangeHistory,
    ProductDefinitionVersion,
    RatingChanges
} from '../interfaces/rating-changes';
import * as R from 'ramda';
import {
    trigger,
    state,
    style,
    transition,
    animate
} from '@angular/animations';

@Component({
    selector: 'app-file-history-list',
    templateUrl: './file-history-list.component.html',
    styleUrls: ['./file-history-list.component.css'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition(
                'expanded <=> collapsed',
                animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
            )
        ])
    ]
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
    isTableExpanded = false;
    expandedElement!: ProductDefinitionVersion | null;

    constructor(
        private apiService: ApiService,
        public dataService: DataService,
        private router: Router,
        public dialogRef: MatDialogRef<FileSelectionPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData: string
    ) {
        this.dataSource = new MatTableDataSource();
    }

    ngOnInit(): void {
        this.fileName = this.dataService.currentFile;
        this.onGetFiles();
    }

    onGetFiles(): void {
        this.apiService.getRateFileHistory(this.fileName, true).subscribe({
            next: (data: RatingChanges) => {
                let history: FileChangeHistory[] = R.pathOr(
                    '',
                    ['result', 'history'],
                    data
                );

                this.dataService.currentFileHistoryData = data;
                this.version = data.version;

                this.fileSummaryData = history.map((fileData) => {
                    return {
                        fileVersionId: fileData.fileVersionId,
                        isLatestVersion: fileData.isLatestVersion,
                        fileContent: fileData.fileContent,
                        data: fileData.productDefinitionVersions,
                        isExpanded: false
                    };
                });

                this.dataSource.data = [...this.fileSummaryData];
                this.columnHeadings = this.dataService.getColumnHeadings(
                    this.fileSummaryData
                );
                this.displayedColumns = [
                    'fileVersionId',
                    'isLatestVersion',
                    'action'
                ];
            },
            error: (error: any) => console.log(error),
            complete: () => console.log('Done retrieving file history')
        });
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

    toggleTableRows() {
        this.isTableExpanded = !this.isTableExpanded;

        this.dataSource.data.forEach((row: any) => {
            row.isExpanded = this.isTableExpanded;
        });
    }

    onClick(row) {
        const { fileVersionId } = row;
        this.router.navigate(['viewfilehistory', fileVersionId, this.fileName]);
    }

    onSelect() {
        this.dataService.isListFileData = false;
        this.dataService.dateList = this.dateList;
        this.router.navigate(['multiview']);
    }

    goBack() {
        if (this.dataService.mode === 'view')
            this.router.navigate(['multirevision']);
        else {
            this.router.navigate(['editfilelist']);
        }
    }
}
