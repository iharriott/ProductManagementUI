// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    api: 'http://localhost:4000',
    gitApiBaseUrl: 'https://prdmui.dv1.apstks.aks.aze1.cloud.geico.net',
    azureadClientid: 'eaffd59c-cc2d-4570-892a-7630be7c0a62',
    azureadTenantid: '7389d8c0-3607-465c-a69f-7d4426502912',
    postLogoutUrl: 'http://localhost:4200'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
