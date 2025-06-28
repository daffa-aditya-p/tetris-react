import React from 'react';

const MobileControls = ({ movePlayer, playerRotate, drop, hardDrop }) => {
  const Button = ({ children, onClick }) => (
    <button 
      className="bg-gradient-to-br from-blue-600 to-blue-800 text-white text-2xl font-bold 
                 w-20 h-20 rounded-full shadow-xl active:from-blue-700 active:to-blue-900 
                 flex items-center justify-center transition-all duration-200 ease-in-out 
                 hover:scale-105 transform"
      onClick={onClick}
    >
      {children}
    </button>
  );

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 bg-opacity-90 p-4 
                     flex justify-around items-center border-t border-gray-700 z-50">
      <Button onClick={() => movePlayer(-1)}>◀</Button>
      <Button onClick={() => playerRotate()}>↻</Button>
      <Button onClick={() => drop()}>▼</Button>
      <Button onClick={() => hardDrop()}>⬇</Button>
      <Button onClick={() => movePlayer(1)}>▶</Button>
    </div>
  );
};

export default MobileControls;
