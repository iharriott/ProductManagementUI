import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utils } from '../constants/utils';

@Injectable()
export class ConfigurationService {
  private configuration = {} as IServerConfiguration;

  constructor(private http: HttpClient) { }

  loadConfig() {
    return this.http.get<IServerConfiguration>(Utils.getBaseUrl() + 'configuration')
      .subscribe(
        result => { this.configuration = <IServerConfiguration>(result); 
            console.log('Clinet id' + this.configuration.ClientId);
            console.log('ProductMgmtAPIBaseURL' + this.configuration.ProductMgmtAPIBaseURL);},
        error => console.log(error));
  }

  get productMgmtAPIBaseURL() {
    return this.configuration.ProductMgmtAPIBaseURL;
  }

  get tenantId() {
    return this.configuration.TenantId;
  }

  get clientId() {
    return this.configuration.ClientId;
  }

  get authority() {
    return this.configuration.Authority;
  }

  get redirectUrl() {
    return this.configuration.RedirectUrl;
  }

  get postLogoutUrl() {
    return this.configuration.PostLogoutUrl;
  }

  get apiScope() {
    return this.configuration.ApiScope;
  }
}

export interface IServerConfiguration {
  ProductMgmtAPIBaseURL: string;
  TenantId: string;
  ClientId: string;
  Authority: string;
  RedirectUrl: string;
  PostLogoutUrl: string;
  ApiScope: string;
}
