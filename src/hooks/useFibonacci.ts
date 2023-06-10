import { Dispatch, SetStateAction, useRef, useState } from "react";

enum GameStage {
  First,
  Second,
  Three,
}
type GameState = {
  [key: string]: number;
};
const useFibonacci = ({
  addOutput,
}: {
  // messages: { user: string; message: string; id: number }[];
  addOutput: (output: string) => void;
}) => {
  const [gameStage, setGameStage] = useState(GameStage.First);
  const gameState = useRef<GameState | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  if (gameStage === GameStage.First) {
    addOutput(
      "Please input the number of time in seconds between emitting numbers and their frequency"
    );
    setGameStage(GameStage.Second);
  }

  function startTimerStage(timer: number) {
    if (timer > 21 || timer < 1) {
      return "Please enter a time in seconds less than 20 and greater than 0.";
    }
    timerRef.current = setInterval(() => {
      const game = gameState.current
        ? Object.entries(gameState.current)
            .map(([k, v]) => `${k}:${v}`)
            .join(", ")
        : "";
      console.log(game);
      addOutput("say current numbers in gameState" + game);
    }, timer * 1000);
    return undefined;
  }

  const addInput = (input: string) => {
    if (gameStage === GameStage.Second) {
      if (isNaN(parseInt(input))) {
        //back to stage 1
        return "Please input the number of time in seconds between emitting numbers and their frequency";
      }
      const output = startTimerStage(parseInt(input));
      if (output) {
        return output;
      } else {
        setGameStage(GameStage.Three);
      }
    } else if (gameStage === GameStage.Three) {
      if (isNaN(parseInt(input))) {
        //back to stage 1
        return "That is not a valid command, please enter stop or a number";
      }
      gameState.current = {
        ...gameState.current,
        [input]: 1 + (gameState?.current?.[input] ?? 0),
      };
      return 'Please enter the next number';
    }

    return "Please enter the first number";
  };

  return addInput;
};

export default useFibonacci;
