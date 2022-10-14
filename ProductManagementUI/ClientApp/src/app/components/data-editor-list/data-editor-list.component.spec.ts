import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEditorListComponent } from './data-editor-list.component';

describe('DataEditorListComponent', () => {
  let component: DataEditorListComponent;
  let fixture: ComponentFixture<DataEditorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataEditorListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataEditorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
