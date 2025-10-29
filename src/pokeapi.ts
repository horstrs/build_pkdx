import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private static readonly paginationSize = 20;

  private cache: Cache;

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval);
  }

  closeCache() {
    this.cache.stopReapLoop();
  }

  async fetchLocations(pageURL: string): Promise<ShallowLocations> {
    if(!this.cache.get(pageURL)){
      try {
        const response = await fetch(pageURL);
        if(!response.ok){
          throw new Error(`${response.status} ${response.statusText}`);
        };
        this.cache.add(pageURL, response.json());
      } catch (e) {
        throw new Error(`Error fetching locations: ${(e as Error).message}`);
      }
    }
    return this.cache.get(pageURL) as ShallowLocations;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const locationURL = `${PokeAPI.baseURL}/location/${locationName}`;
    if(!this.cache.get(locationURL)){
      try{
        const response = await fetch(locationURL);
        if (!response.ok){
          throw new Error(`${response.status} ${response.statusText}`);
        }
        this.cache.add(locationURL, response.json());
      } catch (e) {
        throw new Error(`Error fetching location "${locationName}": ${(e as Error).message}`);
        };
    };
    return this.cache.get(locationURL) as Location;
  };
  
  getBaseURL(): string { return PokeAPI.baseURL };
  getPaginationSize(): number { return PokeAPI.paginationSize };

};

export type ShallowLocations = {
  count: number,
  next: string,
  previous: string,
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};
