import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-characteristics-multi-view',
    templateUrl: './characteristics-multi-view.component.html',
    styleUrls: ['./characteristics-multi-view.component.css']
})
export class CharacteristicsMultiViewComponent implements OnInit {
    characteristicsList: any[] = [];
    constructor(
        private dataService: DataService,
        private apiService: ApiService
    ) {}

    ngOnInit(): void {
        this.characteristicsList = [...this.dataService.characteristicsList];
    }
}
