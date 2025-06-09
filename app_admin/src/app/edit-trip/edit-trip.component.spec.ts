//This test ensures the EditTripComponent initializes correctly
// Import Angular testing utilities for creating and working with components
// Import mock HTTP module to avoid real backend calls during testing
// Import the Edit Trip component being tested

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule 
import { EditTripComponent } from './edit-trip.component';

// Define the test suite for EditTripComponent
describe('EditTripComponent', () => {
  let component: EditTripComponent;
  let fixture: ComponentFixture<EditTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTripComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   // Basic unit test to verify the component initializes successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
