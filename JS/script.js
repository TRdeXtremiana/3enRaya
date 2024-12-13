// Variables globales
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let mode = '1-player';
let victoriesX = 0;
let victoriesO = 0;

// Referencias a elementos
const boardElement = document.getElementById('board');
const messageElement = document.getElementById('message');
const modeSelect = document.getElementById('mode');
const modeSelectContainer = document.getElementById('mode-select');
const gameScreen = document.getElementById('game-screen');
const restartButton = document.getElementById('restart-btn');
const victoryXElement = document.getElementById('victory-x');
const victoryOElement = document.getElementById('victory-o');
const gameModeTitle = document.getElementById('game-mode-title');

// Funciones auxiliares
const updateVictoryCounter = () => {
	victoryXElement.textContent = victoriesX;
	victoryOElement.textContent = victoriesO;
};

const changePlayer = () => currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

const getEmptyCells = () => gameBoard.map((value, index) => value === '' ? index : null).filter(index => index !== null);

const isGameWon = () => {
	const winningCombinations = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
		[0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
		[0, 4, 8], [2, 4, 6] // Diagonales
	];
	return winningCombinations.some(([a, b, c]) => gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]);
};

const updateBoard = () => {
	const cells = document.querySelectorAll('.cell');
	cells.forEach((cell, index) => {
		const symbol = gameBoard[index];
		cell.innerHTML = symbol ? `<img src="assets/images/${symbol === 'X' ? 'alpha-x-circle-outline' : 'circle-outline'}.svg" alt="${symbol}">` : '';
	});
};

const handleVictory = () => {
	messageElement.textContent = `${currentPlayer} ha ganado!`;
	if (currentPlayer === 'X') victoriesX++;
	else victoriesO++;
	updateVictoryCounter();
	gameOver = true;
};

// Función principal para inicializar el juego
const initGame = () => {
	gameBoard.fill('');
	gameOver = false;
	messageElement.textContent = '';
	boardElement.innerHTML = '';

	// Actualizar título según el modo de juego
	gameModeTitle.textContent = mode === '1-player' ? 'vs IA' : 'vs Player';

	// Crear las celdas del tablero
	for (let i = 0; i < 9; i++) {
		const cell = document.createElement('div');
		cell.classList.add('cell');
		cell.setAttribute('data-index', i);
		cell.addEventListener('click', handleCellClick);
		boardElement.appendChild(cell);
	}

	// Ocultar selector de modo y mostrar tablero
	modeSelectContainer.style.display = 'none';
	gameScreen.classList.remove('hidden');
};

// Manejar el click en las celdas
const handleCellClick = (event) => {
	if (gameOver) return;

	const index = event.target.getAttribute('data-index');
	if (gameBoard[index]) return;

	// Colocar la marca del jugador actual
	gameBoard[index] = currentPlayer;
	updateBoard();

	// Verificar si hay un ganador
	if (isGameWon()) return handleVictory();

	// Cambiar al siguiente jugador y, si es la IA, hacer su movimiento
	changePlayer();
	if (mode === '1-player' && currentPlayer === 'O') aiMove();
};

// Movimiento de la IA (elige la primera celda vacía)
const aiMove = () => {
	setTimeout(() => {
		const emptyCells = getEmptyCells();
		const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
		gameBoard[randomMove] = 'O';
		updateBoard();

		if (isGameWon()) {
			messageElement.textContent = `La IA ha ganado!`;
			victoriesO++;
			updateVictoryCounter();
			gameOver = true;
		} else {
			changePlayer();
		}
	}, Math.random() * 500 + 1500);
};

// Reiniciar el juego
const restartGame = () => {
	modeSelectContainer.style.display = 'block';
	gameScreen.classList.add('hidden');
	initGame();
};

// Cambiar el modo de juego
modeSelect.addEventListener('change', (event) => {
	mode = event.target.value;
	initGame();
});

// Configurar el botón de reinicio
restartButton.addEventListener('click', restartGame);

// Inicializar el juego al cargar la página
initGame();