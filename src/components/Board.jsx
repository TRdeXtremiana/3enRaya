import Square from "./Square";
import styles from "./Game.module.css";

export default function Board({ squares, onClick }) {
  return (
    <div className={styles.board}>
      {squares.map((value, index) => (
        <Square key={index} value={value} onClick={() => onClick(index)} />
      ))}
    </div>
  );
}
