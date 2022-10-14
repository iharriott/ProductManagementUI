import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormArray } from '@angular/forms';

@Pipe({
  name: 'castFormArray'
})
export class CastFormArrayPipe implements PipeTransform {

  transform(value: AbstractControl, ...args: unknown[]): FormArray {
    return value as FormArray;
  }

}
