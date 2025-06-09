// Angular component that displays the top 5 searched trip terms
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

  //Initial fetch is made, and the data auto-refreshes every 10 seconds
    ngOnInit(): void {
      this.fetchTopSearches(); // Load initially
      // Refresh every 10 seconds (adjust as needed)
      setInterval(() => {
        this.fetchTopSearches();
        }, 10000); // 10,000 ms = 10 seconds
    }

// Method to fetch top searched terms from backend API
// Endpoint: GET /api/trips/topsearches
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

