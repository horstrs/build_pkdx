export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private static readonly paginationSize = 20;

  constructor() {}

  async fetchLocations(pageURL: string): Promise<ShallowLocations> {
    const response = await fetch(
      pageURL,
      {
        method: "GET",
        mode: "cors",
      });
    return response.json();
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const locationURL = `${PokeAPI.baseURL}/location/${locationName}`;
    
    const response = await fetch(
      locationURL,
      {
        method: "GET",
        mode: "cors",
      });
    return response.json();
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
