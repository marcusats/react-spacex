export interface Item {
    link: string;
    itemName: string;
}
  
export interface Entity {
    id: string;
    image: string;
    title?: string;
    details?: string;
    date?: string;
    type?: string;
};

export interface Payload {
    dragon: {
      capsule: null | string;
      mass_returned_kg: null | number;
      mass_returned_lbs: null | number;
      flight_time_sec: null | number;
      manifest: null | string;
      water_landing: null | boolean;
      land_landing: null | boolean;
    };
    name: string;
    type: string;
    reused: boolean;
    launch: string;
    customers: string[];
    norad_ids: number[];
    nationalities: string[];
    manufacturers: string[];
    mass_kg: null | number;
    mass_lbs: null | number;
    orbit: string;
    reference_system: string;
    regime: string;
    longitude: null | number;
    semi_major_axis_km: null | number;
    eccentricity: null | number;
    periapsis_km: null | number;
    apoapsis_km: null | number;
    inclination_deg: null | number;
    period_min: null | number;
    lifespan_years: null | number;
    epoch: null | string;
    mean_motion: null | number;
    raan: null | number;
    arg_of_pericenter: null | number;
    mean_anomaly: null | number;
    id: string;
  }
  