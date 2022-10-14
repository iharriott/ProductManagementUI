import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    constructor(private router: Router) {}
    longText = 'New Dashboard';

    ngOnInit(): void {}

    viewFileList() {
        //const { commitId, fileName, path } = row;
        this.router.navigate(['viewfilelist']);
    }

    editFileList() {
        //const { commitId, fileName, path } = row;
        this.router.navigate(['editfilelist']);
    }

    addNewFile() {
        this.router.navigate(['addNewfile']);
    }
}
