import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, tap } from 'rxjs';
import { CurrencyDictionary } from '../../models/currency-dictionary';
import { FlightDestination } from '../../models/flight-destination';
import { LocationDictionary } from '../../models/location-dictionary';
import { FlightInspirationSearchService } from '../../services/flight-inspiration-search.service';

@Component({
  selector: 'mis-flight-inspiration-table',
  templateUrl: './flight-inspiration-table.component.html',
  styleUrls: ['./flight-inspiration-table.component.scss']
})
export class FlightInspirationTableComponent implements OnInit, AfterViewInit {

  @Input() dataSource!: FlightDestination[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['destination', 'departureDate', 'returnDate', 'price'];
  matTableDataSource!: MatTableDataSource<FlightDestination>;

  currencyTranslate = { currency: 'EUR' };
  currencies$!: Observable<CurrencyDictionary>;
  locations$!: Observable<LocationDictionary>;

  constructor(
    private inspirationFlightService: FlightInspirationSearchService
    ) {
      this.matTableDataSource = new MatTableDataSource(this.dataSource);
    }

  ngOnInit(): void {
    this.currencies$ = this.inspirationFlightService.getCurrencies().pipe(
      tap((currencies: CurrencyDictionary) => this.currencyTranslate = { currency: currencies.entries().next().value})
    );
    // TODO: Parse 3-letter code of the location with its complete name using location observable
    this.locations$ = this.inspirationFlightService.getLocations();
  }

  ngAfterViewInit() {
    this.matTableDataSource.paginator = this.paginator;
  }
}
