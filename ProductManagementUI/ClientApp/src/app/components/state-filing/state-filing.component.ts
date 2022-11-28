import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-state-filing',
    templateUrl: './state-filing.component.html',
    styleUrls: ['./state-filing.component.css']
})
export class StateFilingComponent implements OnInit {
    constructor(
        private apiService: ApiService,
        private dataService: DataService,
        private router: Router
    ) {}

    productFilter;
    dataSource!: any[];
    displayColumns: string[] = [
        'Identifier',
        'NewBusinessDate',
        'RenewalDate',
        'AvailabilityDate',
        'BI',
        'PD',
        'Comp'
    ];
    tableData$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

    ngOnInit(): void {
        this.productFilter = this.dataService.searchedProduct;
        this.GetProductDefinitionsDetails();
    }

    GetProductDefinitionsDetails() {
        this.apiService
            .GetProductDefinitionsDetails(this.productFilter)
            .subscribe(
                ({ result }) => {
                    this.dataSource = result.map((val) => {
                        return {
                            Identifier: val.productDefinition,
                            NewBusinessDate:
                                this.dataService.getDateFromUTCShort(
                                    val.newBusinessDate
                                ),
                            RenewalDate: this.dataService.getDateFromUTCShort(
                                val.renewalDate
                            ),
                            AvailabilityDate:
                                this.dataService.getDateFromUTCShort(
                                    val.availabilityDate
                                ),
                            BI: val.bi,
                            PD: val.pd,
                            Comp: val.comp
                        };
                    });
                    console.log(JSON.stringify(this.dataSource));
                    this.tableData$.next(this.dataSource);
                    console.log(JSON.stringify(this.displayColumns));
                },
                (error) => {
                    console.log(error);
                },
                () => console.log('completed')
            );
    }

    goToProducts(event) {
        this.dataService.selectProductCharacteristics = event;
        this.router.navigate(['characteristicslist']);
    }
}
