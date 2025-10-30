import { type State } from "./state.js";

export async function commandMap(state: State): Promise<void>{
  if (!state.nextLocationsURL) {
    throw new Error("You're on the last page.");
  }
  const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;
  for(const location of locations.results){
    console.log(location.name);
  }
  console.log();
}

export async function commandMapBack(state: State): Promise<void>{
  if (!state.prevLocationsURL) {
    throw new Error("You're on the first page.");
  }
  const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;
  for(const location of locations.results){
    console.log(location.name);
  }
  console.log();
}