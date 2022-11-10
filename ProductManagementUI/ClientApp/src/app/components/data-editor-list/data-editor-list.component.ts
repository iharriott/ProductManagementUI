import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { ApiService } from 'src/app/services/api.service';
import { CommonConstants } from '../../constants/common-constants';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/services/data.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
    selector: 'app-data-editor-list',
    templateUrl: './data-editor-list.component.html',
    styleUrls: ['./data-editor-list.component.css']
})
export class DataEditorListComponent implements OnInit {
    displayedColumns: string[] = [
        'id',
        'name',
        'state',
        'version',
        'createdBy',
        'createdDate',
        'approvedBy',
        'approvedDate',
        'actions'
    ];
    dataSource!: MatTableDataSource<any>;
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    dialogData: any;

    constructor(
        private dialog: MatDialog,
        public dialogRef: MatDialogRef<FileUploadComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private apiService: ApiService,
        public dataService: DataService,
        private messageService: MessageService
    ) {}

    ngOnInit(): void {
        // this.dataService.fileMode = false;
        // const url = CommonConstants.cappingLevel;
        // this.dataSource = new MatTableDataSource();
        // this.apiService.getAllData(url).subscribe((data) => {
        //     this.dataService.determineVersion(data);
        //     console.log(`derived version ${this.dataService.dataVersion}`);
        //     this.dataSource.data = data.map((val) => {
        //         console.log(`derived version ${JSON.stringify(val)}`);
        //         return {
        //             id: val.id,
        //             name: val.name,
        //             version: val.version,
        //             createdBy: val.createdBy,
        //             createdDate: val.createdDate,
        //             approvedBy: val.approvedBy,
        //             approvedDate: val.approvedDate,
        //             data: val.data,
        //             state: val.state,
        //             isExpanded: false
        //         };
        //     });
        // });
    }

    openDialog(): any {
        this.dataService.fileMode = true;
        return this.dialog.open(FileUploadComponent, {
            width: '100%',
            height: '100%',
            autoFocus: false,
            data: this.dialogData
        });
    }

    editData(id: any) {}

    // editData(id: any) {
    //     const url = CommonConstants.cappingLevel;
    //     this.apiService.getDataById(url, id).subscribe((val) => {
    //         this.dialogData = { ...val };
    //         let dialogRef = this.openDialog();
    //         dialogRef.afterClosed().subscribe(() => {
    //             this.ngOnInit();
    //         });
    //     });
    // }

    deleteRow(id: number) {
        // debugger;
        // const url = CommonConstants.cappingLevel;
        // this.apiService.deleteRow(url, id).subscribe({
        //     next: (res) => {
        //         this.messageService.openSnackBar(`Data created Successfully `);
        //         this.ngOnInit();
        //     },
        //     error: (err) => {
        //         this.messageService.openSnackBar(`Error Deleting data `);
        //     }
        // });
    }
}
