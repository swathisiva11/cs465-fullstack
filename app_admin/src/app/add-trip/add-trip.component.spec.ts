// This spec file sets up a basic unit test for the AddTripComponent

// Import Angular testing utilities for component setup
// Import module to mock HTTP requests during testing
// Import the add trip component 
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule 
import { AddTripComponent } from './add-trip.component';

// Test suite for the AddTripComponent
describe('AddTripComponent', () => {
  let component: AddTripComponent;
  let fixture: ComponentFixture<AddTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTripComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
