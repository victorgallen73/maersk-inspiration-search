import { CurrencyDictionary } from "./currency-dictionary";
import { Location } from "./location";
import { LocationDictionary } from "./location-dictionary";

export interface Dictionaries extends Array<Dictionary> {
  currencies: CurrencyDictionary;
  locations: LocationDictionary;
}

export interface Dictionary extends Map<string, string | Location> {}
