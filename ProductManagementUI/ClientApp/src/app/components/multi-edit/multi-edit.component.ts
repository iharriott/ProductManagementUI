import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { History2 } from '../interfaces/file-history';

@Component({
    selector: 'app-multi-edit',
    templateUrl: './multi-edit.component.html',
    styleUrls: ['./multi-edit.component.css']
})
export class MultiEditComponent implements OnInit {
    constructor(public dataService: DataService) {}
    filesList!: any[];
    isListFileData!: boolean;
    historyData!: History2[];

    ngOnInit(): void {
        //debugger;
        this.isListFileData = this.dataService.isListFileData;
        if (this.isListFileData) {
            this.filesList = this.dataService.filesData;
        } else {
            const { result } = this.dataService.currentFileHistoryData;
            const { history } = result;
            //this.historyData = history;
            this.historyData = history.filter((data: History2) =>
                this.dataService.dateList.includes(
                    this.dataService.getDateFromUTC(data.date)
                )
            );
            this.filesList = this.historyData;
        }
    }
}
