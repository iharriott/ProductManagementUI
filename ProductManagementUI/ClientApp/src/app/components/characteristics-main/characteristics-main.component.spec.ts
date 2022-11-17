import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacteristicsMainComponent } from './characteristics-main.component';

describe('CharacteristicsMainComponent', () => {
  let component: CharacteristicsMainComponent;
  let fixture: ComponentFixture<CharacteristicsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacteristicsMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacteristicsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
