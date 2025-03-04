export interface Location {
  latitude: number;
  longitude: number;
}

export interface Observation extends Location {
  observation: string;
}
