import { type State } from "./state.js";

export function commandHelp(state: State) {
  console.log("Welcome to the Pokedex!");
  console.log("Usage: ");
  console.log(" ");
  const commands = state.commands;
  for (const command in commands){
    console.log(`${commands[command].name}: ${commands[command].description}`)
  };
}