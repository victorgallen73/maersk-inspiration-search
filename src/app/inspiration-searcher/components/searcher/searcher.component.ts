import { AfterContentInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import { RangeType } from 'ngx-mat-range-slider';
import { debounceTime, distinctUntilChanged, filter, Observable, tap } from 'rxjs';
import { Airport, Airports } from '../../models/airports';
import { LIMIT_DAYS_AFTER_DEPARTURE_DATE, VIEW_BY_OPTIONS } from '../../models/constants';
import { Search } from '../../models/search';
import { FlightInspirationSearchService } from '../../services/flight-inspiration-search.service';

@Component({
  selector: 'mis-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss'],
})
export class SearcherComponent implements OnInit, AfterContentInit {

  airports$!: Observable<Airports>;
  viewBy: string[] = VIEW_BY_OPTIONS;

  formGroup: FormGroup = this.fb.group({
    origin: [{initialValueIsDefault: null}, Validators.required],
    departureDate: this.fb.group({
      departureStart: [''],
      departureEnd: [''],
    }),
    oneWay: [false],
    duration: this.fb.group({
      min: [{initialValueIsDefault: null}],
      max: [{initialValueIsDefault: null}],
    }),
    nonStop: [false],
    maxPrice: [''],
    viewBy: [{initialValueIsDefault: 'DESTINATION'}],
  });

  @Output() searchEmitter: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private inspirationSearchService: FlightInspirationSearchService,
  ) { }


  ngOnInit(): void {
    this.getOptions();
    this.initObservables();
  }

  ngAfterContentInit(): void {
    // Set default value to viewBy form control
    this.formGroup.get('viewBy')?.setValue('DURATION');
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
    return airport && airport.iata && airport.name ? airport.name + ' (' + airport.iata + ')': airport.name;
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

  formatDepartureDate(startDate: Date, endDate: Date): string {
    const startDateFormatted = moment(startDate).format('YYYY-MM-DD');
    const endDateFormatted = moment(endDate).format('YYYY-MM-DD');
    return startDateFormatted + ',' + endDateFormatted;
  }

  searchInspirationFlights() {
    const formValues = this.formGroup.getRawValue();
    const departureDate: string = formValues.departureDate.departureStart && formValues.departureDate.departureEnd ?
      this.formatDepartureDate(formValues.departureDate.departureStart, formValues.departureDate.departureEnd) : '';
    const duration = formValues.duration && formValues.duration.min && formValues.duration.max ?
      formValues.duration.min + ',' + formValues.duration.max: '';

    const search = {
        origin: formValues.origin ? formValues.origin.iata : null,
        departureDate: departureDate !== '' ? departureDate : null,
        oneWay: formValues.oneWay,
        duration: duration !== '' ? duration : null,
        nonStop: formValues.nonStop,
        maxPrice: formValues.maxPrice !== '' ? formValues.maxPrice : null,
        viewBy: formValues.viewBy,
      }

    this.searchEmitter.emit(search);
  }
}
