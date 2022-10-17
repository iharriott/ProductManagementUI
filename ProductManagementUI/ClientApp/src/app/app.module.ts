import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentModule } from './components/component/component.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import {
    MsalGuard,
    MsalInterceptor,
    MsalModule,
    MsalRedirectComponent
} from '@azure/msal-angular';
import { environment } from '../environments/environment';
const isIE =
    window.navigator.userAgent.indexOf('MSIE') > -1 ||
    window.navigator.userAgent.indexOf('Trodemt') > -1;
@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ComponentModule,
        MsalModule.forRoot(
            new PublicClientApplication({
                auth: {
                    clientId: environment.azureadClientid,
                    redirectUri: 'http://localhost:4200',
                    authority: `https://login.microsoftonline.com/${environment.azureadTenantid}`
                },
                cache: {
                    cacheLocation: 'localStorage',
                    storeAuthStateInCookie: isIE
                }
            }),
            {
                interactionType: InteractionType.Redirect,
                authRequest: {
                    scopes: ['user.read']
                }
            },
            {
                interactionType: InteractionType.Redirect,
                protectedResourceMap: new Map([
                    ['https://graph.microsoft.com/v1.0/me', ['user.Read']]
                ])
            }
        )
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: { duration: 2500 }
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MsalInterceptor,
            multi: true
        },
        MsalGuard
    ],
    bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule {}
