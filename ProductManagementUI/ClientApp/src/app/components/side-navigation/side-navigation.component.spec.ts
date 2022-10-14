import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideNavigationComponent } from './side-navigation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from '../../app-routing.module';
import { APP_BASE_HREF } from '@angular/common';

describe('SideNavigationComponent', () => {
    let component: SideNavigationComponent;
    let fixture: ComponentFixture<SideNavigationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SideNavigationComponent],
            imports: [
                MatSidenavModule,
                MatToolbarModule,
                BrowserAnimationsModule,
                MatDividerModule,
                MatIconModule,
                AppRoutingModule
            ],
            providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
        }).compileComponents();

        fixture = TestBed.createComponent(SideNavigationComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
