import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup
} from '@angular/forms';
import { CommonConstants } from '../../constants/common-constants';
import { Characteristics } from '../interfaces/table-export-format';

interface SelectValue {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-characteristics',
    templateUrl: './characteristics.component.html',
    styleUrls: ['./characteristics.component.css']
})
export class CharacteristicsComponent implements OnInit {
    dropdownList: any[] = [];
    selectedItems: any[] = [];
    dropdownSettings: IDropdownSettings = {};
    charactersiticsForm!: FormGroup;
    searchText: string = '';
    filteredCharacteristics: Characteristics[] = [];
    selectedCharacteristics: Characteristics[] = [];
    constructor(private fb: FormBuilder) {}

    validationTypes: SelectValue[] = [
        { value: 'VAL1', viewValue: 'Validation Type 1' },
        { value: 'VAL2', viewValue: 'Validation Type 2' },
        { value: 'VAL3', viewValue: 'Validation Type 3' }
    ];

    ngOnInit(): void {
        this.charactersiticsForm = this.fb.group({
            schemaVersion: [''],
            name: [''],
            description: [''],
            dataType: [''],
            validations: this.fb.array([])
        });

        this.dropdownList = CommonConstants.characteristics;
        this.selectedItems = [];

        this.dropdownSettings = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true
        };
    }

    onItemSelect(event: any) {
        console.log(event);
    }
    onSelectAll(event: any) {
        console.log(event);
    }

    getValidations(): FormArray {
        return this.charactersiticsForm.get('validations') as FormArray;
    }

    addValidations(): void {
        const validation = this.addValidationFormGroup();
        (<FormArray>this.charactersiticsForm.get('validations')).push(
            validation
        );
    }

    addValidValues(fieldGroup: AbstractControl): void {
        const validValuesArray = fieldGroup.get('validValues') as FormArray;
        const value = this.addValidValuesControl();
        validValuesArray.push(value);
    }

    removeValidations(i: number): void {
        (<FormArray>this.charactersiticsForm.get('validations')).removeAt(i);
    }

    isValidationsExists(): number {
        return this.getValidations().controls.length;
    }

    removeValidValues(validValuesGroup: AbstractControl, idx: number) {
        const validValuesArray = validValuesGroup.get(
            'validValues'
        ) as FormArray;
        validValuesArray.removeAt(idx);
    }

    isValuesExist(fieldGroup: AbstractControl) {
        const validValuesArray = fieldGroup.get('validValues') as FormArray;
        return validValuesArray.length;
    }

    getValidValuesArray(validValuesGroup: AbstractControl): FormArray {
        const validValuesArray = (validValuesGroup as FormGroup).get(
            'validValues'
        ) as FormArray;
        return validValuesArray;
    }

    addValidationFormGroup(): FormGroup {
        return this.fb.group({
            name: [''],
            validationType: [''],
            validValues: this.fb.array([])
        });
    }

    addValidValuesControl() {
        return new FormControl('');
    }

    search(): void {
        if (this.searchText === '') {
            this.filteredCharacteristics = [];
            return;
        }

        CommonConstants.characteristics.filter((item) =>
            item.name.toUpperCase().includes(this.searchText.toUpperCase())
        );
        this.filteredCharacteristics = CommonConstants.characteristics.filter(
            (item) =>
                item.name.toUpperCase().includes(this.searchText.toUpperCase())
        );

        this.selectedCharacteristics.map((char) => {
            this.filteredCharacteristics = this.filteredCharacteristics.filter(
                (value) => value.id !== char.id
            );
        });
    }

    selectCharacteristic(selectedCharacteristic: Characteristics) {
        this.selectedCharacteristics = [
            ...this.selectedCharacteristics,
            selectedCharacteristic
        ];
        this.filteredCharacteristics = [];
        this.searchText = '';
    }

    removeCharacteristics(characteristicToBeRemoved: Characteristics) {
        this.selectedCharacteristics = this.selectedCharacteristics.filter(
            (item) => item.id !== characteristicToBeRemoved.id
        );
        this.filteredCharacteristics = [];
        this.searchText = '';
    }

    generateCharacteristics() {}
}
