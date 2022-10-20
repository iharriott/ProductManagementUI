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
                    // clientId: environment.azureadClientid,
                    clientId: 'eaffd59c-cc2d-4570-892a-7630be7c0a62',
                    //clientId: '2d5dcb58-1625-4e09-9022-bfb6deccc403',
                    redirectUri: 'http://localhost:4200',
                    //redirectUri: 'https://google.com',
                    // authority: `https://login.microsoftonline.com/${environment.azureadTenantid}`
                    authority: `https://login.microsoftonline.com/7389d8c0-3607-465c-a69f-7d4426502912`
                    //authority: `https://login.microsoftonline.com/common`
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
            // useClass: TokenInterceptorService,
            multi: true
        },
        MsalGuard
    ],
    bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule {}
