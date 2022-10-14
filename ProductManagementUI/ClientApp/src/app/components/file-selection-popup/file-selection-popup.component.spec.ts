import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSelectionPopupComponent } from './file-selection-popup.component';

describe('FileSelectionPopupComponent', () => {
  let component: FileSelectionPopupComponent;
  let fixture: ComponentFixture<FileSelectionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileSelectionPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileSelectionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
