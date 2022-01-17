import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LIMIT_DAYS_AFTER_DEPARTURE_DATE } from '../../models/constants';
import { Search } from '../../models/search';
import { ViewByOptions } from '../../models/view-by-options';

@Component({
  selector: 'mis-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit {

  formGroup!: FormGroup;
  iataCodes: string[] = ['MAD','VLC','BAR'];
  // futureDayLimit: Date = new Date();

  @Output() searchEmitter: EventEmitter<Search> = new EventEmitter<Search>();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getOptions();
    // this.setDepartureDatesLimits();
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
    this.formGroup.get('origin')?.patchValue(ViewByOptions);
    // TODO: Call method to get IATA Codes of the cities
  }

  // setDepartureDatesLimits(): void {
  //   this.futureDayLimit.setDate(this.futureDayLimit.getDate() + LIMIT_DAYS_AFTER_DEPARTURE_DATE);
  // }

  rangeFilter = (date: Date): boolean => {
    let futureDate = new Date();
    let yesterday = new Date();
    futureDate.setDate(futureDate.getDate() + LIMIT_DAYS_AFTER_DEPARTURE_DATE);
    yesterday.setDate(yesterday.getDate() - 1);
    return date.getTime() > yesterday.getTime() && date.getTime() <= futureDate.getTime();
  };

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
