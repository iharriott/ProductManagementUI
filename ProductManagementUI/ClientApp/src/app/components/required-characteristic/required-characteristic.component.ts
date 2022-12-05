import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-required-characteristic',
    templateUrl: './required-characteristic.component.html',
    styleUrls: ['./required-characteristic.component.css']
})
export class RequiredCharacteristicComponent implements OnInit {
    @Input() requiredCharacteristicForm!: FormGroup;
    @Input() public arrayIndex!: number;
    constructor() {}

    ngOnInit(): void {}
}
