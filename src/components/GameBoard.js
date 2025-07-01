import React from 'react';
import MoleHole from './MoleHole';
function GameBoard({ moles, onMoleClick, gameState }) {
  return (
    <div className={`game-board ${gameState}`}>
      {moles.map((hasMole, index) => (
        <MoleHole
          key={index}
          index={index}
          hasMole={hasMole}
          onClick={() => onMoleClick(index)}
          gameActive={gameState === 'playing'}
        />
      ))}
    </div>
  );
}
export default GameBoard;