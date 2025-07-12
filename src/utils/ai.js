// Función base para usar en todos los niveles
function findBestMove(board, player) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
  
    for (const [a, b, c] of lines) {
      const values = [board[a], board[b], board[c]];
      const countPlayer = values.filter((v) => v === player).length;
      const emptyIndex = [a, b, c].find((i) => board[i] === null);
  
      if (countPlayer === 2 && emptyIndex !== undefined) {
        return emptyIndex;
      }
    }
  
    return null;
  }
  
  // IA Fácil → aleatorio
  export function moveEasy(board) {
    const empty = board.map((v, i) => (v === null ? i : null)).filter((v) => v !== null);
    return empty.length ? empty[Math.floor(Math.random() * empty.length)] : null;
  }
  
  // IA Media → gana si puede, si no aleatorio
  export function moveMedium(board) {
    const win = findBestMove(board, "O");
    if (win !== null) return win;
    return moveEasy(board);
  }
  
  // IA Difícil → ganar, bloquear, centro, esquina, aleatorio
  export function moveHard(board) {
    const win = findBestMove(board, "O");
    if (win !== null) return win;
  
    const block = findBestMove(board, "X");
    if (block !== null) return block;
  
    if (board[4] === null) return 4;
  
    const corners = [0, 2, 6, 8].filter((i) => board[i] === null);
    if (corners.length) return corners[0];
  
    return moveEasy(board);
  }
  