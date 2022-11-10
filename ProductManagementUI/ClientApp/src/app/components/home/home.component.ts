import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import {
//     MsalBroadcastService,
//     MsalGuardConfiguration,
//     MsalService,
//     MSAL_GUARD_CONFIG
// } from '@azure/msal-angular';
// import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { filter, Subject, Subscription, takeUntil } from 'rxjs';
import { AzureActiveDirectoryService } from 'src/app/services/azure-active-directory.service';
import { environment } from 'src/environments/environment';
import { BroadcastService, MsalService } from '@azure/msal-angular';
import { DataService } from 'src/app/services/data.service';
import { AuthenticationParameters } from 'msal';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    isUserLoggedIn = false;
    private readonly _destroy = new Subject<void>();
    private subscription!: Subscription;
    loggedInUser!: string;
    //authParams: AuthenticationParameters
    // constructor(
    //     private router: Router,
    //     @Inject(MSAL_GUARD_CONFIG)
    //     private msalGuardConfig: MsalGuardConfiguration,
    //     private msalBroadCastService: MsalBroadcastService,
    //     private authService: MsalService,
    //     private azureAdService: AzureActiveDirectoryService
    // ) {}
    constructor(
        private router: Router,
        private broadcastService: BroadcastService,
        private authService: MsalService,
        private route: ActivatedRoute,
        private dataService: DataService
    ) {
        if (this.authService.getAccount()) {
            console.log(this.authService.getAccount());
            this.isUserLoggedIn = true;
            //this.goToDashboard();
        } else {
            this.isUserLoggedIn = false;
        }
    }

    getAccount() {
        return this.authService.getAccount();
    }

    getLoggedInUser() {
        //return window.localStorage.getItem('userName');
        return this.dataService.getLoggedInUser();
    }

    ngOnInit(): void {
        // debugger;
        console.log(`route in home ${this.route}`);
        this.broadcastService.subscribe('msal:loginFailure', (payload) => {
            console.log('login failure');
            this.isUserLoggedIn = false;
        });

        this.broadcastService.subscribe('msal:loginSuccess', (payload) => {
            console.log('login success');
            const userData = this.authService.getAccount();
            console.log(
                'getUser ' + JSON.stringify(this.authService.getAccount())
            );
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
                    //'user.read',
                    'https://geico365.onmicrosoft.com/51a4ee2d-27c4-425f-9542-b0f5117f00e1/user_impersonation'
                ]
            };

            this.authService
                .acquireTokenSilent(tokenRequest)
                .then((response) => {
                    // get access token from response
                    window.localStorage.setItem(
                        'access_token',
                        response.accessToken
                    );
                    console.log(
                        `access token retrieved ${response.accessToken}`
                    );
                });

            // this.goToDashboard();
            //this.goToSideNav();
        });
        //this.logout();
        // this.msalBroadCastService.inProgress$
        //     .pipe(
        //         filter(
        //             (interactionStatus: InteractionStatus) =>
        //                 interactionStatus == InteractionStatus.None
        //         ),
        //         takeUntil(this._destroy)
        //     )
        //     .subscribe(() => {
        //         this.isUserLoggedIn =
        //             this.authService.instance.getAllAccounts().length > 0;
        //         this.azureAdService.isUserLoggedIn.next(this.isUserLoggedIn);
        //     });
    }

    login() {
        this.authService.loginRedirect();
        // this.router.navigate(['dashboard']);
        //debugger;
        // if (this.msalGuardConfig.authRequest) {
        //     this.authService.loginRedirect({
        //         ...this.msalGuardConfig.authRequest
        //     } as RedirectRequest);
        // } else {
        //     this.authService.loginRedirect();
        // }
    }

    loginPopup() {
        this.authService.loginPopup();
        // this.router.navigate(['dashboard']);
        //debugger;
        // if (this.msalGuardConfig.authRequest) {
        //     this.authService.loginRedirect({
        //         ...this.msalGuardConfig.authRequest
        //     } as RedirectRequest);
        // } else {
        //     this.authService.loginRedirect();
        // }
    }

    logout() {
        //debugger;
        this.authService.logout();
        window.localStorage.removeItem('userData');
        window.localStorage.removeItem('access_token');
        window.localStorage.removeItem('userIdentifier');
        window.localStorage.removeItem('userName');
        //this.authService.
        //this.router.navigate(['dashboard']);
        // this.authService.logoutRedirect({
        //     postLogoutRedirectUri: environment.postLogoutUrl
        // });
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
