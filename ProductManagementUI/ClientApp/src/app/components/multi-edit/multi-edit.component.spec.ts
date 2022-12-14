import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiEditComponent } from './multi-edit.component';

describe('MultiEditComponent', () => {
  let component: MultiEditComponent;
  let fixture: ComponentFixture<MultiEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
