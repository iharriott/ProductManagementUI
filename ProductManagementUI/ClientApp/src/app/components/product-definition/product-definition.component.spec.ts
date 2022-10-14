import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDefinitionComponent } from './product-definition.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared-modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProductDefinitionComponent', () => {
    let component: ProductDefinitionComponent;
    let fixture: ComponentFixture<ProductDefinitionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductDefinitionComponent],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                MaterialModule,
                BrowserAnimationsModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ProductDefinitionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
