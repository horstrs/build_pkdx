import { createInterface, type Interface } from "readline";
import { stdin as input, stdout as output } from "node:process"
import { getCommands } from "./commands_registry.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export type State = {
  rl: Interface,
  commands: Record<string,CLICommand>
};

export function initState(): State {
  const rl = createInterface({
  input,
  output,
});
 rl.setPrompt("Pokedex > ");
 const commands = getCommands();
 return {rl, commands};
};