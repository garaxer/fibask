import { useState } from "react";

const useFibonacci = (addOutput: (output: string) => void) => {
  const [gameState, setGameState] = useState(0);
  if (gameState === 0) {
    addOutput("Enter a number");
    setGameState(gameState + 1);
  }

  const addInput = (input: string) => {
    let output: undefined | string = undefined
    if (!isNaN(parseInt(input))) {
        output = `Thank you for entering ${parseInt(input)}`;
    }

    if (output) {
        return output
    }
  };

  return addInput;
};

export default useFibonacci;
