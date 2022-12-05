import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { RateRevisions } from '../interfaces/rate-revisions';

@Component({
    selector: 'app-rate-revision',
    templateUrl: './rate-revision.component.html',
    styleUrls: ['./rate-revision.component.css']
})
export class RateRevisionComponent implements OnInit {
    dataSource!: MatTableDataSource<any>;
    @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort!: MatSort;
    branchList!: any[];
    selectedVersionlist: string[] = [];
    columnHeadings;
    tableData$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    backUrl: string = 'dashboard';
    showCheckbox = true;
    displayedColumns: string[] = ['revision', 'action'];

    constructor(
        public dataService: DataService,
        private router: Router,
        private apiService: ApiService
    ) {
        this.dataSource = new MatTableDataSource();
    }

    ngOnInit(): void {
        this.getRateRevisions();
    }

    getRateRevisions() {
        this.apiService.getRateRevisions().subscribe({
            next: (data: RateRevisions) => {
                this.branchList = data?.result.map((res: string) => {
                    return { revision: res };
                });
                this.dataSource.data = [...this.branchList];
                this.columnHeadings = this.dataService.getColumnHeadings(
                    this.branchList
                );
                this.tableData$.next(this.dataSource.data);
            },
            error: () => {},
            complete: () => {}
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

    onClick(data) {
        if (
            !data.state &&
            !this.dataService.checkInList(
                this.selectedVersionlist,
                data.data.revision
            )
        ) {
            this.selectedVersionlist = this.dataService.addToList(
                this.selectedVersionlist,
                data.data.revision
            );
        }

        if (
            data.state &&
            this.dataService.checkInList(
                this.selectedVersionlist,
                data.data.revision
            )
        ) {
            this.selectedVersionlist = this.dataService.removeFromList(
                this.selectedVersionlist,
                data.data.revision
            );
        }
    }

    viewHistory(row) {}

    goToDashboard() {
        this.router.navigate(['dashboard']);
    }

    onClickView() {
        this.dataService.revisionList = this.selectedVersionlist;
        this.router.navigate(['multirevision']);
    }

    goToFiles(event) {
        this.dataService.selectedBranch = event.revision;
        this.router.navigate(['viewfilelist']);
    }
}
