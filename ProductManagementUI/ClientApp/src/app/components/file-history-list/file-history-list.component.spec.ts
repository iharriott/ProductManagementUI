import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileHistoryListComponent } from './file-history-list.component';

describe('FileHistoryListComponent', () => {
    let component: FileHistoryListComponent;
    let fixture: ComponentFixture<FileHistoryListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FileHistoryListComponent],
            imports: [],
            providers: []
        }).compileComponents();

        fixture = TestBed.createComponent(FileHistoryListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
