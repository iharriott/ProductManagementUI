import { Component, OnInit } from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup
} from '@angular/forms';

interface SelectValue {
    value: string;
    viewValue: string;
}

@Component({
    selector: 'app-entity',
    templateUrl: './entity.component.html',
    styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {
    entityForm!: FormGroup;
    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.entityForm = this.fb.group({
            schemaVersion: [''],
            entityType: [''],
            description: [''],
            cardinality: [''],
            coverages: this.fb.array([]),
            characteristics: this.fb.array([])
        });
    }

    addEntityFormGroup(): FormGroup {
        return this.fb.group({
            schemaVersion: [''],
            entityType: [''],
            description: [''],
            cardinality: [''],
            coverages: this.fb.array([]),
            characteristics: this.fb.array([])
        });
    }

    addCoverages(): void {
        const coverage = this.addCoverageControl();
        (<FormArray>this.entityForm.get('coverages')).push(coverage);
    }

    addcharacteristics(): void {
        const characteristics = this.addCharacteristicsControl();
        (<FormArray>this.entityForm.get('characteristics')).push(
            characteristics
        );
    }

    addCoverageControl() {
        return new FormControl('');
    }

    getCoverages(): FormArray {
        return this.entityForm.get('coverages') as FormArray;
    }

    isCoveragesExists(): number {
        return this.getCoverages().controls.length;
    }

    getCharacteristics(): FormArray {
        return this.entityForm.get('characteristics') as FormArray;
    }

    addCharacteristicsControl() {
        return new FormControl('');
    }

    isCharacteristicsExists(): number {
        return this.getCharacteristics().controls.length;
    }

    isCovergeExist(entityGroup: AbstractControl) {
        const coveragesArray = entityGroup.get('coverages') as FormArray;
        return coveragesArray.length;
    }

    getValidValuesArray(entityGroup: AbstractControl): FormArray {
        const coveragesArray = (entityGroup as FormGroup).get(
            'coverages'
        ) as FormArray;
        return coveragesArray;
    }

    isCharacteristicsExist(entityGroup: AbstractControl) {
        const characteristicsArray = entityGroup.get(
            'characteristics'
        ) as FormArray;
        return characteristicsArray.length;
    }

    getCharacteristicsArray(entityGroup: AbstractControl): FormArray {
        const characteristicsArray = (entityGroup as FormGroup).get(
            'characteristics'
        ) as FormArray;
        return characteristicsArray;
    }

    removeCoverages(i: number): void {
        (<FormArray>this.entityForm.get('coverages')).removeAt(i);
    }

    removeCharacteristics(i: number): void {
        (<FormArray>this.entityForm.get('characteristics')).removeAt(i);
    }
}
