import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable, ReplaySubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Airports } from '../models/airports';
import { FlightDestinations } from '../models/flight-destination';
import { Search } from '../models/search';

@Injectable({
  providedIn: 'root'
})
export class FlightInspirationSearchService {

  private baseURL: string = environment.apiURL;

  private airports: ReplaySubject<Airports> = new ReplaySubject<Airports>(1);
  private flights: ReplaySubject<FlightDestinations> = new ReplaySubject<FlightDestinations>(1);

  constructor(private httpClient: HttpClient) { }

  loadAirports(query?: string): void {
    this.httpClient.get("assets/iata-codes.json").pipe(
      map((airports: any) => JSON.stringify(airports)),
      map((airports: string) => JSON.parse(airports)),
      map((airports: Airports) => query?
        airports.filter(airport => airport.name.toUpperCase().includes(query?.toUpperCase())
          || airport.iata.toUpperCase().includes(query?.toUpperCase())
          || airport.city.toUpperCase().includes(query?.toUpperCase())): airports),
      tap((airports: Airports) => this.airports.next(airports))
    ).subscribe();
  }

  getAirports(): Observable<Airports> {
    return this.airports.asObservable();
  }

  // searchFlightDestinations(origin: string, departureDate?: string, oneWay?: boolean, duration?: string, nonStop?: boolean, maxPrice?: number, viewBy?: string): void {
  searchFlightDestinations(criteria: Search): void {
    let params = new HttpParams()
    .set('origin', criteria.origin)
    .set('oneWay', criteria.oneWay)
    .set('nonStop', criteria.nonStop)
    .set('viewBy', criteria.viewBy);
    params = criteria.departureDate ? params.set('departureDate', criteria.departureDate) : params;
    params = criteria.duration ? params.set('duration', criteria.duration) : params;
    params = criteria.maxPrice ? params.set('maxPrice', criteria.maxPrice) : params;
    this.httpClient.get<FlightDestinations>(`${this.baseURL}/shopping/flight-destinations`, {params}).pipe(
      tap((flights: FlightDestinations) => this.flights.next(flights))
    ).subscribe();
  }

  getFlightDestinations(): Observable<FlightDestinations> {
    return this.flights.asObservable();
  }

}
