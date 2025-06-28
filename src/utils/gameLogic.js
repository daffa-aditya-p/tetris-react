export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const createBoard = () => Array.from(Array(BOARD_HEIGHT), () => new Array(BOARD_WIDTH).fill([0, 'clear']));

export const checkCollision = (player, board, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.shape.length; y += 1) {
    for (let x = 0; x < player.tetromino.shape[y].length; x += 1) {
      if (player.tetromino.shape[y][x] !== 0) {
        if (
          // 1. Pastikan pergerakan masih dalam area game (tinggi/y)
          !board[y + player.pos.y + moveY] ||
          // 2. Pastikan pergerakan masih dalam area game (lebar/x)
          !board[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          // 3. Pastikan sel tujuan tidak sudah terisi
          board[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
        ) {
          return true;
        }
      }
    }
  }
  return false;
};
