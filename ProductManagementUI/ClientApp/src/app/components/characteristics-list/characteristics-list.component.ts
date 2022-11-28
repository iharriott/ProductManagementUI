import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { CharacteristicsDetail } from '../interfaces/characteristicsDefinition';

@Component({
    selector: 'app-characteristics-list',
    templateUrl: './characteristics-list.component.html',
    styleUrls: ['./characteristics-list.component.css']
})
export class CharacteristicsListComponent implements OnInit {
    dataSource!: MatTableDataSource<any>;
    @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort!: MatSort;
    selectedCharacteristics: string = '';
    tableName: string = '';
    characteristicsList: string[] = [
        'Raw',
        'Formula',
        'Tabular',
        'Expression',
        'Switch'
    ];
    productDefinition;
    response!: CharacteristicsDetail[];
    displayedColumns;
    checkBoxLabel = 'View';
    rateRevision;
    effectiveDate;
    renewalDate;

    constructor(
        private apiService: ApiService,
        public dataService: DataService,
        private router: Router
    ) {
        this.dataSource = new MatTableDataSource();
    }

    ngOnInit(): void {
        const { Identifier, NewBusinessDate, RenewalDate } =
            this.dataService.selectProductCharacteristics;
        this.rateRevision = Identifier;
        this.effectiveDate =
            this.dataService.getDateFromUTCShort(NewBusinessDate);
        this.renewalDate = this.dataService.getDateFromUTCShort(RenewalDate);

        this.getCharacteristics();
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

    onSelectedChange() {}

    getCharacteristics(): void {
        this.apiService
            .getCharacteristics(this.rateRevision, false, false)
            .subscribe(
                ({ result }) => {
                    const data = result.map(
                        ({ name, fileVersionId, dataType, state }) => {
                            return {
                                name,
                                fileVersionId,
                                state,
                                dataType
                            };
                        }
                    );
                    this.displayedColumns = this.dataService
                        .getColumnHeadings(data)
                        .filter((x) => x !== 'fileVersionId');
                    this.displayedColumns = [
                        ...this.displayedColumns,
                        'action'
                    ];
                    this.dataSource.data = data;
                    console.log(JSON.stringify(this.displayedColumns));
                },
                (error) => {},
                () => {
                    console.log('completed fetching characteristics');
                }
            );
    }

    viewCharacteristics(row) {}

    onChange(event, row) {
        const { name, fileVersionId } = row;
        const data = { name, fileVersionId };
        if (
            !this.dataService.checkCharacteristicsInList(
                this.dataService.characteristicsList,
                name
            )
        ) {
            this.dataService.characteristicsList = [
                ...this.dataService.characteristicsList,
                data
            ];
        }
    }

    onClickView() {
        this.router.navigate(['characteristicsview']);
    }

    navigateToDetail(row) {
        this.dataService.currentCharacteristic = row;
        this.router.navigate(['characteristicdetail']);
    }

    goBack() {}
}
