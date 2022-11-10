import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'stringReduce'
})
export class StringReducePipe implements PipeTransform {
    transform(value: string, ...args: unknown[]): string {
        return value.substring(0, 30);
    }
}
