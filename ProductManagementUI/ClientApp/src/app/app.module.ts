import { NgModule, NO_ERRORS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentModule } from './components/component.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { TokenInterceptorService } from './services/token-interceptor.service';
import {
    MsalModule,
    MSAL_CONFIG,
    MSAL_CONFIG_ANGULAR,
    MsalService,
    MsalAngularConfiguration
} from '@azure/msal-angular';

import { environment } from '../environments/environment';
import { Configuration } from 'msal';
import { AuthOptions, CacheOptions } from 'msal/lib-commonjs/Configuration';
import { ConfigurationService } from './configuration/configuration.service';

const appInitializerFn = (appConfig: ConfigurationService) => {
    return () => {
      return appConfig.loadConfig();      
    };    
  };

const isIE =
    window.navigator.userAgent.indexOf('MSIE') > -1 ||
    window.navigator.userAgent.indexOf('Trodemt') > -1;

export const protectedResourceMap: [string, string[]][] = [
    ['https://graph.microsoft.com/v1.0/me', ['user.read']],
    [
        'https://prdmui.dv1.apstks.aks.aze1.cloud.geico.net/GetProductDefinitions',
        [
            'https://geico365.onmicrosoft.com/51a4ee2d-27c4-425f-9542-b0f5117f00e1/user_impersonation'
        ]
    ]
];

export function loggerCallback(logLevel, message, piiEnabled) {
    console.log('client logging' + message);
}

let authOptions: AuthOptions = {
    clientId: 'eaffd59c-cc2d-4570-892a-7630be7c0a62',
    authority: `https://login.microsoftonline.com/7389d8c0-3607-465c-a69f-7d4426502912`,
    validateAuthority: true,
    redirectUri: 'http://localhost:4200',
    postLogoutRedirectUri: 'http://localhost:4200',
    navigateToLoginRequestUrl: true
};

let cacheOptions: CacheOptions = {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: isIE
};

let config: Configuration = { auth: authOptions, cache: cacheOptions };

function MSALConfigFactory(): Configuration {
    return {
        auth: {
            clientId: 'eaffd59c-cc2d-4570-892a-7630be7c0a62',
            authority:
                'https://login.microsoftonline.com/7389d8c0-3607-465c-a69f-7d4426502912',
            validateAuthority: true,
            redirectUri: environment.redirectUrl,
            postLogoutRedirectUri: environment.postLogoutUrl,
            navigateToLoginRequestUrl: true
        },
        cache: {
            cacheLocation: 'localStorage',
            storeAuthStateInCookie: isIE // set to true for IE 11
        }
    };
}

function MSALAngularConfigFactory(): MsalAngularConfiguration {
    return {
        popUp: !isIE,
        consentScopes: [
            'user.read',
            'openid',
            'profile',
            'https://geico365.onmicrosoft.com/51a4ee2d-27c4-425f-9542-b0f5117f00e1/user_impersonation'
        ],
        unprotectedResources: ['https://www.microsoft.com/en-us/'],
        protectedResourceMap: protectedResourceMap,
        extraQueryParameters: {}
    };
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ComponentModule,
        MsalModule
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [
        ConfigurationService,
        {
            provide: APP_INITIALIZER,
            useFactory: appInitializerFn,
            multi: true,
            deps: [ConfigurationService]
        },
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: { duration: 2500 }
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        },
        {
            provide: MSAL_CONFIG,
            useFactory: MSALConfigFactory
        },
        {
            provide: MSAL_CONFIG_ANGULAR,
            useFactory: MSALAngularConfigFactory
        },
        MsalService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
