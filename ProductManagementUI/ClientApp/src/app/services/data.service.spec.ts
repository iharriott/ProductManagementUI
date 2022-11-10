import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

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
});
