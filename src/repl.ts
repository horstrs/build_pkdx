import { initState, type State } from "./state.js";

export function startREPL(state: State): void {
  state.rl.prompt();
  state.rl.on("line", async (input) => 
    {processPrompt(state, input)
  });
}

async function processPrompt(state: State, input: string): Promise<void> {
  const userInput = cleanInput(input);
  if (!userInput ||  userInput.length === 0) {
    state.rl.prompt();
  } else {
    const commandList = state.commands;
    const command = commandList[userInput[0]];
    if (!command){
      console.log(`Unknown command: ${userInput[0]}. Type "help" for a list of commands.`);
      state.rl.prompt();
      return;
    };
    
    try {
      await command.callback(state);
    } catch (e) {
      console.log((e as Error).message);
    }
    state.rl.prompt();
  };
}

export function cleanInput(input: string): string[] {
  return input
  .toLocaleLowerCase()
  .trim()
  .split(" ")
  .filter((word) => word !== "");
}
