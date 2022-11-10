import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { BroadcastService, MsalService } from '@azure/msal-angular';
// import {
//     MsalBroadcastService,
//     MsalGuardConfiguration,
//     MsalService,
//     MSAL_GUARD_CONFIG
// } from '@azure/msal-angular';
// import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AzureActiveDirectoryService } from './services/azure-active-directory.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'product-definition';
    isUserLoggedIn: boolean = false;
    private readonly _destroy = new Subject<void>();
    constructor(
        private broadcastService: BroadcastService,
        private authService: MsalService // private msalGuardConfig: MsalGuardConfiguration, // @Inject(MSAL_GUARD_CONFIG) // private msalBroadCastService: MsalBroadcastService, // private authService: MsalService, // private azureAdService: AzureActiveDirectoryService
    ) {
        if (this.authService.getAccount()) {
            console.log(this.authService.getAccount());
            this.isUserLoggedIn = true;
            //this.goToDashboard();
        } else {
            this.isUserLoggedIn = false;
        }
    }

    ngOnInit(): void {
        // debugger;
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

    getAccount() {
        return this.authService.getAccount();
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

    ngOnDestroy(): void {
        this._destroy.next(undefined);
        this._destroy.complete();
    }

    login() {
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
        this.authService.logout();
        // this.authService.logoutRedirect({
        //     postLogoutRedirectUri: environment.postLogoutUrl
        // });
    }
}
