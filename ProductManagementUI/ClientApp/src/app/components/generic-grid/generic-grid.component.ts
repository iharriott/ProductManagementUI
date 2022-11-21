import {
    Component,
    Input,
    OnInit,
    Output,
    ViewChild,
    EventEmitter
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-generic-grid',
    templateUrl: './generic-grid.component.html',
    styleUrls: ['./generic-grid.component.css']
})
export class GenericGridComponent implements OnInit {
    @Input() tableDataState$!: BehaviorSubject<any>;
    dataSource!: MatTableDataSource<any>;
    displayColumns!: string[];
    @Input() dataSourceInput!: any[];
    @Input() displayColumnsInput!: string[];
    @Output() linkClicked = new EventEmitter<any>();
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    constructor() {
        this.dataSource = new MatTableDataSource();
    }

    ngOnInit(): void {
        this.tableDataState$.subscribe((data) => {
            this.updateTableData(data);
        });
        this.displayColumns = this.displayColumnsInput;
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

    updateTableData(data: any[]) {
        data = data || [];
        this.dataSource.data = data;
        this.paginator?.firstPage();
    }

    goback() {}

    navigateToDetail(data) {
        this.linkClicked.emit(data);
    }
}
