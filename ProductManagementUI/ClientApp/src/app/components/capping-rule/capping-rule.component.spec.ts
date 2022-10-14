import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CappingRuleComponent } from './capping-rule.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared-modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CappingRuleComponent', () => {
    let component: CappingRuleComponent;
    let fixture: ComponentFixture<CappingRuleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CappingRuleComponent],
            imports: [
                ReactiveFormsModule,
                FormsModule,
                MaterialModule,
                BrowserAnimationsModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CappingRuleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
