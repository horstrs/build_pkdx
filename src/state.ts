import { createInterface, type Interface } from "readline";
import { stdin as input, stdout as output } from "node:process"
import { getCommands } from "./commands_registry.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  rl: Interface,
  commands: Record<string,CLICommand>
  pokeAPI: PokeAPI
  nextLocationsURL: string,
  prevLocationsURL: string,
};

export function initState(cacheInterval: number): State {
  const rl = createInterface({
    input,
    output,
    prompt: "Pokedex > ",
  });
  const commands = getCommands();
  const pokeAPI = new PokeAPI(cacheInterval);
  const firstLocationsURL = `${pokeAPI.getBaseURL()}/location-area/?limit=${pokeAPI.getPaginationSize()}`;
  return {
    rl: rl,
    commands: getCommands(),
    pokeAPI: pokeAPI,
    nextLocationsURL: firstLocationsURL,
    prevLocationsURL: "",
  };
};