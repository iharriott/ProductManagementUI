import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiRevisionViewComponent } from './multi-revision-view.component';

describe('MultiRevisionViewComponent', () => {
  let component: MultiRevisionViewComponent;
  let fixture: ComponentFixture<MultiRevisionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiRevisionViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiRevisionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
