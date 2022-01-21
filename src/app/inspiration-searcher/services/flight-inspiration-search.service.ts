import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Search } from '../models/search';

@Injectable({
  providedIn: 'root'
})
export class FlightInspirationSearchService {

  constructor(private httpClient: HttpClient) { }

  getIATACodes() {
    return this.httpClient.get("assets/iata-codes.json").pipe(
      map((iataCodes: any) => JSON.parse(iataCodes))
    ).subscribe();
  }

}
