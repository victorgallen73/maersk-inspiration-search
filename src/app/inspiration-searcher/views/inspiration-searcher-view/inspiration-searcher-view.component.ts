import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, tap } from 'rxjs';
import { FlightDestination } from '../../models/flight-destination';
import { Search } from '../../models/search';
import { FlightInspirationSearchService } from '../../services/flight-inspiration-search.service';

@Component({
  selector: 'mis-inspiration-searcher-view',
  templateUrl: './inspiration-searcher-view.component.html',
  styleUrls: ['./inspiration-searcher-view.component.scss']
})
export class InspirationSearcherViewComponent implements OnInit {
  flights$!: Observable<FlightDestination[]>;
  dataSource = new MatTableDataSource<FlightDestination>();

  constructor(
    private inspirationSearchService: FlightInspirationSearchService
  ) { }

  ngOnInit(): void {
  }

  searchInspirationFlights(search: Search) {
    this.flights$ = this.inspirationSearchService.getFlightDestinations().pipe(
      tap((flights: FlightDestination[]) => this.dataSource = new MatTableDataSource(flights))
    );
    this.inspirationSearchService.searchFlightDestinations(search);
  }

}
