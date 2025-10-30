import { type State } from "./state.js";

export async function commandExplore(state: State, area: string): Promise<void>{
  const location = await state.pokeAPI.fetchLocation(area);
  for (const pokemonEncounter of location.pokemon_encounters){
    console.log(` - ${pokemonEncounter.pokemon.name}`)
  };
  console.log();
  state.rl.prompt();
};
