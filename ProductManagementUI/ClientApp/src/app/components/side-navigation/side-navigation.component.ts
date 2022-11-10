import { BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-side-navigation',
    templateUrl: './side-navigation.component.html',
    styleUrls: ['./side-navigation.component.css']
})
export class SideNavigationComponent implements AfterViewInit {
    @ViewChild(MatSidenav)
    sidenav!: MatSidenav;
    // eslint-disable-next-line no-unused-vars
    constructor(
        private observer: BreakpointObserver,
        private router: Router,
        private route: ActivatedRoute,
        private httpClient: HttpClient
    ) {}

    ngAfterViewInit() {
        this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
            if (res.matches) {
                this.sidenav.mode = 'over';
                this.sidenav.close();
            } else {
                this.sidenav.mode = 'side';
                this.sidenav.open();
            }
        });
    }

    onNavigateDashboard() {
        this.httpClient
            .get('https://graph.microsoft.com/v1.0/me')
            .subscribe((resp) => {
                const respone = JSON.stringify(resp);
            });

        // this.httpClient
        //     .get(
        //         'https://prdmui.dv1.apstks.aks.aze1.cloud.geico.net/GetRateRevisions'
        //     )
        //     .subscribe((resp) => {
        //         const respone = JSON.stringify(resp);
        //     });

        // debugger;
        // console.log(this.route);
        // this.router.navigate(['revision'], { relativeTo: this.route });
    }
}
