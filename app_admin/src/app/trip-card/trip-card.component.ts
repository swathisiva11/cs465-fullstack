import { Component, OnInit, Input } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service'; 

import { TripDataService } from '../services/trip-data.service';

@Component({ 
  selector: 'app-trip-card', 
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './trip-card.component.html', 
  styleUrl: './trip-card.component.css' 
}) 
export class TripCardComponent implements OnInit { 
  @Input('trip') trip: any; 

  //constructor(private router: Router) {} 

  constructor( 
    private router: Router, 
    private authenticationService: AuthenticationService,
    private tripService: TripDataService
    ) {} 
  
  ngOnInit(): void { 
  } 

  public isLoggedIn() 
  { 
  return this.authenticationService.isLoggedIn(); 
  }

  public editTrip(trip: Trip){
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  //On delete
  public onDelete(): void {
    if (confirm(`Are you sure you want to delete the trip "${this.trip.name}"?`)) {
      this.tripService.deleteTrip(this.trip.code).subscribe(() => {
        alert('Trip deleted successfully!');
        window.location.reload(); // Simple way to refresh the list
      });
    }
  }


} 
