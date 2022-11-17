import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacteristicsMultiViewComponent } from './characteristics-multi-view.component';

describe('CharacteristicsMultiViewComponent', () => {
  let component: CharacteristicsMultiViewComponent;
  let fixture: ComponentFixture<CharacteristicsMultiViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacteristicsMultiViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacteristicsMultiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
