import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-production-definition-search-results',
    templateUrl: './production-definition-search-results.component.html',
    styleUrls: ['./production-definition-search-results.component.css']
})
export class ProductionDefinitionSearchResultsComponent implements OnInit {
    productList: any[] = [];
    dataSource;
    displayColumns = ['product'];
    tableData$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    constructor(
        private dataService: DataService,
        private apiService: ApiService,
        private router: Router
    ) {}

    productSearchData;

    ngOnInit(): void {
        this.productSearchData = this.dataService.productSearchData;
        this.GetProductsInFamilyAndState();
    }

    GetProductsInFamilyAndState() {
        this.apiService
            .GetProductsInFamilyAndState(this.productSearchData)
            .subscribe(
                ({ result }) => {
                    this.productList = result;
                    //console.log(JSON.stringify(this.productList));
                    this.dataSource = result.map((val) => {
                        return { product: val };
                    });
                    console.log(JSON.stringify(this.dataSource));
                    this.tableData$.next(this.dataSource);
                },
                (error) => {
                    console.log(error);
                },
                () => console.log('completed')
            );
    }

    goToProducts(event) {
        const { product } = event;
        this.dataService.searchedProduct = product;
        this.router.navigate(['statefiling']);
    }
}
