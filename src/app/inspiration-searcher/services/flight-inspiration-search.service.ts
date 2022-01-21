import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FlightDestinations } from '../models/flight-destination';
import { Search } from '../models/search';

@Injectable({
  providedIn: 'root'
})
export class FlightInspirationSearchService {

  private baseURL: string = environment.apiURL;

  constructor(private httpClient: HttpClient) { }

  getIATACodes() {
    return this.httpClient.get("assets/iata-codes.json").pipe(
      map((iataCodes: any) => JSON.parse(iataCodes))
    ).subscribe();
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
