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
  results: Location[],
};

export type Location = {
  name: string,
  url: string,
};

/*export type ShallowLocations = {
  id: number,
  name: string,
  game_index: string,
  //encounter_method_rates: 
  location: Location,
  names: string[],
  //pokemon_encounters: 
};

/*export type Location = {
  id: number,
  name: string,
  region: string,
  names: string[],
  //game_indices: string[],
  areas: ShallowLocations[]
};*/