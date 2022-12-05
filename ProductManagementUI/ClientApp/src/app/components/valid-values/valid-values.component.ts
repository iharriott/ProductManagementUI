import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-valid-values',
    templateUrl: './valid-values.component.html',
    styleUrls: ['./valid-values.component.css']
})
export class ValidValuesComponent implements OnInit {
    @Input() validValuesForm!: FormGroup;
    @Input() public arrayIndex!: number;
    constructor() {}

    ngOnInit(): void {}
}
