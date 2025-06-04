import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Include common for *ngIf and *ngFor

@Component({
  selector: 'app-top-searches',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-searches.component.html'
})
export class TopSearchesComponent implements OnInit {
  topSearches: any[] = [];

  constructor(private http: HttpClient) {}

  /* ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/api/trips/topsearches')
      .subscribe({
        next: data => {
          console.log('Top Searches:', data); // 🧪 See this in browser DevTools
          this.topSearches = data;
        },
        error: err => console.error('Error fetching top searches:', err)
      });
  } */

  ngOnInit(): void {
  this.fetchTopSearches(); // Load initially

  // Refresh every 10 seconds (adjust as needed)
  setInterval(() => {
    this.fetchTopSearches();
  }, 10000); // 10,000 ms = 10 seconds
}

fetchTopSearches(): void {
  this.http.get<any[]>('http://localhost:3000/api/trips/topsearches')
    .subscribe({
      next: data => {
        this.topSearches = data;
      },
      error: err => console.error('Error fetching top searches:', err)
    });
}



}

