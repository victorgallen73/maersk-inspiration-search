import { Dictionaries } from "./dictionary";
import { Links } from "./link";
import { Price } from "./price";

export interface FlightDestinations {
  data: Array<FlightDestination>;
  dictionaries: Dictionaries;
 }

export interface FlightDestination {
  type: string;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  price: Price;
  links: Links;
}
