import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-multi-revision-view',
    templateUrl: './multi-revision-view.component.html',
    styleUrls: ['./multi-revision-view.component.css']
})
export class MultiRevisionViewComponent implements OnInit {
    revisionList: any[] = [];
    constructor(public dataService: DataService) {}

    ngOnInit(): void {
        //debugger;
        this.revisionList = this.dataService.revisionList;
    }
}
