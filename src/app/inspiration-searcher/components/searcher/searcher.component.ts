import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RangeType } from 'ngx-mat-range-slider';
import { LIMIT_DAYS_AFTER_DEPARTURE_DATE, VIEW_BY_OPTIONS } from '../../models/constants';
import { Search } from '../../models/search';

@Component({
  selector: 'mis-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit {

  iataCodes: string[] = ['MAD','VLC','BAR'];
  viewBy: string[] = VIEW_BY_OPTIONS;
  // futureDayLimit: Date = new Date();

  formGroup: FormGroup = this.fb.group({
    origin: [{initialValueIsDefault: this.iataCodes}, Validators.required],
    departureDate: this.fb.group({
      departureStart: [{initialValueIsDefault: ''}],
      departureEnd: [{initialValueIsDefault: ''}],
    }),
    oneWay: [],
    duration: this.fb.group({
      min: [{initialValueIsDefault: 1}],
      max: [{initialValueIsDefault: 1}],
    }),
    nonStop: [],
    maxPrice: [{initialValueIsDefault: 0}],
    viewBy: [{initialValueIsDefault: this.viewBy}],
  });

  @Output() searchEmitter: EventEmitter<Search> = new EventEmitter<Search>();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getOptions();
    // this.setDepartureDatesLimits();
  }

  ngOnChanges() {
    this.formGroup.get('oneWay')?.valueChanges.pipe().subscribe(selectedValue => {
      if (selectedValue) {
        this.formGroup.get('minDuration')?.reset();
        this.formGroup.get('minDuration')?.disable();
        this.formGroup.get('maxDuration')?.reset();
        this.formGroup.get('maxDuration')?.disable();
        this.formGroup.get('viewBy')?.setValue('DATE');
      } else {
        this.formGroup.get('viewBy')?.setValue('DURATION');
      }
    });
  }

  buildForm() {
    this.formGroup = this.fb.group({
      origin: [{initialValueIsDefault: this.iataCodes}, Validators.required],
      departureDate: this.fb.group({
        departureStart: [{initialValueIsDefault: ''}],
        departureEnd: [{initialValueIsDefault: ''}],
      }),
      oneWay: [],
      duration: this.fb.group({
        min: [{initialValueIsDefault: 1}],
        max: [{initialValueIsDefault: 15}],
      }),
      nonStop: [],
      maxPrice: [{initialValueIsDefault: 0}],
      viewBy: [{initialValueIsDefault: this.viewBy}],
    })
  }

  getOptions() {
    // this.formGroup.get('origin')?.patchValue(ViewByOptions);
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

  setValuesDuration(range: RangeType) {
    this.formGroup.get('duration.min')?.patchValue(range.min);
    this.formGroup.get('duration.max')?.patchValue(range.max);
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
