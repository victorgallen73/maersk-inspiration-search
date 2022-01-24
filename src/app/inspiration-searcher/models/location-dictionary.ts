import { Dictionary } from "./dictionary";
import { Location } from "./location";

export interface LocationDictionary extends Dictionary {
  key: string;
  value: Location;
}
