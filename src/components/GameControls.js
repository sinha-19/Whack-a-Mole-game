import React from 'react';
function GameControls({ gameState, onStartGame, score, highScore }) {
  const getButtonText = () => {
    switch (gameState) {
      case 'waiting':
        return 'Start Game';
      case 'playing':
        return 'Game in Progress...';
      case 'gameOver':
        return 'Play Again';
      default:
        return 'Start Game';
    }
  };
  const getGameMessage = () => {
    switch (gameState) {
      case 'waiting':
        return 'Ready to whack some moles? Click Start Game!';
      case 'playing':
        return 'Quick! Click the moles before they disappear!';
      case 'gameOver':
        if (score > highScore) {
          return `🎉 Congratulations! New high score: ${score} points!`;
        } else if (score === highScore && score > 0) {
          return `Great job! You tied your high score: ${score} points!`;
        } else {
          return `Game Over! Final score: ${score} points. Try to beat ${highScore}!`;
        }
      default:
        return '';
    }
  };
  return (
    <div className="game-controls">
      <div className="game-message">
        <p>{getGameMessage()}</p>
      </div>  
      <button 
        className={`control-button ${gameState}`}
        onClick={onStartGame}
        disabled={gameState === 'playing'}
      >
        {getButtonText()}
      </button>
      {gameState === 'waiting' && (
        <div className="game-instructions">
          <h3>How to Play:</h3>
          <ul>
            <li>🔨 Click on moles as they pop up from holes</li>
            <li>⏰ You have 30 seconds to score as many points as possible</li>
            <li>🎯 Each successful hit gives you 10 points</li>
            <li>⚡ Choose your difficulty level for different challenges</li>
            <li>🏆 Try to beat your high score!</li>
          </ul>
        </div>
      )}
    </div>
  );
}
export default GameControls;