import React from 'react';
import MoleHole from './MoleHole';
function GameGrid({ moles, onMoleClick, gameState, combo }) {
  return (
    <div className={`game-grid ${gameState} ${combo >= 10 ? 'combo-mode' : ''}`}>
      {moles.map((hasMole, index) => (
        <MoleHole
          key={index}
          index={index}
          hasMole={hasMole}
          onClick={() => onMoleClick(index)}
          disabled={gameState !== 'playing'}
          combo={combo}
        />
      ))}
      {combo >= 5 && (
        <div className="combo-indicator">
          <span className="combo-text">COMBO x{combo}</span>
          <span className="combo-fire">🔥</span>
        </div>
      )}
    </div>
  );
}
export default GameGrid;