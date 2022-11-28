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
import {
    Refinement,
    RequiredCharacteristic,
    Validation
} from '../interfaces/characteristic-detail';
import { CommonConstants } from '../../constants/common-constants';
import { Router } from '@angular/router';

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
    refinementEnabled = false;
    selectedList!: string;
    charactersiticsForm!: FormGroup;
    refinementForm!: FormGroup;
    apiReponse;
    convertedJson;
    convertedJsonArray;
    fileContent;
    jsonContent;
    showJson = true;
    name!: string;
    fileVersionId!: string;
    constructor(
        private fb: FormBuilder,
        private apiService: ApiService,
        private dataService: DataService,
        private router: Router
    ) {}

    ngAfterViewInit(): void {
        this.determineTemplate();
    }

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

        this.refinementForm = this.fb.group({
            refinements: this.fb.array([])
        });

        this.getCharacteriticDetail();
    }

    getCharacteriticDetail() {
        const { name, fileVersionId } = this.currentCharacteristic
            ? this.currentCharacteristic
            : this.dataService.currentCharacteristic;

        this.apiService
            .getCharacteristicsDetails(name, fileVersionId, true)
            .subscribe((response) => {
                this.apiReponse = response;
                this.fileContent = this.apiReponse;
                const { result } = this.apiReponse;
                this.jsonContent = JSON.stringify(result, undefined, 4);
                const { fileContent } = result;
                const parsedJson = JSON.parse(fileContent);
                const { Description } = parsedJson;
                const description = JSON.stringify(Description);

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
                    dataType: dataType,
                    description: description
                });
                if (validations?.length > 0) {
                    this.setValidations(validations);
                }

                if (refinements?.length > 0) {
                    this.refinementEnabled = true;
                    this.setRefinements(refinements);
                }

                const idx = this.isRequiredCharacteristicsExist(0);
                console.log(`index = ${idx}`);

                console.log(
                    `form values ${JSON.stringify(
                        this.charactersiticsForm.value
                    )}`
                );

                console.log(
                    `refinement form values ${JSON.stringify(
                        this.refinementForm.value
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

    getRequiredCharacteristicsArray(
        refinementGroup: AbstractControl
    ): FormArray {
        const requiredCharacteristicsArray = (refinementGroup as FormGroup).get(
            'requiredCharacteristics'
        ) as FormArray;
        return requiredCharacteristicsArray;
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

    addRequiredCharacteristicsFormGroup(requiredChar: RequiredCharacteristic) {
        return this.fb.group({
            entityType: requiredChar.entityType,
            characteristicName: requiredChar.characteristicName
        });
    }

    addRefinements(refinementInput: Refinement): FormGroup {
        const refinement = this.addRefinementFormGroup(refinementInput);
        (<FormArray>this.refinementForm.get('refinements')).push(refinement);
        return refinement;
    }

    addValidations(validationInput: Validation): FormGroup {
        const validation = this.addValidationFormGroup(validationInput);
        (<FormArray>this.charactersiticsForm.get('validations')).push(
            validation
        );
        return validation;
    }

    addValidValues(validValuesArray: FormArray, validVal: string): void {
        const value = this.addValidValuesFormGroup(validVal);
        validValuesArray.push(value);
    }

    addValidValuesFormGroup(value): FormControl {
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
            const { requiredCharacteristics } = refinement;
            const addedRefinement = this.addRefinements(refinement);
            if (requiredCharacteristics) {
                this.setRequiredCharacteristics(
                    addedRefinement,
                    requiredCharacteristics
                );
            }
        });
    }

    setRequiredCharacteristics(
        refineformGroup: FormGroup,
        refinementCharacteristics: RequiredCharacteristic[]
    ) {
        const requiredCharacteristicArray = refineformGroup.get(
            'requiredCharacteristics'
        ) as FormArray;
        refinementCharacteristics.forEach((val) => {
            this.addRefinementCharacteristics(requiredCharacteristicArray, val);
        });
    }

    addRefinementCharacteristics(
        refinementArray: FormArray,
        requiredChar: RequiredCharacteristic
    ) {
        const value = this.addRequiredCharacteristicsFormGroup(requiredChar);
        refinementArray.push(value);
    }

    setValidations(validations: Validation[]): void {
        validations.forEach((validation) => {
            const { validValues } = validation;
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

    isValuesExist(index: number) {
        const validationFormGroup = this.getValidations();
        const formGroup = validationFormGroup.at(index) as FormGroup;
        const values = formGroup.get('validValues') as FormArray;
        return values.length;
    }

    isRequiredCharacteristicsExist(index: number) {
        const refinementFormGroup = this.getRefinements();
        const formGroup = refinementFormGroup.at(index) as FormGroup;
        const requiredCharacteristics = formGroup.get(
            'requiredCharacteristics'
        ) as FormArray;
        return requiredCharacteristics.length;
    }

    goBack() {
        this.router.navigate(['characteristicslist']);
    }
}
