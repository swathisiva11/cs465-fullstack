//This unit test ensures the LoginComponent can be instantiated properly in isolation
// Import Angular testing utilities
// Import the LoginComponent under test

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Test suite for the LoginComponent
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,             // standalone component
        HttpClientTestingModule     // fix for AuthenticationService → TripDataService → HttpClient
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

   // Basic test to confirm the component was created successfully
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
