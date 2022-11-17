import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacteristicViewComponent } from './characteristic-view.component';

describe('CharacteristicViewComponent', () => {
  let component: CharacteristicViewComponent;
  let fixture: ComponentFixture<CharacteristicViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacteristicViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacteristicViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
