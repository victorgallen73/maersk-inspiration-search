import { Component, OnInit } from '@angular/core';
import { Search } from '../../models/search';
import { FlightInspirationSearchService } from '../../services/flight-inspiration-search.service';

@Component({
  selector: 'mis-inspiration-searcher-view',
  templateUrl: './inspiration-searcher-view.component.html',
  styleUrls: ['./inspiration-searcher-view.component.scss']
})
export class InspirationSearcherViewComponent implements OnInit {

  constructor(
    private inspirationSearchService: FlightInspirationSearchService
  ) { }

  ngOnInit(): void {
  }

  searchInspirationFlights(search: Search) {
    this.inspirationSearchService.searchFlightDestinations(search);
  }

}
