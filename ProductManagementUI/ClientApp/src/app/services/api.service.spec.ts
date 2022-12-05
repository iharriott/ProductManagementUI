import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';

import { ApiService } from './api.service';
import { of } from 'rxjs';

describe('DataService', () => {
    let service: ApiService;
    let httpService: HttpClient;
    let dataService: DataService;
    let gitApiBaseUrl = 'https://pdmapi.dv1.apstks.aks.aze1.cloud.geico.net';

    beforeEach(() => {
        const httpClientSpy = {
            get: jest.fn(),
            put: jest.fn()
        };

        const dataServiceSpy = {
            getLoggedInUser: () => {
                return 'John Wayne';
            },
            loggedInUser: 'John Wayne'
        };

        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                {
                    provide: HttpClient,
                    useValue: httpClientSpy
                },
                {
                    provide: DataService,
                    useValue: dataServiceSpy
                }
            ]
        });
        service = TestBed.inject(ApiService);
        httpService = TestBed.inject(HttpClient);
        dataService = TestBed.inject(DataService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should test getRateRevisions', () => {
        const res = 'Technoworld';
        const apiAction = 'GetProductDefinitions';
        const endpoint = `${gitApiBaseUrl}/${apiAction}`;
        jest.spyOn(httpService, 'get').mockReturnValue(of(res));
        service.getRateRevisions();

        expect(httpService.get).toBeCalledTimes(1);
        expect(httpService.get).toHaveBeenCalledWith(endpoint);
    });

    it('should test getRatingTables', () => {
        const res = 'Technoworld';
        const apiAction = 'GetRatingTables';
        const fileVersion = 'CW';
        const includeContent = true;
        const endpoint = `${gitApiBaseUrl}/${apiAction}/${fileVersion}?includeContent=${includeContent}`;
        jest.spyOn(httpService, 'get').mockReturnValue(of(res));
        service.getRatingTables(fileVersion, includeContent);

        expect(httpService.get).toBeCalledTimes(1);
        expect(httpService.get).toHaveBeenCalledWith(endpoint);
    });

    // it('should test getRatingTablesFilter', () => {
    //     const res = 'Technoworld';
    //     const apiAction = 'GetRatingTables';
    //     const fileVersion = 'CW';
    //     const includeContent = true;
    //     const fileName = 'atfaultAccident';
    //     const endpoint = `${gitApiBaseUrl}/${apiAction}/${fileVersion}?includeContent=${includeContent}?ratingFactorFilter=${fileName}`;
    //     jest.spyOn(httpService, 'get').mockReturnValue(of(res));
    //     service.getRatingTablesFilter(fileVersion, includeContent, fileName);

    //     expect(httpService.get).toBeCalledTimes(1);
    //     expect(httpService.get).toHaveBeenCalledWith(endpoint);
    // });

    it('should test getRateFileHistory', () => {
        const res = 'Technoworld';
        const apiAction = 'GetRatingChanges';
        const includeContent = true;
        const fileName = 'atfaultAccident';
        const endpoint = `${gitApiBaseUrl}/${apiAction}/${fileName}?includeContent=${includeContent}`;
        jest.spyOn(httpService, 'get').mockReturnValue(of(res));
        service.getRateFileHistory(fileName, includeContent);

        expect(httpService.get).toBeCalledTimes(1);
        expect(httpService.get).toHaveBeenCalledWith(endpoint);
    });

    it('should test getFileContent', () => {
        const res = 'Technoworld';
        const apiAction = 'GetFileContent';
        const fileName = 'atfaultAccident';
        const fileVersion = 'CW';
        const endpoint = `${gitApiBaseUrl}/${apiAction}/${fileName}/${fileVersion}`;
        jest.spyOn(httpService, 'get').mockReturnValue(of(res));
        service.getFileContent(fileName, fileVersion);

        expect(httpService.get).toBeCalledTimes(1);
        expect(httpService.get).toHaveBeenCalledWith(endpoint);
    });

    it('should test updateRatingFile', () => {
        const res = 'Technoworld';
        const apiAction = 'UpdateRatingFile';
        const fileName = 'atfaultAccident';
        const fileVersion = 'CW';
        const data = 'my data';
        const comment = 'updating file';
        const endpoint = `${gitApiBaseUrl}/${apiAction}/${fileVersion}/${fileName}`;
        const dataObj = {
            csvFileContent: data,
            comments: comment,
            author: 'John Wayne'
        };
        jest.spyOn(httpService, 'put').mockReturnValue(of(res));
        const spy = jest.spyOn(dataService, 'getLoggedInUser');
        service.updateRatingFile(fileName, data, fileVersion, comment);

        expect(httpService.put).toBeCalledTimes(1);
        expect(spy).toBeCalledTimes(1);
        expect(httpService.put).toHaveBeenCalledWith(endpoint, dataObj);
    });

    it('should test addNewRatingFile', () => {
        const res = 'Technoworld';
        const apiAction = 'AddNewRatingFile';
        const fileName = 'atfaultAccident';
        const data = 'my data';
        const comment = 'updating file';
        const endpoint = `${gitApiBaseUrl}/${apiAction}/${fileName}`;
        const dataObj = {
            csvFileContent: data,
            comments: comment,
            author: 'John Wayne'
        };
        jest.spyOn(httpService, 'put').mockReturnValue(of(res));
        service.addNewRatingFile(fileName, data, comment);

        expect(httpService.put).toBeCalledTimes(1);
        expect(httpService.put).toHaveBeenCalledWith(endpoint, dataObj);
    });

    it('should test encodeUri', () => {
        const filePath = 'RatingFactors/Tables/AtFaultAccidentFactors.csv';
        const encodedPath = encodeURIComponent(filePath);
        const returnEncodedPath = service.encodeUri(filePath);
        expect(encodedPath).toEqual(returnEncodedPath);
    });

    it('should test getComopany', () => {
        const res = 'Technoworld';
        const apiAction = 'GetCompanies';
        const endpoint = `${gitApiBaseUrl}/${apiAction}`;
        jest.spyOn(httpService, 'get').mockReturnValue(of(res));
        service.getComopany();

        expect(httpService.get).toBeCalledTimes(1);
        expect(httpService.get).toHaveBeenCalledWith(endpoint);
    });

    it('should test getLOB', () => {
        const res = 'Technoworld';
        const apiAction = 'GetLOB';
        const endpoint = `${gitApiBaseUrl}/${apiAction}`;
        jest.spyOn(httpService, 'get').mockReturnValue(of(res));
        service.getLOB();

        expect(httpService.get).toBeCalledTimes(1);
        expect(httpService.get).toHaveBeenCalledWith(endpoint);
    });

    it('should test GetProductFamilies', () => {
        const res = 'Technoworld';
        const apiAction = 'GetProductFamilies';
        const endpoint = `${gitApiBaseUrl}/${apiAction}`;
        jest.spyOn(httpService, 'get').mockReturnValue(of(res));
        service.GetProductFamilies();

        expect(httpService.get).toBeCalledTimes(1);
        expect(httpService.get).toHaveBeenCalledWith(endpoint);
    });

    it('should test getEnvironment', () => {
        const res = 'Technoworld';
        const apiAction = 'GetProductStatuses';
        const endpoint = `${gitApiBaseUrl}/${apiAction}`;
        jest.spyOn(httpService, 'get').mockReturnValue(of(res));
        service.getEnvironment();

        expect(httpService.get).toBeCalledTimes(1);
        expect(httpService.get).toHaveBeenCalledWith(endpoint);
    });
});
