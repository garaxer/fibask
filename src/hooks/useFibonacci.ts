import { useRef, useState } from "react";
import bigInt, { BigInteger } from 'big-integer';

enum GameStage {
  First, // Ask for time
  Second, // Start timer and ask for first number
  Three, // Process commands and inputs
  Four, // Exit game on next key
}
type GameState = {
  [key: string]: number;
};

function isFibonacciNumber(number: string): boolean {
  // Check if the number is a perfect square
  const isPerfectSquare = (n: BigInteger): boolean => {
    let x = n;
    let y = bigInt.one;

    while (x.compareTo(y) > 0) {
      x = x.add(y).divide(2);
      y = n.divide(x);
    }

    return x.multiply(x).equals(n);
  };

  const bigNumber = bigInt(number);

  // Check if the number is a Fibonacci number
  // A number is a Fibonacci number if and only if
  // 5 * number^2 + 4 or 5 * number^2 - 4 is a perfect square
  const candidate1 = bigNumber.multiply(bigNumber).multiply(5).plus(4);
  const candidate2 = bigNumber.multiply(bigNumber).multiply(5).minus(4);

  return isPerfectSquare(candidate1) || isPerfectSquare(candidate2);
}

const thousanthFibNumber =
  4346655768693745643568852767504062580256466051737178040248172908953655541794905189040387984007925516929592n;
2593080322634775209689623239873322471161642996440906533187938298969649928516003704476137795166849228875n;

function isPartOfFirst1000Fibs(num: BigInteger) {
  return num.compare(thousanthFibNumber) <= 0;
}

const useFibonacci = ({
  addOutput,
  quit,
}: {
  addOutput: (output: string) => void;
  quit: () => void;
}) => {
  const [gameStage, setGameStage] = useState(GameStage.First);
  const gameState = useRef<GameState | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const leftOverTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [gameStatFrequencyInSecs, setGameStatFrequencyInSecs] =
    useState<number>(0);
  const [timerStartTime, setTimerStartTime] = useState<number>(0);
  const [timeLeftOver, setTimeLeftOver] = useState<number | undefined>(
    undefined
  );
  const [fibKeys, setFibKeys] = useState<{ [key: string]: boolean }>({});

  function clearTimers() {
    timerRef.current && clearInterval(timerRef.current);
    leftOverTimerRef.current && clearInterval(leftOverTimerRef.current);
    timerRef.current = null;
    leftOverTimerRef.current = null;
  }

  function clearState() {
    gameState.current = null;
    clearTimers();
    setGameStatFrequencyInSecs(0);
    setTimerStartTime(0);
    setTimeLeftOver(undefined);
  }

  function outputGameStats() {
    const game = gameState.current
      ? Object.entries(gameState.current)
          .sort((a, b) => b[1] - a[1])
          .map(([k, v]) => `${k}:${v}`)
          .join(", ")
      : "";
    game && addOutput(game);
  }

  function startTimerForGame(timer: number) {
    setTimerStartTime(Date.now());
    timerRef.current = setInterval(() => {
      setTimerStartTime(Date.now());
      outputGameStats();
    }, timer * 1000);
  }
  const startGameMessage =
    "Please input the number of time in seconds between emitting numbers and their frequency";
  if (gameStage === GameStage.First) {
    addOutput(startGameMessage);
    setGameStage(GameStage.Second);
  }

  const addInput = (input: string): void => {
    const inputAsNumber = parseInt(input);
    if (gameStage === GameStage.Second) {
      if (isNaN(inputAsNumber)) {
        return addOutput(startGameMessage);
      }
      if (inputAsNumber > 21 || inputAsNumber < 1) {
        return addOutput(
          "Please enter a time in seconds less than 20 and greater than 0."
        );
      }
      startTimerForGame(inputAsNumber);
      setGameStatFrequencyInSecs(inputAsNumber);
      setGameStage(GameStage.Three);
      return addOutput("Please enter the first number");
    }
    if (gameStage === GameStage.Four) {
      quit();
      return setGameStage(GameStage.First);
    }
    // gameStage three
    if (isNaN(inputAsNumber)) {
      const timerStarted = !!(timerRef.current || leftOverTimerRef.current);
      if (timerStarted && input.toLowerCase() === "halt") {
        clearTimers();
        const timeLeft = timeLeftOver
          ? timeLeftOver - (Date.now() - timerStartTime)
          : gameStatFrequencyInSecs * 1000 - (Date.now() - timerStartTime);
        setTimeLeftOver(timeLeft);
        return addOutput("timer halted");
      }

      if (!timerStarted && input.toLowerCase() === "resume") {
        setTimerStartTime(Date.now());
        leftOverTimerRef.current = setTimeout(() => {
          outputGameStats();
          startTimerForGame(gameStatFrequencyInSecs);
          setTimeLeftOver(undefined);
        }, timeLeftOver);
        return addOutput("timer resumed");
      }

      if (input.toLowerCase() === "quit") {
        clearState();
        outputGameStats();
        setGameStage(GameStage.Four);
        return addOutput("Thanks for playing, press any key to exit");
      }

      return addOutput(
        `Sorry, that is not a valid input, please enter ${
          timerStarted ? "halt" : "resume"
        }, quit or a number`
      );
    }
    if (inputAsNumber < 0) {
      return addOutput("Please enter a number greater than or equal to 0");
    }
    let inputAsBigNumber: BigInteger;

    try {
      inputAsBigNumber = bigInt(input);
    } catch (error) {
      return addOutput("Please enter a valid integer");
    }
    
    gameState.current = {
      ...gameState.current,
      [inputAsNumber]: 1 + (gameState?.current?.[inputAsNumber] ?? 0),
    };
    const cachedFibKey = fibKeys[inputAsNumber];
    const isFib = cachedFibKey
      ? cachedFibKey
      : isPartOfFirst1000Fibs(inputAsBigNumber) && isFibonacciNumber(input);
    !cachedFibKey && setFibKeys({ ...fibKeys, [input]: isFib });
    if (isFib) {
      addOutput("FIB");
    }
    addOutput("Please enter the next number");
  };

  return addInput;
};

export default useFibonacci;
