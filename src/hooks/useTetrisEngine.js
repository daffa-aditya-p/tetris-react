import { useState, useCallback } from 'react';
import { TETROMINOES, randomTetromino } from '../utils/tetrominoShapes';
import { BOARD_WIDTH, BOARD_HEIGHT, checkCollision, createBoard } from '../utils/gameLogic';

export const useTetrisEngine = () => {
  const [board, setBoard] = useState(createBoard());
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOES[0],
    collided: false,
  });
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const rotate = (matrix) => {
    // Transpose baris menjadi kolom
    const rotated = matrix.map((_, index) => matrix.map((col) => col[index]));
    // Balik setiap baris untuk mendapatkan matriks yang sudah diputar
    return rotated.map((row) => row.reverse());
  };

  const playerRotate = (board) => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    clonedPlayer.tetromino.shape = rotate(clonedPlayer.tetromino.shape);

    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, board, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino.shape[0].length) {
        // Jika rotasi tidak memungkinkan, kembalikan ke posisi semula
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  };

  const updatePlayerPos = ({ x, y, collided }) => {
    setPlayer((prev) => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
      collided,
    }));
  };

  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: BOARD_WIDTH / 2 - 1, y: 0 },
      tetromino: randomTetromino(),
      collided: false,
    });
  }, []);

  const mergeTetromino = useCallback((currentBoard) => {
    const newBoard = currentBoard.map((row) =>
      row.map((cell) => (cell[1] === 'clear' ? cell : [cell[0], 'merged']))
    );

    player.tetromino.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          newBoard[y + player.pos.y][x + player.pos.x] = [value, 'merged'];
        }
      });
    });
    return newBoard;
  }, [player]);

  const clearLines = useCallback((currentBoard) => {
    let linesCleared = 0;
    const newBoard = currentBoard.reduce((acc, row) => {
      if (row.every((cell) => cell[1] === 'merged')) {
        linesCleared += 1;
        acc.unshift(new Array(BOARD_WIDTH).fill([0, 'clear']));
      } else {
        acc.push(row);
      }
      return acc;
    }, []);

    if (linesCleared > 0) {
      setScore((prev) => prev + linesCleared * 100 * (level + 1));
      setRows((prev) => prev + linesCleared);
      if (rows + linesCleared >= (level + 1) * 10) { // Level up every 10 rows
        setLevel((prev) => prev + 1);
      }
    }
    return newBoard;
  }, [level, rows]);

  const mergeAndReset = useCallback(() => {
    if (player.pos.y < 1) {
      setGameOver(true);
    }
    setBoard((prev) => clearLines(mergeTetromino(prev)));
    resetPlayer();
  }, [player.pos.y, mergeTetromino, clearLines, resetPlayer]);


  const drop = useCallback(() => {
    if (!checkCollision(player, board, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      mergeAndReset();
    }
  }, [player, board, updatePlayerPos, mergeAndReset]);

  const hardDrop = useCallback(() => {
    let newY = player.pos.y;
    while (!checkCollision(player, board, { x: 0, y: 1 + (newY - player.pos.y) })) {
      newY += 1;
    }
    setPlayer((prev) => ({
      ...prev,
      pos: { x: prev.pos.x, y: newY },
    }));
    mergeAndReset();
  }, [player, board, mergeAndReset]);


  const movePlayer = (dir) => {
    if (!checkCollision(player, board, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  };

  return { 
    board, 
    player, 
    score, 
    rows, 
    level, 
    gameOver, 
    setBoard, 
    setPlayer, 
    resetPlayer, 
    playerRotate, 
    drop, 
    hardDrop, 
    movePlayer, 
    setGameOver 
  };
};
