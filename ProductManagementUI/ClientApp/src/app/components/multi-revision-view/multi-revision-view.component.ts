import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
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
        this.revisionList = this.dataService.revisionList;
    }

    getSelectedTabIndex(): number {
        return this.dataService.revisionSelectedTabIndex;
    }

    onTabChange(event: MatTabChangeEvent) {
        this.dataService.revisionSelectedTabIndex = event.index;
    }
}
