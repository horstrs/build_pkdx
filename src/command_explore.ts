import { type State } from "./state.js";

export async function commandExplore(state: State, area: string): Promise<void>{
  if (!area || area === ""){
    console.log("You must provide an area name to explore")
    return
  }
  const location = await state.pokeAPI.fetchLocation(area);
  for (const pokemonEncounter of location.pokemon_encounters){
    console.log(` - ${pokemonEncounter.pokemon.name}`)
  };
  console.log();
  state.rl.prompt();
};
