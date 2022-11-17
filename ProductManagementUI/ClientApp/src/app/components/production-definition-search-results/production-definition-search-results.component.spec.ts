import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionDefinitionSearchResultsComponent } from './production-definition-search-results.component';

describe('ProductionDefinitionSearchResultsComponent', () => {
  let component: ProductionDefinitionSearchResultsComponent;
  let fixture: ComponentFixture<ProductionDefinitionSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionDefinitionSearchResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionDefinitionSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
