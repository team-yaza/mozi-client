export interface Location {
  latitude: number;
  longitude: number;
}

export interface GeoJson {
  type: string;
  coordinates: Array<number>;
}
