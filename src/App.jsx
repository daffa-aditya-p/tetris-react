import React, { useState, useEffect } from 'react';
import TetrisBoard from './components/TetrisBoard';
import MobileControls from './components/MobileControls';
import { useTetrisEngine } from './hooks/useTetrisEngine';
import { createBoard } from './utils/gameLogic';

function App() {
  const { 
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
  } = useTetrisEngine();

  const [dropTime, setDropTime] = useState(1000);

  useEffect(() => {
    if (gameOver) {
      setDropTime(null);
      return;
    }

    const interval = setInterval(() => {
      drop();
    }, dropTime);

    return () => clearInterval(interval);
  }, [drop, dropTime, gameOver]);

  const handleKeyDown = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) { // Left arrow
        movePlayer(-1);
      } else if (keyCode === 39) { // Right arrow
        movePlayer(1);
      } else if (keyCode === 40) { // Down arrow (soft drop)
        setDropTime(50);
      } else if (keyCode === 38) { // Up arrow (rotate)
        playerRotate(board);
      } else if (keyCode === 32) { // Spacebar (hard drop)
        hardDrop();
      }
    }
  };

  const handleKeyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40 || keyCode === 32) { // Down arrow or Spacebar
        setDropTime(1000);
      }
    }
  };

  const startGame = () => {
    setBoard(createBoard());
    resetPlayer();
    setScore(0);
    setRows(0);
    setLevel(0);
    setGameOver(false);
    setDropTime(1000);
  };

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-white"
      role="button"
      tabIndex="0"
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      <h1 className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg">
        TETRIS REACT
      </h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700">
        {gameOver ? (
          <div className="flex flex-col items-center justify-center w-full h-full text-red-500 text-3xl font-bold animate-pulse">
            GAME OVER!
            <button 
              className="mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              onClick={startGame}
            >
              Play Again
            </button>
          </div>
        ) : (
          <TetrisBoard board={board} />
        )}
        <div className="flex flex-col gap-4 text-xl font-semibold bg-gray-700 p-5 rounded-lg shadow-inner border border-gray-600">
          <p className="text-purple-300">Score: <span className="font-bold text-purple-100">{score}</span></p>
          <p className="text-pink-300">Rows: <span className="font-bold text-pink-100">{rows}</span></p>
          <p className="text-blue-300">Level: <span className="font-bold text-blue-100">{level}</span></p>
          {!gameOver && (
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 mt-4"
              onClick={startGame}
            >
              Start Game
            </button>
          )}
        </div>
      </div>
      <MobileControls movePlayer={movePlayer} playerRotate={() => playerRotate(board)} drop={drop} hardDrop={hardDrop} />
    </div>
  );
}

export default App;