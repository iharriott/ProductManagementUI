import { Component, OnDestroy, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'product-definition';
    isUserLoggedIn: boolean = false;
    private readonly _destroy = new Subject<void>();
    constructor(private authService: MsalService) {
        if (this.authService.getAccount()) {
            console.log(this.authService.getAccount());
            this.isUserLoggedIn = true;
        } else {
            this.isUserLoggedIn = false;
        }
    }

    ngOnInit(): void {}

    getAccount() {
        return this.authService.getAccount();
    }

    loginPopup() {
        this.authService.loginPopup();
    }

    ngOnDestroy(): void {
        this._destroy.next(undefined);
        this._destroy.complete();
    }

    login() {}

    logout() {
        this.authService.logout();
    }
}
