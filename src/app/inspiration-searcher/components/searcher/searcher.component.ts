import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ViewByOptions } from '../../enumerations/view-by-options';
import { Search } from '../../models/search';

@Component({
  selector: 'mis-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit {

  formGroup!: FormGroup;
  @Output() searchEmitter: EventEmitter<Search> = new EventEmitter<Search>();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getOptions();
  }

  buildForm() {
    this.formGroup = this.fb.group({
      origin: [{initialValueIsDefault: ''}, Validators.required],
      departureDate: this.fb.group({
        departureStart: [{initialValueIsDefault: ''}],
        departureEnd: [{initialValueIsDefault: ''}],
      }),
      oneWay: [{initialValueIsDefault: false}],
      duration: this.fb.group({
        durationStart: [{initialValueIsDefault: ''}],
        durationEnd: [{initialValueIsDefault: ''}],
      }),
      nonStop: [{initialValueIsDefault: false}],
      maxPrice: [{initialValueIsDefault: 0}],
      viewBy: [{initialValueIsDefault: ''}],
    })
  }

  getOptions() {
    this.formGroup.setValue(ViewByOptions);
    // TODO: Call method to get IATA Codes of the cities
  }

  searchInspirationSearch(event?: KeyboardEvent) {
    if (event) {
      event.stopPropagation();
      if (event.key === 'Enter') {
        this.emitSearch();
        return;
      }
    }
    this.emitSearch();
  }

  emitSearch() {
    const query = this.formGroup.getRawValue();
    this.searchEmitter.emit(query);
  }

}
