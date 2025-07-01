import React from 'react';
function ScoreBoard({ score, timeLeft, highScore, gameState, gameStats }) {
  const isTimeWarning = timeLeft <= 10 && gameState === 'playing';
  const isNewHighScore = score > highScore && gameState === 'gameOver';
  return (
    <div className="scoreboard">
      <div className="score-section">
        <div className="score-item">
          <span className="score-label">Score</span>
          <span className={`score-value ${isNewHighScore ? 'new-high-score' : ''}`}>
            {score}
          </span>
        </div>
        <div className="score-item">
          <span className="score-label">Time</span>
          <span className={`score-value ${isTimeWarning ? 'time-warning' : ''}`}>
            {timeLeft}s
          </span>
        </div>
        <div className="score-item">
          <span className="score-label">High Score</span>
          <span className="score-value high-score">
            {Math.max(score, highScore)}
          </span>
        </div>
      </div>
      {gameState === 'playing' && gameStats.totalClicks > 0 && (
        <div className="live-stats">
          <span className="accuracy-display">
            Accuracy: {gameStats.accuracy}% ({gameStats.successfulHits}/{gameStats.totalClicks})
          </span>
        </div>
      )}
      {isNewHighScore && (
        <div className="high-score-celebration">
          🎉 NEW HIGH SCORE! 🎉
        </div>
      )}
    </div>
  );
}
export default ScoreBoard;