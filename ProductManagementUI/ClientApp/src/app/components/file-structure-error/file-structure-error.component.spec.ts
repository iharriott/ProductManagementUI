import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileStructureErrorComponent } from './file-structure-error.component';

describe('FileStructureErrorComponent', () => {
  let component: FileStructureErrorComponent;
  let fixture: ComponentFixture<FileStructureErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileStructureErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileStructureErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
