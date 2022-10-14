import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

interface SelectValue {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-product-definition',
  templateUrl: './product-definition.component.html',
  styleUrls: ['./product-definition.component.css']
})
export class ProductDefinitionComponent implements OnInit {

  constructor(private fb:FormBuilder) { }
  
  businesses: SelectValue[] = [
    {value: 'CAR', viewValue: 'Car Insurance'},
    {value: 'HOU', viewValue: 'House Insurance'},
    {value: 'ALL', viewValue: 'All Insurance'},
  ];

  states: SelectValue[] = [
    {value: 'CA', viewValue: 'California'},
    {value: 'NY', viewValue: 'New York'},
    {value: 'TX', viewValue: 'Texas'},
  ];

  dataTypes: SelectValue[] = [
    {value: 'INT', viewValue: 'Integer'},
    {value: 'BOOL', viewValue: 'Boolean'},
    {value: 'STR', viewValue: 'String'},
  ];

 validationTypes: SelectValue[] = [
    {value: 'VAL1', viewValue: 'Validation Type 1'},
    {value: 'VAL2', viewValue: 'Validation Type 2'},
    {value: 'VAL3', viewValue: 'Validation Type 3'},
  ];

  productDefinitionForm!: FormGroup;

  ngOnInit(): void {     
        this.productDefinitionForm = this.fb.group({
         schemaVersion: [''],
         id: [''],
         lineOfBusiness: [''],
         state: [''],
         productName: [''],
         productVersion: [''],
         effectiveDate: [],
         expiryDate: [],
         entities: this.fb.array([])
   });
   
   
   let field;
   const val2 = this.getEntities().controls.forEach(ctrl => {
     field = ctrl.get('fields') as FormArray;
   });
   
   const myfield = field;
   
   console.log(`prod def form ${this.productDefinitionForm}`);
   
   }
   
addEntity(): void{
  const entity = this.addEntityFormGroup();
 (<FormArray>this.productDefinitionForm.get('entities')).push(entity);
}

removeEntity(i : number): void{
  (<FormArray>this.productDefinitionForm.get('entities')).removeAt(i);
 }

getEntities(): FormArray{
  const entities = this.productDefinitionForm.get('entities') as FormArray;
 return this.productDefinitionForm.get('entities') as FormArray;
}

isEntitiesExists() : number{
  return this.getEntities().controls.length;
}

isValidationsExists(fieldGroup: AbstractControl) : number{
  const validationArray = fieldGroup.get('validations') as FormArray;
  return validationArray.controls.length;
}

 getFields(index: number ): any
 {
  return (<FormGroup>this.getEntities().controls[index]).get('fields');
 }

 addFields(fieldGroup: AbstractControl): void {
  const fldgroup = fieldGroup.get('fields') as FormArray;
  const field = this.addFiedsFormGroup();
  fldgroup.push(field);
 }

 addValidations(fieldGroup: AbstractControl): void {
  const validationArray = fieldGroup.get('validations') as FormArray;
  const validation = this.addValidationFormGroup();
  validationArray.push(validation);
 }

 removeValidations(validationGroup: AbstractControl, idx: number){
  const validationArray = validationGroup.get('validations') as FormArray;
  validationArray.removeAt(idx);
 }

 getFormGroup(fieldGroup: AbstractControl){
  return (fieldGroup as FormGroup);
 }

 removeFields(fieldGroup: AbstractControl, i: number, value: string){
  switch(value){
    case "fields": {
      const fieldGroupArray = (fieldGroup as FormGroup).get('fields') as FormArray;
      fieldGroupArray.removeAt(i);
    }
  }
 }

 isFieldsExists(fieldGroup: AbstractControl) : number{
  const result = (fieldGroup as FormGroup).get('fields') as FormArray;
  const length = result.value.length;
  return length;
}

getFieldsArray(fieldGroup: AbstractControl) : FormArray{
  const array =  (fieldGroup as FormGroup).get('fields') as FormArray
 return array;
}

getValidationsArray(validationGroup: AbstractControl) : FormArray{
  const validationArray =  (validationGroup as FormGroup).get('validations') as FormArray
 return validationArray;
}

  addEntityFormGroup() : FormGroup{
  return this.fb.group({
    entityType: [''],
    description: [''],
    cardinality: [''],
    coverages: [''],
    fields: this.fb.array([])
   });
  }

  addFiedsFormGroup(): FormGroup{
    return this.fb.group({
      name: [''],
      dataType: [''],
      isRequired: [''],
      validations: this.fb.array([])
     });
  }

  addValidationFormGroup(): FormGroup{
    return this.fb.group({
      name: [''],
      validationType: [''],
      validValues: this.fb.array([])
     });
  }

  addValidValuesControl(){
    return new FormControl('');
  }

  isValuesExist(fieldGroup: AbstractControl){
    const validValuesArray = fieldGroup.get('validValues') as FormArray;
    return validValuesArray.length;
  }

  addValidValues(fieldGroup: AbstractControl): void {
    const validValuesArray = fieldGroup.get('validValues') as FormArray;
    const value = this.addValidValuesControl();
    validValuesArray.push(value);
   }

   removeValidValues(validValuesGroup: AbstractControl, idx: number){
    const validValuesArray = validValuesGroup.get('validValues') as FormArray;
    validValuesArray.removeAt(idx);
   }

   getValidValuesArray(validValuesGroup: AbstractControl) : FormArray{
    const validValuesArray =  (validValuesGroup as FormGroup).get('validValues') as FormArray
   return validValuesArray;
  }

  getFieldsFormArray(entity: FormGroup) : FormArray{
    if (entity){
      return entity.get('fields') as FormArray;
    }
    
    return this.fb.array([]);
  }

}
