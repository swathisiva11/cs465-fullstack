import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TripDataService } from './trip-data.service';
import { Trip } from '../models/trip'; 


// Define the test suite for the TripDataService
describe('TripDataService', () => {
  let service: TripDataService;  // Will hold the instance of the service under test
  let httpMock: HttpTestingController;   // Used to mock and inspect HTTP requests


  // Set up the test environment before each test runs
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TripDataService]
    });

    service = TestBed.inject(TripDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // Basic test to confirm the service was created successfully
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test the addTrip method to confirm it sends a POST request
  it('should add a trip', () => {
    const newTrip: Trip = {
      _id: '1',
      code: 'PAR-001',
      name: 'Paris Getaway',
      length: '5',
      start: new Date('2025-06-01'),
      resort: 'Eiffel View Resort',
      perPerson: '999',
      image: 'paris.jpg',
      description: 'Enjoy 5 days in the heart of Paris.'
    };

    service.addTrip(newTrip).subscribe((res) => {
      expect(res).toEqual(newTrip);
    });

    //const req = httpMock.expectOne('/api/trips');
    const req = httpMock.expectOne('http://localhost:3000/api/trips');

    expect(req.request.method).toBe('POST');
    req.flush(newTrip);
  });

  // Test the editTrip method to confirm it sends a PUT request
  it('should edit a trip', () => {
    const updatedTrip: Trip = {
      _id: '123',
      code: 'ROM-007',
      name: 'Roman Holiday',
      length: '7',
      start: new Date('2025-07-15'),
      resort: 'Colosseum Suites',
      perPerson: '1099',
      image: 'rome.jpg',
      description: 'Explore the ancient ruins of Rome.'
    };

    service.editTrip(updatedTrip).subscribe((res) => {
      expect(res).toEqual(updatedTrip);
    });

    const req = httpMock.expectOne(`/api/trips/${updatedTrip._id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTrip);
  });

  // Test the deleteTrip method to confirm it sends a DELETE request
  it('should delete a trip', () => {
    const tripId = '123';

    service.deleteTrip(tripId).subscribe((res) => {
      expect(res).toEqual({ success: true });
    });

    //const req = httpMock.expectOne(`/api/trips/${tripId}`);
    const req = httpMock.expectOne(`http://localhost:3000/api/trips/${tripId}`);

    expect(req.request.method).toBe('DELETE');
    req.flush({ success: true });
  });
});
