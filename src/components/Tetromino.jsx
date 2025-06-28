import React from 'react';
import { TETROMINOES } from '../utils/tetrominoShapes';

const Tetromino = ({ type }) => {
  const tetromino = TETROMINOES[type];
  const style = {
    backgroundColor: tetromino.color,
    boxShadow: type === 0 ? 'none' : `0px 0px 5px 2px rgba(${tetromino.color}, 0.5)`,
    border: type === 0 ? '0px solid' : '2px solid',
    borderColor: type === 0 ? 'transparent' : `rgba(255, 255, 255, 0.2)`,
    borderRadius: '3px',
    transition: 'background-color 0.1s ease-in-out',
  };

  return <div className="w-full h-full relative overflow-hidden" style={style}>
    {type !== 0 && (
      <div className="absolute inset-0 opacity-20" style={{ 
        background: `linear-gradient(to bottom right, rgba(255,255,255,0.5), rgba(0,0,0,0.5))`
      }}></div>
    )}
  </div>;
};

export default React.memo(Tetromino);
