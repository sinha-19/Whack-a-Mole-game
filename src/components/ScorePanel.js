import React from 'react';
function ScorePanel({ 
  score, 
  timeLeft, 
  combo, 
  accuracy, 
  difficulty, 
  gameState, 
  onPause, 
  onResume, 
  onQuit 
}) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  const getTimeWarning = () => {
    if (timeLeft <= 10) return 'critical';
    if (timeLeft <= 20) return 'warning';
    return '';
  };
  return (
    <div className="score-panel">
      <div className="score-row">
        <div className="score-item">
          <span className="score-label">Score</span>
          <span className="score-value">{score.toLocaleString()}</span>
        </div>    
        <div className="score-item">
          <span className="score-label">Time</span>
          <span className={`score-value time ${getTimeWarning()}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
        <div className="score-item">
          <span className="score-label">Accuracy</span>
          <span className="score-value">{accuracy}%</span>
        </div>
      </div>
      <div className="game-controls">
        <div className="difficulty-badge">
          <span className={`difficulty-indicator ${difficulty}`}>
            {difficulty.toUpperCase()}
          </span>
        </div>
        <div className="control-buttons">
          {gameState === 'playing' && (
            <button className="control-btn pause-btn" onClick={onPause}>
              ⏸️ Pause
            </button>
          )}
          {gameState === 'paused' && (
            <button className="control-btn resume-btn" onClick={onResume}>
              ▶️ Resume
            </button>
          )}
          <button className="control-btn quit-btn" onClick={onQuit}>
            🏠 Menu
          </button>
        </div>
      </div>
      {combo > 0 && (
        <div className="combo-display">
          <span className="combo-label">Combo</span>
          <span className={`combo-value ${combo >= 10 ? 'mega-combo' : combo >= 5 ? 'super-combo' : ''}`}>
            {combo}x
          </span>
        </div>
      )}
      {gameState === 'paused' && (
        <div className="pause-overlay">
          <div className="pause-message">
            <h3>⏸️ PAUSED</h3>
            <p>Click Resume to continue</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default ScorePanel;