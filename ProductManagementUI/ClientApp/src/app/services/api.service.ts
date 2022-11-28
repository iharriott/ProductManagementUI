import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { FactorFileContent } from '../components/interfaces/factor-file';
import { RateRevisions } from '../components/interfaces/rate-revisions';
import { DataService } from './data.service';
import { RatingChanges } from '../components/interfaces/rating-changes';
import { CharacteristicsDefinition } from '../components/interfaces/characteristicsDefinition';
import { CharacteristicsRoot } from '../components/interfaces/characteristic-detail';
import { BaseTableResponse } from '../components/interfaces/BaseTableResponse';

import { ProductSearch } from '../components/interfaces/product-search';
import { ProductDefinitionDetail } from '../components/interfaces/product-definition-detail';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    endpoint;
    baseUrl = environment.gitApiBaseUrl;
    constructor(private http: HttpClient, private dataService: DataService) {}

    getRatingTables(
        fileVersion: string,
        includeContent: boolean
    ): Observable<any> {
        const apiAction = 'GetRatingTables';
        const version = fileVersion ? fileVersion : this.encodeUri('CW');
        this.endpoint = `${this.baseUrl}/${apiAction}/${version}?includeContent=${includeContent}`;
        return this.http.get<any>(this.endpoint);
    }

    getRatingTablesFilter(
        fileVersion: string,
        includeContent: boolean,
        fileName?: string
    ): Observable<any> {
        const apiAction = 'GetRatingTables';
        const version = fileVersion ? fileVersion : this.encodeUri('CW');
        this.endpoint = `${this.baseUrl}/${apiAction}/${version}?includeContent=${includeContent}?ratingFactorFilter=${fileName}`;
        return this.http.get<any>(this.endpoint);
    }

    getRateFileHistory(
        fileName: string,
        includeContent: boolean
    ): Observable<RatingChanges> {
        const apiAction = 'GetRatingChanges';
        this.endpoint = `${this.baseUrl}/${apiAction}/${fileName}?includeContent=${includeContent}`;
        return this.http.get<RatingChanges>(this.endpoint);
    }

    GetProductsInFamilyAndState(
        inputData: ProductSearch
    ): Observable<BaseTableResponse> {
        const { lob } = inputData;
        const apiAction = 'GetProductsInFamilyAndState';
        this.endpoint = `${this.baseUrl}/${apiAction}?lob=${lob}`;
        return this.http.post<BaseTableResponse>(this.endpoint, {});
    }

    GetProductDefinitionsDetails(
        productFilter: string
    ): Observable<ProductDefinitionDetail> {
        const apiAction = 'GetProductDefinitionsDetails';
        this.endpoint = `${this.baseUrl}/${apiAction}?filter=${productFilter}`;
        return this.http.get<ProductDefinitionDetail>(this.endpoint);
    }

    getCharacteristicsDetails(
        characteristic: string,
        fileVersionId: string,
        includeContent: boolean
    ): Observable<CharacteristicsRoot> {
        const apiAction = 'GetCharacteristics';
        this.endpoint = `${this.baseUrl}/${apiAction}/${characteristic}?includeContent=${includeContent}`;
        return this.http.get<CharacteristicsRoot>(this.endpoint);
    }

    getProductDefinitionFamily(filter: string): Observable<any> {
        const apiAction = 'GetProductDefinitions';
        this.endpoint = `${this.baseUrl}/${apiAction}?filter=${filter}`;
        return this.http.get<any>(this.endpoint);
    }

    getCharacteristics(
        productDefinition: string,
        includeRefinement: boolean,
        includeValidation: boolean
    ): Observable<CharacteristicsDefinition> {
        const apiAction = 'GetProductDefinitionCharacteristics';
        this.endpoint = `${this.baseUrl}/${apiAction}/${productDefinition}?includeRefinement=${includeRefinement}&includeRefinement=${includeValidation}`;
        return this.http.get<CharacteristicsDefinition>(this.endpoint);
    }

    updateRatingFile(
        fileName: string,
        data: string,
        versionId: string,
        comment: string
    ): Observable<any> {
        console.log(data);
        const apiAction = 'UpdateRatingFile';
        this.endpoint = `${this.baseUrl}/${apiAction}/${versionId}/${fileName}`;
        return this.http.put(this.endpoint, {
            csvFileContent: data,
            comments: comment,
            author: this.dataService.getLoggedInUser()
        });
    }

    addNewRatingFile(
        fileName: string,
        data: string,
        comment: string
    ): Observable<any> {
        console.log(data);
        const apiAction = 'AddNewRatingFile';
        this.endpoint = `${this.baseUrl}/${apiAction}/${fileName}`;
        return this.http.put(this.endpoint, {
            csvFileContent: data,
            comments: comment,
            author: this.dataService.loggedInUser
        });
    }

    getRateRevisions(): Observable<RateRevisions> {
        const apiAction = 'GetProductDefinitions';
        this.endpoint = `${this.baseUrl}/${apiAction}`;
        return this.http.get<RateRevisions>(this.endpoint);
    }

    encodeUri(inputStr: string): string {
        return encodeURIComponent(inputStr);
    }

    getFileContent(
        fileName: string,
        fileVersionId: string
    ): Observable<FactorFileContent> {
        const apiAction = 'GetFileContent';
        this.endpoint = `${this.baseUrl}/${apiAction}/${fileName}/${fileVersionId}`;
        return this.http.get<FactorFileContent>(this.endpoint);
    }

    getComopany(): Observable<BaseTableResponse> {
        const apiAction = 'GetCompanies';
        this.endpoint = `${this.baseUrl}/${apiAction}`;
        return this.http.get<BaseTableResponse>(this.endpoint);
    }

    getLOB(): Observable<BaseTableResponse> {
        const apiAction = 'GetLOB';
        this.endpoint = `${this.baseUrl}/${apiAction}`;
        return this.http.get<BaseTableResponse>(this.endpoint);
    }

    GetProductFamilies(): Observable<BaseTableResponse> {
        const apiAction = 'GetProductFamilies';
        this.endpoint = `${this.baseUrl}/${apiAction}`;
        return this.http.get<BaseTableResponse>(this.endpoint);
    }

    getEnvironment(): Observable<BaseTableResponse> {
        const apiAction = 'GetProductStatuses';
        this.endpoint = `${this.baseUrl}/${apiAction}`;
        return this.http.get<BaseTableResponse>(this.endpoint);
    }
}
