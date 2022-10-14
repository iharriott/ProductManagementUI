import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateRevisionComponent } from './rate-revision.component';

describe('RateRevisionComponent', () => {
  let component: RateRevisionComponent;
  let fixture: ComponentFixture<RateRevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateRevisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateRevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
