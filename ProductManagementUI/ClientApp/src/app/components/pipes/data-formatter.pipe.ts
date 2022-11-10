import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Pipe({
    name: 'dataFormatter'
})
export class DataFormatterPipe implements PipeTransform {
    constructor(private dataService: DataService) {}
    transform(value: Date, ...args: unknown[]): string {
        return this.dataService.getDateFromUTC(value);
    }
}
