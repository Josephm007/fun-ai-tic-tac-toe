export type AIDifficulty = 'easy' | 'medium' | 'hard' | 'impossible';
export type Player = 'X' | 'O' | '';
export type Board = Player[];

export const WINNING_CONDITIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6] // diagonals
];

export const checkWin = (board: Board, player: Player): number[] | null => {
  for (const condition of WINNING_CONDITIONS) {
    const [a, b, c] = condition;
    if (board[a] === player && board[b] === player && board[c] === player) {
      return condition;
    }
  }
  return null;
};

// Official draw detection - all 9 cells filled AND no winner exists
export const isDraw = (board: Board): boolean => {
  // Rule: Draw occurs when all 9 cells are filled and no player has 3 in a row
  const allCellsFilled = board.every(cell => cell !== '');
  
  // Verify no winning combinations exist for either player
  const hasWinnerX = checkWin(board, 'X') !== null;
  const hasWinnerO = checkWin(board, 'O') !== null;
  
  // Official rule: Draw = all cells filled AND no winner
  return allCellsFilled && !hasWinnerX && !hasWinnerO;
};

// Check if game has a winner
export const hasWinner = (board: Board): boolean => {
  return checkWin(board, 'X') !== null || checkWin(board, 'O') !== null;
};

// Game over detection: winner exists OR draw
export const isGameOver = (board: Board): boolean => {
  return hasWinner(board) || isDraw(board);
};

export const getEmptyIndices = (board: Board): number[] => {
  return board.map((cell, index) => cell === '' ? index : null)
             .filter(index => index !== null) as number[];
};

// Minimax algorithm for impossible AI
const minimax = (board: Board, depth: number, isMaximizing: boolean): number => {
  const winner = checkWin(board, 'X') ? 'X' : checkWin(board, 'O') ? 'O' : null;
  
  if (winner === 'O') return 10 - depth;
  if (winner === 'X') return depth - 10;
  if (isDraw(board)) return 0;
  
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'O';
        const score = minimax(board, depth + 1, false);
        board[i] = '';
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'X';
        const score = minimax(board, depth + 1, true);
        board[i] = '';
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

export const getAIMove = (board: Board, difficulty: AIDifficulty): number | null => {
  const emptyIndices = getEmptyIndices(board);
  
  if (emptyIndices.length === 0) return null;
  
  switch (difficulty) {
    case 'easy':
      // Random move
      return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      
    case 'medium':
      // 50% chance of optimal move, 50% random
      if (Math.random() < 0.5) {
        return getOptimalMove(board);
      }
      return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      
    case 'hard':
      // 80% chance of optimal move, 20% random
      if (Math.random() < 0.8) {
        return getOptimalMove(board);
      }
      return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      
    case 'impossible':
      // Always optimal move using minimax
      return getMinimaxMove(board);
      
    default:
      return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  }
};

const getOptimalMove = (board: Board): number | null => {
  // Try to win
  for (const condition of WINNING_CONDITIONS) {
    const [a, b, c] = condition;
    const values = [board[a], board[b], board[c]];
    const oCount = values.filter(val => val === 'O').length;
    const emptyCount = values.filter(val => val === '').length;
    
    if (oCount === 2 && emptyCount === 1) {
      return condition[values.indexOf('')];
    }
  }
  
  // Try to block player
  for (const condition of WINNING_CONDITIONS) {
    const [a, b, c] = condition;
    const values = [board[a], board[b], board[c]];
    const xCount = values.filter(val => val === 'X').length;
    const emptyCount = values.filter(val => val === '').length;
    
    if (xCount === 2 && emptyCount === 1) {
      return condition[values.indexOf('')];
    }
  }
  
  // Take center if available
  if (board[4] === '') return 4;
  
  // Take corners
  const corners = [0, 2, 6, 8];
  const availableCorners = corners.filter(i => board[i] === '');
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }
  
  // Take any available move
  const emptyIndices = getEmptyIndices(board);
  return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
};

const getMinimaxMove = (board: Board): number | null => {
  let bestScore = -Infinity;
  let bestMove = null;
  
  for (let i = 0; i < 9; i++) {
    if (board[i] === '') {
      board[i] = 'O';
      const score = minimax(board, 0, false);
      board[i] = '';
      
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  
  return bestMove;
};