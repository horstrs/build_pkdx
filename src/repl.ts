import { initState, type State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input
  .toLocaleLowerCase()
  .trim()
  .split(" ")
  .filter((word) => word !== "");
}

export function startREPL(): void {
  const state = initState();
  state.rl.prompt();
  state.rl.on("line", (input) => 
    {processPrompt(state, input)
  });
}

function processPrompt(state: State, input: string): void {
  const userInput = cleanInput(input);
  if (!userInput ||  userInput.length === 0) {
    state.rl.prompt();
  } else {
    const command = userInput[0];
    const commandList = state.commands;
    if (!commandList[command]){
      console.log("Unknown command");
      state.rl.prompt();
      return;
    };
    try {
      commandList[command].callback(state);
    } catch (e) {
      console.log(e);
    }
    state.rl.prompt();
  }
};
