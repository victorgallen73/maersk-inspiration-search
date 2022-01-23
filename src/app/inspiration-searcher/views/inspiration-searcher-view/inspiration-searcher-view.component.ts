import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FlightDestinations } from '../../models/flight-destination';
import { Search } from '../../models/search';
import { FlightInspirationSearchService } from '../../services/flight-inspiration-search.service';

@Component({
  selector: 'mis-inspiration-searcher-view',
  templateUrl: './inspiration-searcher-view.component.html',
  styleUrls: ['./inspiration-searcher-view.component.scss']
})
export class InspirationSearcherViewComponent implements OnInit {
  flights$!: Observable<FlightDestinations>;

  constructor(
    private inspirationSearchService: FlightInspirationSearchService
  ) { }

  ngOnInit(): void {
  }

  searchInspirationFlights(search: Search) {
    this.flights$ = this.inspirationSearchService.getFlightDestinations();
    this.inspirationSearchService.searchFlightDestinations(search);
  }

}
