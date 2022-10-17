import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { GitResult } from '../components/interfaces/git-result';
import { Branch } from '../components/interfaces/branch';
import { FileHistory } from '../components/interfaces/file-history';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    endpoint;
    baseUrl = environment.gitApiBaseUrl;
    constructor(private http: HttpClient) {}

    getRatingTables(branch: string): Observable<GitResult> {
        const apiAction = 'GetRatingTables';
        const version = branch ? branch : this.encodeUri('master');
        const includeContent = true;
        this.endpoint = `${this.baseUrl}/${apiAction}/${version}?includeContent=${includeContent}`;
        return this.http.get<GitResult>(this.endpoint);
    }

    getRateFileHistory(
        branch: string,
        fileId: string
    ): Observable<FileHistory> {
        const apiAction = 'GetRatingChanges';
        const version = branch ? branch : this.encodeUri('master');
        fileId = this.encodeUri(fileId);
        const includeContent = true;
        this.endpoint = `${this.baseUrl}/${apiAction}/${version}/${fileId}?includeContent=${includeContent}`;
        return this.http.get<FileHistory>(this.endpoint);
    }

    updateRatingFile(
        path: string,
        data: string,
        branch: string,
        comment: string
    ): Observable<any> {
        //debugger;
        console.log(data);
        const apiAction = 'UpdateRatingFile';
        const branchName = this.encodeUri(branch);
        const filePath = this.encodeUri(path);
        this.endpoint = `${this.baseUrl}/${apiAction}/${branchName}/${filePath}`;
        return this.http.put(this.endpoint, {
            csvFileContent: data,
            comments: comment
        });
    }

    addNewRatingFile(
        path: string,
        data: string,
        branch: string,
        comment: string
    ): Observable<any> {
        //debugger;
        console.log(data);
        const apiAction = 'AddNewRatingFile';
        const branchName = this.encodeUri(branch);
        const filePath = this.encodeUri(path);
        this.endpoint = `${this.baseUrl}/${apiAction}/${branchName}/${filePath}`;
        return this.http.put(this.endpoint, {
            csvFileContent: data,
            comments: comment
        });
    }

    getAllBranches(): Observable<Branch> {
        const apiAction = 'GetRateRevisions';
        this.endpoint = `${this.baseUrl}/${apiAction}`;
        return this.http.get<Branch>(this.endpoint);
    }

    encodeUri(inputStr: string): string {
        return encodeURIComponent(inputStr);
    }

    getRatingFileContent(
        branch: string,
        inputfileId: string,
        fileHistoryId: string
    ): Observable<any> {
        const apiAction = 'GetRatingFileContent';
        const version = branch ? branch : 'master';
        const fileId = this.encodeUri(inputfileId);
        this.endpoint = `${this.baseUrl}/${apiAction}/${version}/${fileId}/?fileHistoryId=${fileHistoryId}`;
        return this.http.get<any>(this.endpoint);
    }

    // handleError(error: Response) {
    //     if (error.status == 500) {
    //       this.router.navigate(['/login']);
    //     } else {
    //       return throwError(error);
    //     }
    // }

    getAllData(url: string): Observable<any[]> {
        this.endpoint = `${environment.api}/${url}/`;
        return this.http.get<any[]>(this.endpoint);
    }

    getDataById(url: string, id: number): Observable<any[]> {
        this.endpoint = `${environment.api}/${url}/${id}`;
        console.log(`this endpoint ${this.endpoint}`);
        return this.http.get<any[]>(this.endpoint);
    }

    createData(url: string, data: any) {
        this.endpoint = `${environment.api}/${url}/`;
        return this.http.post<any>(this.endpoint, data);
    }

    updateRow(url: string, data: any, id: number) {
        this.endpoint = `${environment.api}/${url}/`;
        return this.http.put<any>(this.endpoint + id, data);
    }

    deleteRow(url: string, id: number) {
        this.endpoint = `${environment.api}/${url}/`;
        return this.http.delete<any>(this.endpoint + id);
    }
}
