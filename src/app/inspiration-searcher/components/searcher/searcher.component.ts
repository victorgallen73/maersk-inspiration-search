import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RangeType } from 'ngx-mat-range-slider';
import { debounceTime, distinctUntilChanged, filter, Observable, tap } from 'rxjs';
import { Airport, Airports } from '../../models/airports';
import { LIMIT_DAYS_AFTER_DEPARTURE_DATE, VIEW_BY_OPTIONS } from '../../models/constants';
import { Search } from '../../models/search';
import { FlightInspirationSearchService } from '../../services/flight-inspiration-search.service';

@Component({
  selector: 'mis-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit {

  airports$!: Observable<Airports>;
  viewBy: string[] = VIEW_BY_OPTIONS;

  formGroup: FormGroup = this.fb.group({
    origin: [{initialValueIsDefault: null}, Validators.required],
    departureDate: this.fb.group({
      departureStart: [{initialValueIsDefault: null}],
      departureEnd: [{initialValueIsDefault: null}],
    }),
    oneWay: [],
    duration: this.fb.group({
      min: [{initialValueIsDefault: null}],
      max: [{initialValueIsDefault: null}],
    }),
    nonStop: [],
    maxPrice: [''],
    viewBy: [{initialValueIsDefault: this.viewBy}],
  });

  @Output() searchEmitter: EventEmitter<Search> = new EventEmitter<Search>();

  constructor(
    private fb: FormBuilder,
    private inspirationSearchService: FlightInspirationSearchService
  ) { }

  ngOnInit(): void {
    this.getOptions();
    this.initObservables();
  }

  getOptions() {
    this.airports$ = this.inspirationSearchService.getAirports();
  }

  initObservables() {
    this.formGroup.get('oneWay')?.valueChanges.pipe().subscribe(selectedValue => {
      if (selectedValue) {
        this.formGroup.get('duration.min')?.reset();
        this.formGroup.get('duration.max')?.reset();
        this.formGroup.get('duration')?.disable();
        this.formGroup.get('viewBy')?.setValue('DATE');
      } else {
        this.formGroup.get('viewBy')?.setValue('DURATION');
      }
    });

    // Filter airports that includes the string value (if exists)
    this.formGroup.get('origin')?.valueChanges.pipe(
      debounceTime(500),
      filter((value) => value !== undefined && typeof value === 'string'),
      distinctUntilChanged( (prev: string, curr: string) => prev === curr),
      tap((query: string) => this.inspirationSearchService.loadAirports(query)),
    ).subscribe();

  }

  displayValue(airport: Airport) {
    return airport && airport.iata && airport.name ? airport.name + ' (' + airport.iata + ')': airport.iata;
  }

  rangeFilter = (date: Date): boolean => {
    let futureDate = new Date();
    let yesterday = new Date();
    futureDate.setDate(futureDate.getDate() + LIMIT_DAYS_AFTER_DEPARTURE_DATE);
    yesterday.setDate(yesterday.getDate() - 1);
    return date.getTime() > yesterday.getTime() && date.getTime() <= futureDate.getTime();
  };

  setValuesDuration(range: RangeType) {
    this.formGroup.get('duration.min')?.patchValue(range.min);
    this.formGroup.get('duration.max')?.patchValue(range.max);
  }

  searchInspirationFlights() {
    const formValues = this.formGroup.getRawValue();
    // TODO: parse values to bind them to the endpoint
    // let criteria: Search = new Search(formValues.origin? formValues.origin.iata: '', )
    this.searchEmitter.emit(formValues);
  }
}
