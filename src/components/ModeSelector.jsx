export default function ModeSelector({ mode, onChange }) {
    return (
      <div style={{ marginBottom: "1rem" }}>
        <label>Modo: </label>
        <select value={mode} onChange={onChange}>
          <option value="cpu">vs Máquina</option>
          <option value="pvp">2 Jugadores</option>
        </select>
      </div>
    );
  }
  