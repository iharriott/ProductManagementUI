import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
//import { DataService } from 'src/app/services/data.service';
import { DataService } from '../../services/data.service';
import { ApiService } from '../../services/api.service';
import { CommonConstants } from '../../constants/common-constants';

@Component({
    selector: 'app-product-search',
    templateUrl: './product-search.component.html',
    styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
    productsearchForm!: FormGroup;
    envList;
    lobList;
    stateList = CommonConstants.states;
    companyList;
    productfamilyList;

    constructor(
        private fb: FormBuilder,
        private dataService: DataService,
        private router: Router,
        private apiService: ApiService
    ) {}

    ngOnInit(): void {
        this.productsearchForm = this.fb.group({
            lob: [''],
            state: [''],
            productFamily: [''],
            company: [''],
            environment: ['']
        });
        this.getCompany();
        this.getLOB();
        this.GetProductFamilies();
        this.GetEnvironment();
    }

    search() {
        const searchData = this.productsearchForm.getRawValue();
        this.dataService.productSearchData = searchData;
        this.router.navigate(['productsearchresult']);
    }

    getCompany(): void {
        this.apiService.getComopany().subscribe(
            ({ result }) => {
                this.companyList = [...result];
            },
            (error) => {},
            () => {
                console.log('completed fetching company');
            }
        );
    }

    getLOB(): void {
        this.apiService.getLOB().subscribe(
            ({ result }) => {
                this.lobList = [...result];
            },
            (error) => {},
            () => {
                console.log('completed fetching LOB');
            }
        );
    }

    GetProductFamilies(): void {
        this.apiService.GetProductFamilies().subscribe(
            ({ result }) => {
                this.productfamilyList = [...result];
            },
            (error) => {},
            () => {
                console.log('completed fetching ProductFamilies');
            }
        );
    }

    GetEnvironment(): void {
        this.apiService.getEnvironment().subscribe(
            ({ result }) => {
                this.envList = [...result];
            },
            (error) => {},
            () => {
                console.log('completed fetching Environment');
            }
        );
    }
}
