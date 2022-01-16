import { Moment } from 'moment';
import { ViewByOptions } from '../enumerations/view-by-options';

export interface Search {
  origin: string;
  departureDate: Moment;
  oneWay: boolean;
  duration: string;
  nonStop: boolean;
  maxPrice: number;
  viewBy: ViewByOptions;
}
