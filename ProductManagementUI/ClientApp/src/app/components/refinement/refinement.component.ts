import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-refinement',
    templateUrl: './refinement.component.html',
    styleUrls: ['./refinement.component.css']
})
export class RefinementComponent implements OnInit {
    @Input() refinementForm!: FormGroup;
    @Input() public arrayIndex!: number;
    constructor() {}

    ngOnInit(): void {}

    isRequiredCharacteristicsExist(reqCharacteristicForm: FormGroup) {
        const requiredCharacteristics = reqCharacteristicForm.get(
            'requiredCharacteristics'
        ) as FormArray;
        return requiredCharacteristics.length;
    }

    getRequiredCharacteristicsArray(
        reqCharacteristicForm: FormGroup
    ): FormArray {
        const requiredCharacteristicsArray = reqCharacteristicForm.get(
            'requiredCharacteristics'
        ) as FormArray;
        return requiredCharacteristicsArray;
    }

    convertToFormGroup(arrayGroup: any): FormGroup {
        return arrayGroup as FormGroup;
    }
}
