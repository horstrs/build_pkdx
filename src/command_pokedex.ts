import { type State } from "./state.js";

export async function commandInspect(state: State, pokemonName: string): Promise<void> {
  if (!pokemonName || pokemonName === ""){
    console.log("You must provide a pokemon name to inspect.");
    return;
  }
  const pokemonInfo = state.caughtPokemon[pokemonName];
  if (!pokemonInfo){
    console.log(`You haven't caught ${pokemonName} yet.`);
    return;
  }
  console.log(`Name: ${pokemonInfo.name}`);
  console.log(`Height: ${pokemonInfo.height}`);
  console.log(`Weight: ${pokemonInfo.weight}`);
  console.log("Stats:");
  for (const stat of pokemonInfo.stats){
    console.log(`  - ${stat.stat.name}: ${stat.base_stat}`);
  }
  console.log("Types:");
  for (const type of pokemonInfo.types){
    console.log(`  - ${type.type.name}`);
  }
  console.log();
  state.rl.prompt();
}

export async function commandListDex(state: State): Promise<void> {
  
  console.log("This is all your caught pokemons: ");
  console.log();
  for (const pokemon in state.caughtPokemon){
    console.log(` - ${pokemon}`);
  }
  console.log();
  state.rl.prompt();
}