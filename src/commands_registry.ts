import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapBack } from "./command_map.js";

import type { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exits the Pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    map: {
      name: "map",
      description: "Displays the next 20 locations to be explored",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays the previous 20 locations to be explored",
      callback: commandMapBack,
    },
    explore: {
      name: "explore",
      description: "Explore a given location to know all the pokemons available in that area. Usage: explore <location_name>",
      callback: commandExplore,
    },
    catch: {
      name: "catch",
      description: "Try to catch a specific pokemon. Usage: catch <pokemon_name>",
      callback: commandCatch,
    },
  }
}