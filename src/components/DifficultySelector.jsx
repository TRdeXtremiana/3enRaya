export default function DifficultySelector({ difficulty, onChange }) {
    return (
      <div style={{ marginBottom: "1rem" }}>
        <label>Dificultad: </label>
        <select value={difficulty} onChange={onChange}>
          <option value="easy">Fácil</option>
          <option value="medium">Medio</option>
          <option value="hard">Difícil</option>
        </select>
      </div>
    );
  }
  