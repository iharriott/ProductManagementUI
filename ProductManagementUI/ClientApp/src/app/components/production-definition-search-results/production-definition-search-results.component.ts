import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-production-definition-search-results',
    templateUrl: './production-definition-search-results.component.html',
    styleUrls: ['./production-definition-search-results.component.css']
})
export class ProductionDefinitionSearchResultsComponent implements OnInit {
    productList: any[] = [];
    constructor(
        private dataService: DataService,
        private apiService: ApiService
    ) {}

    ngOnInit(): void {
        const lob = this.dataService.lob;
        this.apiService.getProductDefinitionFamily(lob).subscribe(
            (data) => {
                this.productList = data;
                console.log(JSON.stringify(this.productList));
            },
            (error) => {
                console.log(error);
            },
            () => console.log('completed')
        );
    }
}
