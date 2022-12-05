import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidValuesComponent } from './valid-values.component';

describe('ValidValuesComponent', () => {
  let component: ValidValuesComponent;
  let fixture: ComponentFixture<ValidValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidValuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
