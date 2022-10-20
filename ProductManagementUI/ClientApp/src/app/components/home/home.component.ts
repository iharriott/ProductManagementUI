import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    MsalBroadcastService,
    MsalGuardConfiguration,
    MsalService,
    MSAL_GUARD_CONFIG
} from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';
import { AzureActiveDirectoryService } from 'src/app/services/azure-active-directory.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    constructor(
        private router: Router,
        @Inject(MSAL_GUARD_CONFIG)
        private msalGuardConfig: MsalGuardConfiguration,
        private msalBroadCastService: MsalBroadcastService,
        private authService: MsalService,
        private azureAdService: AzureActiveDirectoryService
    ) {}

    isUserLoggedIn = false;
    private readonly _destroy = new Subject<void>();

    ngOnInit(): void {
        //debugger;
        //this.logout();
        this.msalBroadCastService.inProgress$
            .pipe(
                filter(
                    (interactionStatus: InteractionStatus) =>
                        interactionStatus == InteractionStatus.None
                ),
                takeUntil(this._destroy)
            )
            .subscribe(() => {
                this.isUserLoggedIn =
                    this.authService.instance.getAllAccounts().length > 0;
                this.azureAdService.isUserLoggedIn.next(this.isUserLoggedIn);
            });
    }

    login() {
        // this.router.navigate(['dashboard']);
        //debugger;
        if (this.msalGuardConfig.authRequest) {
            this.authService.loginRedirect({
                ...this.msalGuardConfig.authRequest
            } as RedirectRequest);
        } else {
            this.authService.loginRedirect();
        }
    }
    logout() {
        //this.router.navigate(['dashboard']);
        this.authService.logoutRedirect({
            postLogoutRedirectUri: environment.postLogoutUrl
        });
    }

    goToDashboard() {
        this.router.navigate(['dashboard']);
    }

    ngOnDestroy(): void {
        this._destroy.next(undefined);
        this._destroy.complete();
    }
}
