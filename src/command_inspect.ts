import { type State } from "./state.js";

export async function commandInspect(state: State, pokemonName: string): Promise<void> {
  if (!pokemonName || pokemonName === ""){
    console.log("You must provide a pokemon name to inspect")
    return
  }

  //const pokemonInfo = await state.pokeAPI.fetchPokemon(pokemonName);
  /*console.log(`Throwing a Pokeball at ${pokemonName}...`)
  const captured = Math.random() <= catch_chance ? true : false;
  if (captured) {
    console.log(`${pokemonName} was caught!`);
  } else {
    console.log(`${pokemonName} escaped!`);
  }
  console.log();
  state.rl.prompt();*/
}