import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-product-search',
    templateUrl: './product-search.component.html',
    styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
    productsearchForm!: FormGroup;
    lobList = ['Auto'];
    stateList = [
        { name: 'CA', description: 'California' },
        { name: 'NY', description: 'New York' }
    ];
    companyList = ['Geico'];
    productfamilyList = ['GAPP'];

    constructor(
        private fb: FormBuilder,
        private dataService: DataService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.productsearchForm = this.fb.group({
            lob: [''],
            state: [''],
            productFamily: [''],
            company: [''],
            environment: ['']
        });
    }

    search() {
        const { lob } = this.productsearchForm.getRawValue();
        this.dataService.lob = lob;
        this.router.navigate(['productsearchresult']);
        //console.log(lob);
    }
}
