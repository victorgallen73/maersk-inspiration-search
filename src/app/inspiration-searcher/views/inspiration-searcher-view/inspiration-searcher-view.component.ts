import { Component, OnInit } from '@angular/core';
import { Search } from '../../models/search';

@Component({
  selector: 'mis-inspiration-searcher-view',
  templateUrl: './inspiration-searcher-view.component.html',
  styleUrls: ['./inspiration-searcher-view.component.scss']
})
export class InspirationSearcherViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  searchInspirationFlights(criteria: Search) {

  }

}
