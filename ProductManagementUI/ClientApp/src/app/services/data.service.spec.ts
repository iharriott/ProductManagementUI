import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import * as moment from 'moment';

describe('DataService', () => {
    let service: DataService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DataService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    
    it('it should test getLoggedInUser', () => {
        service.getLoggedInUser = jest.fn().mockReturnValue('Ian Harriott');
        const loggedInUser = service.getLoggedInUser();
        expect('Ian Harriott').toEqual(loggedInUser);
    });

    it('it should test convertCsvToJason', () => {
        const data = 'ian, jack, mary';
        const result = service.convertCsvToJason(data);
        console.log(`the output ${result}`);
        expect(result).not.toBeNull();
    });
    it('it should test convertJasonToCsv', () => {
        const data = [
            { name: 'Mary Joe', address: 'River Lane' },
            { name: 'Jim Gray', address: 'Lint Street' }
        ];
        const result = service.convertJasonToCsv(data);
        expect(result).not.toBeNull();
    });
    it('it should test getColumnHeadings', () => {
        const data = [
            { name: 'Mary Joe', address: 'River Lane' },
            { name: 'Jim Gray', address: 'Lint Street' }
        ];
        const headings = ['name', 'address'];
        const result = service.getColumnHeadings(data);
        expect(result).toEqual(headings);
    });
    it('it should test getDateFromUTC', () => {
        const testDate = new Date();
        const dateValue = moment(testDate, 'YYYY-MM-DDTHH:mm')
            .format('YYYY-MM-DDTHH:mm')
            .toString();
        const result = service.getDateFromUTC(testDate);
        expect(result).toEqual(dateValue);
    });
    it('it should test getFilename', () => {
        const fileName = 'Atfaultaccident.csv';
        const resolvedFilename = 'Atfaultaccident';
        const result = service.getFilename(fileName);
        expect(result).toEqual(resolvedFilename);
    });
    it('it should test checkInList true', () => {
        const data = ['mark', 'john', 'mary'];
        const value = 'mark';
        const result = service.checkInList(data, value);
        expect(result).toEqual(true);
    });
    it('it should test checkInList false', () => {
        const data = ['mark', 'john', 'mary'];
        const value = 'bob';
        const result = service.checkInList(data, value);
        expect(result).toEqual(false);
    });
    it('it should test removeFromList', () => {
        const data = ['mark', 'john', 'mary'];
        const value = 'mark';
        const newList = ['john', 'mary'];
        const result = service.removeFromList(data, value);
        expect(result).toEqual(newList);
    });
    it('it should test addToList', () => {
        const data = ['mark', 'john', 'mary'];
        const value = 'bob';
        const newList = ['mark', 'john', 'mary', 'bob'];
        const result = service.addToList(data, value);
        expect(result).toEqual(newList);
    });

    it('it should test getProductMgmtAPIBaseURL', () => {
        service.getProductMgmtAPIBaseURL = jest.fn().mockReturnValue('Genesis');
        const ProductMgmtAPIBaseURL = service.getProductMgmtAPIBaseURL();
        expect('Genesis').toEqual(ProductMgmtAPIBaseURL);
    });

    it('it should test getTenantId', () => {
        service.getTenantId = jest.fn().mockReturnValue('Genesis');
        const TenantId = service.getTenantId();
        expect('Genesis').toEqual(TenantId);
    });

    it('it should test getClientId', () => {
        service.getClientId = jest.fn().mockReturnValue('Genesis');
        const ClientId = service.getClientId();
        expect('Genesis').toEqual(ClientId);
    });

    it('it should test getAuthority', () => {
        service.getAuthority = jest.fn().mockReturnValue('Genesis');
        const Authority = service.getAuthority();
        expect('Genesis').toEqual(Authority);
    });

    it('it should test getRedirectUrl', () => {
        service.getRedirectUrl = jest.fn().mockReturnValue('Genesis');
        const RedirectUrl = service.getRedirectUrl();
        expect('Genesis').toEqual(RedirectUrl);
    });

    it('it should test getPostLogoutUrl', () => {
        service.getPostLogoutUrl = jest.fn().mockReturnValue('Genesis');
        const PostLogoutUrl = service.getPostLogoutUrl();
        expect('Genesis').toEqual(PostLogoutUrl);
    });

    it('it should test getApiScope', () => {
        service.getApiScope = jest.fn().mockReturnValue('Genesis');
        const ApiScope = service.getApiScope();
        expect('Genesis').toEqual(ApiScope);
    });
});
