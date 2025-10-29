import { type State } from "./state.js";

export async function commandHelp(state: State): Promise<void> {
  console.log("Welcome to the Pokedex!");
  console.log("Usage: ");
  console.log();
  const commands = state.commands;
  for (const command in commands){
    console.log(`${commands[command].name}: ${commands[command].description}`)
  };
  console.log();
}