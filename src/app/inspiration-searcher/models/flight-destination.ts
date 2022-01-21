import { Links } from "./link";
import { Price } from "./price";

export interface FlightDestinations extends Array<FlightDestination> { }


export interface FlightDestination {
  type: string;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  price: Price;
  links: Links;
}
