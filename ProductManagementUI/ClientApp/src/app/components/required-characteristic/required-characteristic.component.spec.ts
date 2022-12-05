import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredCharacteristicComponent } from './required-characteristic.component';

describe('RequiredCharacteristicComponent', () => {
  let component: RequiredCharacteristicComponent;
  let fixture: ComponentFixture<RequiredCharacteristicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequiredCharacteristicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequiredCharacteristicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
