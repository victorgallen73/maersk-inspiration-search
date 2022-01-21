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

  searchInspirationFlights(criteria: Search) {
    // this.inspirationSearchService.getFlightDestinations(criteria.origin, criteria.departureDate, criteria.oneWay
    //   criteria.duration, criteria.nonStop, criteria.maxPrice);
    this.inspirationSearchService.getFlightDestinations(criteria.origin, '2017-12-25,2017-12-30', criteria.oneWay,
      '2,8', criteria.nonStop, criteria.maxPrice);
  }

}
