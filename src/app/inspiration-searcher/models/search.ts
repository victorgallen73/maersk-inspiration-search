export interface Search {
  origin: string;
  oneWay: boolean;
  nonStop: boolean;
  departureDate: string | undefined;
  duration: string | undefined;
  maxPrice: number | undefined;
  viewBy: string;
}
