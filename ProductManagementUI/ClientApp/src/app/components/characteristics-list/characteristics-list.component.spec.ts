import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacteristicsListComponent } from './characteristics-list.component';

describe('CharacteristicsListComponent', () => {
  let component: CharacteristicsListComponent;
  let fixture: ComponentFixture<CharacteristicsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacteristicsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacteristicsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
