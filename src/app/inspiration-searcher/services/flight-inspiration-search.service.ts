import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable, ReplaySubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Airports } from '../models/airports';
import { FlightDestinations } from '../models/flight-destination';

@Injectable({
  providedIn: 'root'
})
export class FlightInspirationSearchService {

  private baseURL: string = environment.apiURL;

  private airports: ReplaySubject<Airports> = new ReplaySubject<Airports>(1);

  constructor(private httpClient: HttpClient) { }

  loadAirports(query?: string) {
    return this.httpClient.get("assets/iata-codes.json").pipe(
      map((airports: any) => JSON.stringify(airports)),
      map((airports: string) => JSON.parse(airports)),
      map((airports: Airports) => query?
        airports.filter(airport => airport.name.toUpperCase().includes(query?.toUpperCase()) || airport.name.toUpperCase().includes(query?.toUpperCase())): airports),
      tap((airports: Airports) => this.airports.next(airports))
    ).subscribe();
  }

  getAirports(): Observable<Airports> {
    return this.airports.asObservable();
  }

  getFlightDestinations(origin: string, departureDate?: string, oneWay?: boolean, duration?: string, nonStop?: boolean, maxPrice?: number, viewBy?: string): Observable<FlightDestinations> {
    let params = new HttpParams().set('origin', origin);
    departureDate ? params.set('departureDate', departureDate) : undefined;
    oneWay ? params.set('oneWay', oneWay) : undefined;
    duration ? params.set('duration', duration) : undefined;
    nonStop ? params.set('nonStop', nonStop) : undefined;
    maxPrice ? params.set('maxPrice', maxPrice) : undefined;
    viewBy ? params.set('viewBy', viewBy) : undefined;

    return this.httpClient.get<FlightDestinations>(`${this.baseURL}/shopping/flights-destinations`, {params});
  }

}
