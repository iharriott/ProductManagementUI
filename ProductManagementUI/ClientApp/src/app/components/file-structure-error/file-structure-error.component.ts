import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-file-structure-error',
    templateUrl: './file-structure-error.component.html',
    styleUrls: ['./file-structure-error.component.css']
})
export class FileStructureErrorComponent implements OnInit {
    //constructor() { }
    message: string = 'Are you sure?';
    confirmButtonText = 'Yes';
    cancelButtonText = 'Ok';
    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<FileStructureErrorComponent>
    ) {
        if (data) {
            this.message = data.message || this.message;
            if (data.buttonText) {
                this.confirmButtonText =
                    data.buttonText.ok || this.confirmButtonText;
                this.cancelButtonText =
                    data.buttonText.cancel || this.cancelButtonText;
            }
        }
    }

    onConfirmClick(): void {
        this.dialogRef.close(true);
    }

    ngOnInit(): void {}
}
