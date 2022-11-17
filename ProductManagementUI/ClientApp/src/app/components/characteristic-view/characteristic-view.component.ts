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
                const { fileContent } = result;
                console.log(`file content ${fileContent}`);
                const parsedJson = JSON.parse(fileContent);
                const json = JSON.stringify(fileContent, undefined, 4);
                console.log(`file content ${fileContent}`);
                const { SchemaVersion, Name, Description, DataType } =
                    parsedJson;
                const descriptionText = JSON.stringify(Description);
                //console.log(`file content ${JSON.parse(json)}`);
                //this.convertContentToJson();
                this.charactersiticsForm.patchValue({
                    schemaVersion: SchemaVersion,
                    name: Name,
                    dataType: DataType,
                    description: descriptionText
                });
            });
    }

    convertContentToJson() {
        let workbook = XLSX.read(this.fileContent, { type: 'binary' });
        workbook.SheetNames.map((sheet) => {
            const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
            this.convertedJson = JSON.stringify(data, undefined, 4);
            this.convertedJsonArray = JSON.parse(this.convertedJson);
            console.log(this.convertedJsonArray);
        });
    }
}
