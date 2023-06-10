import { useRef, useState } from "react";

enum GameStage {
  First,
  Second,
  Three,
}
type GameState = {
  [key: string]: number;
};

const fibonacciNumbers = [
  0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987,
];

const useFibonacci = ({
  addOutput,
}: {
  addOutput: (output: string) => void;
}) => {
  const [gameStage, setGameStage] = useState(GameStage.First);
  const gameState = useRef<GameState | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startGameMessage =
    "Please input the number of time in seconds between emitting numbers and their frequency";
  if (gameStage === GameStage.First) {
    addOutput(startGameMessage);
    setGameStage(GameStage.Second);
  }

  function startTimerStage(timer: number) {
    if (timer > 21 || timer < 1) {
      return "Please enter a time in seconds less than 20 and greater than 0.";
    }
    timerRef.current = setInterval(() => {
      const game = gameState.current
        ? Object.entries(gameState.current)
            .sort((a, b) => b[1] - a[1])
            .map(([k, v]) => `${k}:${v}`)
            .join(", ")
        : "";
      game && addOutput(game);
    }, timer * 1000);
    return undefined;
  }

  const addInput = (input: string): string[] => {
    const inputAsNumber = parseInt(input);
    if (gameStage === GameStage.Second) {
      if (isNaN(inputAsNumber)) {
        return [startGameMessage];
      }
      const feedback = startTimerStage(inputAsNumber);
      if (feedback) {
        return [feedback];
      } else {
        setGameStage(GameStage.Three);
        return ["Please enter the first number"];
      }
    }
    if (isNaN(inputAsNumber)) {
      return [
        `Sorry, that is not a valid input, please enter ${
          true ? "halt" : "resume"
        }, quit or a number`,
      ];
    }
    if (inputAsNumber < 1 || inputAsNumber >= 1000) {
      return [
        "Please enter a number greater than 0 and less than or equal to 1000",
      ];
    }
    gameState.current = {
      ...gameState.current,
      [input]: 1 + (gameState?.current?.[input] ?? 0),
    };
    const isFib = fibonacciNumbers.includes(inputAsNumber);
    return [...(isFib ? ["FIB"] : []), "Please enter the next number"];
  };

  return addInput;
};

export default useFibonacci;
