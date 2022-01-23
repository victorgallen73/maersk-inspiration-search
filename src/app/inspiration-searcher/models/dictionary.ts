import { Location } from "./location";

export interface Dictionaries extends Array<Dictionary> {}

export interface Dictionary extends Map<string, string | Location> {}
