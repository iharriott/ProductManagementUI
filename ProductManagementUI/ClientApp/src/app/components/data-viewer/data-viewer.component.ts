import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CommonConstants } from '../../constants/common-constants';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
    animate,
    state,
    style,
    transition,
    trigger
} from '@angular/animations';
import * as jsondiffpatch from 'jsondiffpatch';

@Component({
    selector: 'app-data-viewer',
    templateUrl: './data-viewer.component.html',
    styleUrls: ['./data-viewer.component.css'],
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
export class DataViewerComponent implements OnInit {
    panelOpenState = false;
    isTableExpanded = false;
    displayedColumns: string[] = [
        'name',
        'state',
        'version',
        'createdBy',
        'createdDate',
        'approvedBy',
        'approvedDate',
        'actions'
    ];
    dataSource!: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    firstCompareData: any[] = [];
    compareData: any[] = [];
    secondCompareData: any[] = [];
    firstPopulated = false;
    secondPopulated = false;
    diffOutput;

    constructor(private apiService: ApiService) {}

    ngOnInit(): void {
        // const url = CommonConstants.cappingLevelV2;
        // this.dataSource = new MatTableDataSource();
        // this.apiService.getAllData(url).subscribe((data) => {
        //     this.dataSource.data = data.map((val) => {
        //         return {
        //             name: val.name,
        //             version: val.version,
        //             createdBy: val.createdBy,
        //             createdDate: val.createdDate,
        //             approvedBy: val.approvedBy,
        //             approvedDate: val.approvedDate,
        //             data: val.data,
        //             state: val.state,
        //             isExpanded: false
        //         };
        //     });
        //     console.log(`expansion data ${this.dataSource.data}`);
        // });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    showDiff() {
        const data = this.compareData[0].data;
        const data2 = this.compareData[1].data;
        const delta: any = jsondiffpatch.diff(data, data2);
        this.diffOutput =
            delta !== undefined
                ? jsondiffpatch.formatters.html.format(delta, data)
                : 'no difference';
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    toggleTableRows() {
        this.isTableExpanded = !this.isTableExpanded;

        this.dataSource.data.forEach((row: any) => {
            row.isExpanded = this.isTableExpanded;
        });
    }

    onChange(event, element) {
        if (event.checked) {
            if (this.compareData.length < 2) {
                this.compareData = [...this.compareData, element];
            }
        } else {
            this.compareData = this.compareData.filter(
                (val) => val.version !== element.version
            );
        }
    }

    reset() {
        this.diffOutput = undefined;
    }
}
