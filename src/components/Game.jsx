import { useState, useEffect } from "react";
import Board from "./Board";
import ModeSelector from "./ModeSelector";
import DifficultySelector from "./DifficultySelector";
import styles from "./Game.module.css";
import Square from "./Square";

import { calculateWinner } from "../utils/calculateWinner";
import { moveEasy, moveMedium, moveHard } from "../utils/ai";

export default function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [mode, setMode] = useState("cpu");
  const [difficulty, setDifficulty] = useState("easy");

  const winner = calculateWinner(board);
  const isDraw = board.every(Boolean) && !winner;

  const status = winner
    ? `Ganador: ${winner}`
    : isDraw
    ? "Empate"
    : `Turno: ${xIsNext ? "X" : "O"}`;

  function handleClick(i) {
    if (board[i] || winner) return;
    if (mode === "cpu" && !xIsNext) return;

    const newBoard = [...board];
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  }

  useEffect(() => {
    if (mode === "cpu" && !xIsNext && !winner) {
      setTimeout(() => {
        let move;
        if (difficulty === "easy") move = moveEasy(board);
        else if (difficulty === "medium") move = moveMedium(board);
        else move = moveHard(board);

        if (move !== null) {
          const newBoard = [...board];
          newBoard[move] = "O";
          setBoard(newBoard);
          setXIsNext(true);
        }
      }, 500);
    }
  }, [board, xIsNext, winner, mode, difficulty]);

  function resetGame() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <main className={styles.game}>
      <ModeSelector
        mode={mode}
        onChange={(e) => {
          setMode(e.target.value);
          resetGame();
        }}
      />
      {mode === "cpu" && (
        <DifficultySelector
          difficulty={difficulty}
          onChange={(e) => {
            setDifficulty(e.target.value);
            resetGame();
          }}
        />
      )}
      <p className={styles.status}>{status}</p>
      <Board squares={board} onClick={handleClick} />
      <button className={styles.resetBtn} onClick={resetGame}>
        Reiniciar
      </button>
    </main>
  );
  
}
