import styles from "./Square.module.css";

export default function Square({ value, onClick }) {
  const colorClass = value === "X" ? styles.red : value === "O" ? styles.green : "";

  return (
    <button
      className={`${styles.square} ${colorClass}`}
      onClick={onClick}
      disabled={value !== null}
    >
      {value}
    </button>
  );
}
