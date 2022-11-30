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

  let envConfig: any = {
      configValues: {}
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
        window.localStorage.setItem('ProductMgmtAPIBaseURL', envConfig.configValues.ProductMgmtAPIBaseURL);
        window.localStorage.setItem('TenantId', envConfig.configValues.TenantId);
        window.localStorage.setItem('Clinetid', envConfig.configValues.ClientId);
        window.localStorage.setItem('Authority', envConfig.configValues.Authority);
        window.localStorage.setItem('RedirectUrl', envConfig.configValues.RedirectUrl);
        window.localStorage.setItem('PostLogoutUrl', envConfig.configValues.PostLogoutUrl);
        window.localStorage.setItem('ApiScope', envConfig.configValues.ApiScope); 


    return {
        auth: {
            clientId: envConfig.configValues.ClientId,
            authority: envConfig.configValues.Authority,
            validateAuthority: true,
            redirectUri: envConfig.configValues.RedirectUrl,
            postLogoutRedirectUri: envConfig.configValues.PostLogoutUrl,
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
        {
            provide: APP_INITIALIZER,
            useFactory: () => {
               return () => {
                console.log('Starting APP_INITIALIZER');
                return fetch(environment.uiBaseUrl + '/configuration')
               .then(response => response.json())
               .then(json => { 
               envConfig.configValues = json;
              });
            };
            },
            multi: true            
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
