import { useState } from "react";

const useFibonacci = (outputFn: (output: string) => void) => {
  const [gameState, setGameState] = useState(0);
  if (gameState === 0) {
    outputFn("Enter a number");
    setGameState(gameState + 1);
  }

  const addInput = (input: string) => {
    if (!isNaN(parseInt(input))) {
      outputFn(`Thank you for entering ${parseInt(input)}`);
    }
  };

  return addInput;
};

export default useFibonacci;
