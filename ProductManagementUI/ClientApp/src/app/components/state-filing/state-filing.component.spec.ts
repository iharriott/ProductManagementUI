import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateFilingComponent } from './state-filing.component';

describe('StateFilingComponent', () => {
  let component: StateFilingComponent;
  let fixture: ComponentFixture<StateFilingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateFilingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateFilingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
