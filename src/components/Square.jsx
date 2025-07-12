import styles from "./Game.module.css";

export default function Square({ value, onClick }) {
  // Clases dinámicas:
  // - styles.square siempre
  // - styles.used si la casilla tiene valor (X u O)
  // - styles.x o styles.o según el valor

  const classNames = [
    styles.square,
    value ? styles.used : "",
    value === "X" ? styles.x : "",
    value === "O" ? styles.o : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classNames} onClick={onClick} disabled={!!value}>
      {value}
    </button>
  );
}
