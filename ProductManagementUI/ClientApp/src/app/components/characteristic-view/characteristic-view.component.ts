import { Component, Input, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup
} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import * as XLSX from 'xlsx';
import { Validation } from '../interfaces/characteristic-detail';

@Component({
    selector: 'app-characteristic-view',
    templateUrl: './characteristic-view.component.html',
    styleUrls: ['./characteristic-view.component.css']
})
export class CharacteristicViewComponent implements OnInit {
    @Input() currentCharacteristic!: any;
    charactersiticsForm!: FormGroup;
    apiReponse;
    convertedJson;
    convertedJsonArray;
    fileContent;
    jsonContent;
    showJson = true;
    constructor(
        private fb: FormBuilder,
        private apiService: ApiService,
        private dataService: DataService
    ) {}

    ngOnInit(): void {
        this.charactersiticsForm = this.fb.group({
            schemaVersion: [''],
            name: [''],
            description: [''],
            dataType: [''],
            fileVersionId: [''],
            fileContent: [''],
            validations: this.fb.array([]),
            refinements: this.fb.array([])
        });
        const { name, fileVersionId } = this.currentCharacteristic;
        this.apiService
            .getCharacteristicsDetails(name, fileVersionId, true)
            .subscribe((response) => {
                //console.log(JSON.stringify(response));
                this.apiReponse = response;
                this.fileContent = this.apiReponse;
                const { result } = this.apiReponse;
                //const { Validations } = this.apiReponse;
                const { fileContent } = result;
                //console.log(`api validation ${JSON.stringify(validations)}`);
                const parsedJson = JSON.parse(fileContent);
                const json = JSON.stringify(parsedJson, undefined, 4);
                this.jsonContent = json;
                console.log(`file content ${fileContent}`);
                const { schemaVersion, name, dataType, validations } = result;
                // const { validValues } = validations[0];
                //const Validations = result['validations'];
                //console.log(`api validation ${JSON.stringify(validValues)}`);
                //const descriptionText = JSON.stringify(Description);
                //console.log(`file content ${JSON.parse(json)}`);
                //this.convertContentToJson();
                this.charactersiticsForm.patchValue({
                    schemaVersion: schemaVersion,
                    name: name,
                    dataType: dataType
                });
                if (validations) {
                    this.setValidations(validations);
                }

                console.log(
                    `form values ${JSON.stringify(
                        this.charactersiticsForm.value
                    )}`
                );
            });
    }

    getValidValuesArray(validValuesGroup: AbstractControl): FormArray {
        const validValuesArray = (validValuesGroup as FormGroup).get(
            'validValues'
        ) as FormArray;
        return validValuesArray;
    }

    addValidationFormGroup(validation: Validation): FormGroup {
        return this.fb.group({
            name: validation.name,
            validationType: validation.validationType,
            validValues: this.fb.array([]),
            expression: validation.expression,
            parsedExpression: validation.parsedExpression,
            errorMessage: validation.errorMessage
        });
    }

    addValidations(validationInput: Validation): void {
        const validation = this.addValidationFormGroup(validationInput);
        (<FormArray>this.charactersiticsForm.get('validations')).push(
            validation
        );
        console.log(`the validation Array ${validation}`);
    }

    addValidValues(fieldGroup: AbstractControl, validVal: string): void {
        const validValuesArray = fieldGroup.get('validValues') as FormArray;
        console.log(`valid values ${validValuesArray}`);
        console.log(`field group ${fieldGroup}`);
        const value = this.addValidValuesControl(validVal);
        validValuesArray.push(value);
    }

    addValidValuesControl(value) {
        return new FormControl(value);
    }

    getValidations(): FormArray {
        return this.charactersiticsForm.get('validations') as FormArray;
    }

    setValidations(validations: Validation[]): void {
        //const formArray = new FormArray([]);
        validations.forEach((validation) => {
            const { validValues } = validation;
            if (validValues) {
                this.setValidValues(validValues);
            }

            console.log(`valid value in set ${JSON.stringify(validValues)}`);
            this.addValidations(validation);
        });
    }

    setValidValues(validValues: string[]) {
        const validationsArray = this.getValidations() as FormArray;
        console.log(
            `validation array controls ${validationsArray.controls.values}`
        );
        //const validValuesArray = this.getValidValuesArray(validationsArray);
        validValues.forEach((val) => {
            this.addValidValues(validationsArray, val);
        });
    }

    isValidationsExists(): number {
        return this.getValidations().controls.length;
    }

    updateAllComplete() {
        this.showJson = !this.showJson;
    }
}
