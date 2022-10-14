import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface SelectValue {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-capping-rule',
  templateUrl: './capping-rule.component.html',
  styleUrls: ['./capping-rule.component.css']
})
export class CappingRuleComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cappingRuleForm = this.fb.group({
      schemaVersion: [''],
      entityType: [''],
      defaultGraduatedCappingLevel: [''],
      isApplicable: [''],
      cappingLevel: ['']
  });
  }

 cappingRuleForm!: FormGroup;

 entityTypes: SelectValue[] = [
  {value: 'CR', viewValue: 'CappingRule'},
  {value: 'ET1', viewValue: 'EntityType1'},
  {value: 'ET2', viewValue: 'EntityType2'},
];

cappingLevels: SelectValue[] = [
  {value: 'POL', viewValue: 'Policy'},
  {value: 'CL2', viewValue: 'CappingLevel2'},
  {value: 'CL3', viewValue: 'CappingLevel3'},
];

onSubmit(){}

}
