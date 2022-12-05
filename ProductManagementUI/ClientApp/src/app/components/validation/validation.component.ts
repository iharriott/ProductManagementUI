import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-validation',
    templateUrl: './validation.component.html',
    styleUrls: ['./validation.component.css']
})
export class ValidationComponent {
    @Input() validationForm!: FormGroup;
    @Input() public arrayIndex!: number;
    constructor() {}

    isValuesExist(validationFormGroup: FormGroup) {
        const values = validationFormGroup.get('validValues') as FormArray;
        return values.length;
    }

    getValidValuesArray(validationFormGroup: FormGroup): FormArray {
        const validValuesArray = validationFormGroup.get(
            'validValues'
        ) as FormArray;
        return validValuesArray;
    }

    convertToFormGroup(arrayGroup: any): FormGroup {
        return arrayGroup as FormGroup;
    }
}
