import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    isUserLoggedIn = false;
    private readonly _destroy = new Subject<void>();
    loggedInUser!: string;

    constructor(
        private router: Router,
        private broadcastService: BroadcastService,
        private authService: MsalService,
        private dataService: DataService
    ) {
        if (this.authService.getAccount()) {
            this.isUserLoggedIn = true;
        } else {
            this.isUserLoggedIn = false;
        }
    }

    getAccount() {
        return this.authService.getAccount();
    }

    getLoggedInUser() {
        return this.dataService.getLoggedInUser();
    }

    ngOnInit(): void {     
        this.broadcastService.subscribe('msal:loginFailure', (payload) => {
            this.isUserLoggedIn = false;
        });

        this.broadcastService.subscribe('msal:loginSuccess', (payload) => {
            const userData = this.authService.getAccount();
            window.localStorage.setItem(
                'userIdentifier',
                userData.accountIdentifier
            );
            window.localStorage.setItem('userData', JSON.stringify(userData));
            window.localStorage.setItem('userName', userData.name);

            this.isUserLoggedIn = true;
            this.loggedInUser = userData.name;
            this.dataService.loggedInUser = this.loggedInUser;
            const tokenRequest = {
                scopes: [
                    this.dataService.getApiScope()
                ]
            };

            this.authService
                .acquireTokenSilent(tokenRequest)
                .then((response) => {
                    window.localStorage.setItem(
                        'access_token',
                        response.accessToken
                    );
                    console.log(
                        `access token retrieved ${response.accessToken}`
                    );
                });
        });
    }

    login() {
        this.authService.loginRedirect();
    }

    loginPopup() {
        this.authService.loginPopup();
    }

    logout() {
        this.authService.logout();
        window.localStorage.removeItem('userData');
        window.localStorage.removeItem('access_token');
        window.localStorage.removeItem('userIdentifier');
        window.localStorage.removeItem('userName');
    }

    goToDashboard() {
        this.router.navigate(['dashboard']);
    }

    goToSideNav() {
        this.router.navigate(['SideNav']);
    }

    ngOnDestroy(): void {
        this._destroy.next(undefined);
        this._destroy.complete();
    }
}
