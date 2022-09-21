export interface Location {
  latitude: number;
  longitude: number;
}

export interface GeoJson {
  type: string;
  name: string;
  coordinates: Array<number>;
}

export interface LocationSearchResult {
  name: string;
  location: [latitude: number, longitude: number];
}
