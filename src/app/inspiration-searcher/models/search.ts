import { Moment } from 'moment';

export interface Search {
  origin: string;
  departureDate: Moment;
  oneWay: boolean;
  duration: string;
  nonStop: boolean;
  maxPrice: number;
  viewBy: string[];
}
