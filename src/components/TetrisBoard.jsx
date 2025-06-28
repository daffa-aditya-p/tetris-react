import React from 'react';
import Tetromino from './Tetromino';
import { BOARD_WIDTH, BOARD_HEIGHT } from '../utils/gameLogic';

const TetrisBoard = ({ board }) => {
  return (
    <div 
      className="grid gap-px bg-gray-900 border-4 border-gray-700 rounded-lg shadow-2xl overflow-hidden"
      style={{
        gridTemplateRows: `repeat(${BOARD_HEIGHT}, minmax(0, 1fr))`,
        gridTemplateColumns: `repeat(${BOARD_WIDTH}, minmax(0, 1fr))`,
        width: 'min(40vh, 300px)',
        height: 'min(80vh, 600px)',
      }}
    >
      {board.map((row, y) =>
        row.map(([type, status], x) => (
          <Tetromino key={`${y}-${x}`} type={type} />
        ))
      )}
    </div>
  );
};

export default TetrisBoard;
