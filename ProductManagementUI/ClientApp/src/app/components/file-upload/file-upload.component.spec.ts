import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileUploadComponent } from './file-upload.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared-modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
//import { MatTableExporterModule } from 'mat-table-exporter';

describe('FileUploadComponent', () => {
    let component: FileUploadComponent;
    let fixture: ComponentFixture<FileUploadComponent>;
    let fakeActivatedRoute = {
        snapshot: { data: { view: 'edit' }, params: [{ fileHistoryId: '234' }] }
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FileUploadComponent],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                MaterialModule,
                BrowserAnimationsModule,
                HttpClientModule
            ],
            providers: [
                { provide: ActivatedRoute, useValue: fakeActivatedRoute }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(FileUploadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('test ngOnInit is called', () => {
        jest.spyOn(component, 'ngOnInit').mockReturnThis();
        component.ngOnInit();
        expect(component.ngOnInit).toHaveBeenCalled();
    });
    it('test onGetFiles is called in ngOnInit', () => {
        const spy = jest.spyOn(component, 'onGetFiles').mockReturnThis();
        component.ngOnInit();
        expect(spy).toHaveBeenCalled();
    });

    //must changed to positive
    it('test onGetCurrentFile is called in ngOnInit', () => {
        const spy = jest.spyOn(component, 'onGetCurrentFile').mockReturnThis();
        component.isListFileData = true;
        component.view = 'edit';
        component.ngOnInit();
        expect(spy).not.toHaveBeenCalled();
    });
    it('test setViewMode edit mode', () => {
        fakeActivatedRoute.snapshot.data.view = 'edit';
        component.setViewMode();
        expect(component.viewState).toEqual(false);
        expect(component.formTitle).toEqual('Data Editor');
        expect(component.fileLabel).toEqual('Editing File');
    });
    it('test setViewMode view mode', () => {
        fakeActivatedRoute.snapshot.data.view = 'view';
        component.setViewMode();
        expect(component.viewState).toEqual(true);
        expect(component.formTitle).toEqual('Data Viewer');
        expect(component.fileLabel).toEqual('Viewing File');
    });
});
