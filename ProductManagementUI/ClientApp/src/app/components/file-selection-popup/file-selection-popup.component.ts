import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-file-selection-popup',
    templateUrl: './file-selection-popup.component.html',
    styleUrls: ['./file-selection-popup.component.css']
})
export class FileSelectionPopupComponent implements OnInit {
    view!: string;
    dialogText!: string;
    constructor(
        public dialogRef: MatDialogRef<FileSelectionPopupComponent>,
        @Inject(MAT_DIALOG_DATA) public dialogData: any
    ) {}

    ngOnInit(): void {
        this.dialogText = this.dialogData;
        this.dialogRef.disableClose = true;
    }

    closePopup() {
        this.dialogRef.close();
    }
}
