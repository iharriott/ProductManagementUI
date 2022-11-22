import {
    AfterViewInit,
    Component,
    Input,
    OnInit,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup
} from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';
import { Refinement, Validation } from '../interfaces/characteristic-detail';
import { CommonConstants } from '../../constants/common-constants';

@Component({
    selector: 'app-characteristic-view',
    templateUrl: './characteristic-view.component.html',
    styleUrls: ['./characteristic-view.component.css']
})
export class CharacteristicViewComponent implements OnInit, AfterViewInit {
    @Input() currentCharacteristic!: any;
    @ViewChild('container', { read: ViewContainerRef, static: true })
    public container!: ViewContainerRef;
    @ViewChild('rawCharacteristics', { static: true })
    public rawChar!: TemplateRef<any>;
    @ViewChild('rawCharacteristicsJson', { static: true })
    public rawCharJson!: TemplateRef<any>;
    @ViewChild('refinement', { static: true })
    public refinement!: TemplateRef<any>;
    @ViewChild('refinementJson', { static: true })
    public refinementJson!: TemplateRef<any>;
    utility: any;

    selectedList!: string;
    charactersiticsForm!: FormGroup;
    refinementForm!: FormGroup;
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

    ngAfterViewInit(): void {
        this.determineTemplate();
    }

    ngOnInit(): void {
        //debugger;
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

        this.refinementForm = this.fb.group({
            refinements: this.fb.array([])
        });

        const { name, fileVersionId } = this.currentCharacteristic;
        this.apiService
            .getCharacteristicsDetails(name, fileVersionId, true)
            .subscribe((response) => {
                this.apiReponse = response;
                this.fileContent = this.apiReponse;
                const { result } = this.apiReponse;
                this.jsonContent = JSON.stringify(result, undefined, 4);
                const { fileContent } = result;
                const parsedJson = JSON.parse(fileContent);
                const json = JSON.stringify(parsedJson, undefined, 4);
                const {
                    schemaVersion,
                    name,
                    dataType,
                    validations,
                    refinements
                } = result;

                this.charactersiticsForm.patchValue({
                    schemaVersion: schemaVersion,
                    name: name,
                    dataType: dataType
                });
                if (validations) {
                    this.setValidations(validations);
                }

                if (refinements) {
                    this.setRefinements(refinements);
                }

                this.isValuesExist();

                console.log(
                    `form values ${JSON.stringify(
                        this.charactersiticsForm.value
                    )}`
                );
            });
    }

    determineTemplate() {
        this.container.clear();
        switch (this.utility) {
            case 'rawCharacteristics': {
                this.container.createEmbeddedView(this.rawChar);
                break;
            }
            case 'rawCharacteristicsJson': {
                this.container.createEmbeddedView(this.rawCharJson);
                break;
            }
            case 'refinement': {
                this.container.createEmbeddedView(this.refinement);
                break;
            }
            case 'refinementJson': {
                this.container.createEmbeddedView(this.refinementJson);
                break;
            }
            default: {
                this.container.createEmbeddedView(this.rawChar);
                break;
            }
        }
    }

    setTemplate(val: string) {
        // debugger;
        this.selectedList = val;
        this.utility =
            CommonConstants.listOfCharacteristicsView[this.selectedList];
        this.determineTemplate();
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

    addRefinementFormGroup(refinement: Refinement): FormGroup {
        return this.fb.group({
            schemaVersion: refinement.schemaVersion,
            name: refinement.name,
            refinementType: refinement.refinementType,
            expression: refinement.expression,
            priority: refinement.priority,
            requiredCharacteristics: this.fb.array([])
        });
    }

    addRefinements(refinementInput: Refinement): void {
        const refinement = this.addRefinementFormGroup(refinementInput);
        (<FormArray>this.refinementForm.get('refinements')).push(refinement);
        console.log(`the validation Array ${refinement}`);
    }

    addValidations(validationInput: Validation): FormGroup {
        const validation = this.addValidationFormGroup(validationInput);
        (<FormArray>this.charactersiticsForm.get('validations')).push(
            validation
        );
        console.log(`the validation Array ${validation}`);
        return validation;
    }

    addValidValues(validValuesArray: FormArray, validVal: string): void {
        const value = this.addValidValuesControl(validVal);
        validValuesArray.push(value);
    }

    addValidValuesControl(value) {
        console.log(`value in add ${value}`);
        return new FormControl(value);
    }

    getValidations(): FormArray {
        return this.charactersiticsForm.get('validations') as FormArray;
    }

    getRefinements(): FormArray {
        return this.refinementForm.get('refinements') as FormArray;
    }

    setRefinements(refinements: Refinement[]): void {
        refinements.forEach((refinement) => {
            console.log(`refinements ${JSON.stringify(refinements)}`);
            this.addRefinements(refinement);
        });
    }

    setValidations(validations: Validation[]): void {
        validations.forEach((validation) => {
            const { validValues } = validation;

            console.log(`valid value in set ${JSON.stringify(validValues)}`);
            const validationformGroup = this.addValidations(validation);
            if (validValues) {
                this.setValidValues(validationformGroup, validValues);
            }
        });
    }

    setValidValues(validationformGroup: FormGroup, validValues: string[]) {
        const validValuesArray = validationformGroup.get(
            'validValues'
        ) as FormArray;
        console.log(
            `validation array controls ${validValuesArray.controls.values}`
        );
        validValues.forEach((val) => {
            this.addValidValues(validValuesArray, val);
        });
    }

    isValidationsExists(): number {
        return this.getValidations().controls.length;
    }
    isRefinementsExists(): number {
        return this.getRefinements().controls.length;
    }

    isValuesExist() {
        const validationFormGroup = this.getValidations();
        const validValuesArray = validationFormGroup.get(
            'validValues'
        ) as FormArray;
        console.log(`valid values length ${validValuesArray}`);
        //return validValuesArray.controls.length;
        return 1;
    }

    updateAllComplete() {
        this.showJson = !this.showJson;
    }
}
