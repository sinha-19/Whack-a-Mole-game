import React from 'react';
function GameMenu({ 
  onStartGame, 
  difficulty, 
  onDifficultyChange, 
  highScores, 
  soundEnabled, 
  onSoundToggle 
}) {
  const difficultyDescriptions = {
    easy: 'Moles appear slowly and stay longer',
    medium: 'Balanced challenge for most players',
    hard: 'Lightning fast moles for experts'
  };
  return (
    <div className="game-menu">
      <div className="menu-content">
        <div className="game-logo">
          <div className="logo-mole">🐹</div>
          <h2>WHACK-A-MOLE</h2>
          <p>Ultimate Reflex Challenge</p>
        </div>
        <div className="difficulty-selection">
          <h3>Choose Difficulty</h3>
          <div className="difficulty-options">
            {Object.keys(difficultyDescriptions).map(level => (
              <div 
                key={level}
                className={`difficulty-option ${difficulty === level ? 'selected' : ''}`}
                onClick={() => onDifficultyChange(level)}
              >
                <div className="difficulty-header">
                  <span className={`difficulty-name ${level}`}>
                    {level.toUpperCase()}
                  </span>
                  <span className="high-score">
                    Best: {highScores[level]}
                  </span>
                </div>
                <p className="difficulty-desc">
                  {difficultyDescriptions[level]}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="game-settings">
          <div className="setting-item">
            <label className="setting-label">
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={(e) => onSoundToggle(e.target.checked)}
              />
              <span className="checkmark"></span>
              Sound Effects
            </label>
          </div>
        </div>
        <button className="start-game-btn" onClick={onStartGame}>
          <span className="btn-icon">🎯</span>
          START GAME
        </button>
        <div className="game-instructions">
          <h4>How to Play:</h4>
          <ul>
            <li>🔨 Click on moles as they pop up from holes</li>
            <li>⚡ Build combos for bonus points</li>
            <li>🎯 Aim for high accuracy</li>
            <li>⏰ You have 60 seconds to score big!</li>
          </ul>
        </div>
        <div className="high-scores-summary">
          <h4>🏆 Your Best Scores:</h4>
          <div className="scores-grid">
            {Object.entries(highScores).map(([level, score]) => (
              <div key={level} className="score-entry">
                <span className={`level-name ${level}`}>{level}</span>
                <span className="score-number">{score}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default GameMenu;