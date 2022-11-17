import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dataService: DataService
    ) {}
    longText = 'New Dashboard';

    viewFileList() {
        this.dataService.mode = 'view';
        this.router.navigate(['revision']);
    }

    editFileList() {
        this.dataService.mode = 'edit';
        this.router.navigate(['editfilelist']);
    }

    addNewFile() {
        this.router.navigate(['addNewfile']);
    }

    viewCharacteristics() {
        // this.router.navigate(['characteristicslist']);
        this.router.navigate(['productsearch']);
    }
}
