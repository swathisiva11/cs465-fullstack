import { Component, OnInit } from '@angular/core'; 
import { CommonModule } from '@angular/common'; 
// import { trips } from '../data/trips'; 
import { TripCardComponent } from '../trip-card/trip-card.component'; 

import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip'; 

import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service'; 

import { FormsModule } from '@angular/forms';

@Component({ 
  selector: 'app-trip-listing', 
  standalone: true, 
  imports: [CommonModule, TripCardComponent, FormsModule], 
  templateUrl: './trip-listing.component.html', 
  styleUrl: './trip-listing.component.css', 
  providers: [TripDataService]
}) 

export class TripListingComponent implements OnInit { 
  trips!: Trip[];
  message: String = '';

 /*  constructor(
    private tripDataService: TripDataService,
    private router: Router
  )  */

  constructor( 
    private tripDataService: TripDataService,
    private router: Router, 
    private authenticationService: AuthenticationService 
    ) {console.log('trip-listing constructor');} 
  
 
  public isLoggedIn() 
  { 
  return this.authenticationService.isLoggedIn(); 
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }
  
  /* constructor(private tripDataService: TripDataService) {
      console.log('trip-listing constructor');
  }  */

  private getStuff(): void{
    this.tripDataService.getTrips()
      .subscribe({
        next: (value: any) => {
          this.trips = value;
          if(value.length > 0)
          {
              this.message = 'There are ' + value.length + ' trips available. ';
          }
          else{
              this.message = 'There were no trips retrieved from the database';
          }

          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      })


  } 

  searchTerm: string = '';
  public searchTrips(): void {
  const trimmed = this.searchTerm.trim();

  if (!trimmed) {
    this.getStuff(); // Fallback to default if empty
    return;
  }

  this.tripDataService.searchTrips(trimmed)
    .subscribe({
      next: (results: Trip[]) => {
        this.trips = results;
        if (results.length > 0) {
          this.message = `Found ${results.length} trip(s) matching "${this.searchTerm}".`;
        } else {
          this.message = `No trips found for "${this.searchTerm}".`;
        }
      },
      error: (err) => {
        console.error('Search error:', err);
        this.message = 'An error occurred while searching.';
        this.trips = [];
      }
    });
}

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getStuff(); 
  }

 
} 