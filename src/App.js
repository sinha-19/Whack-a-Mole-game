import React, { useState, useEffect, useCallback, useRef } from 'react';
import GameGrid from './components/GameGrid';
import ScorePanel from './components/ScorePanel';
import GameMenu from './components/GameMenu';
import SoundManager from './components/SoundManager';
import './App.css';
const GAME_DURATION = 60;
const GRID_SIZE = 9;
const MOLE_SHOW_TIME = { easy: 2000, medium: 1200, hard: 800 };
const MOLE_SPAWN_RATE = { easy: 1500, medium: 1000, hard: 600 };
function App() {
  const [gameState, setGameState] = useState('menu');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [difficulty, setDifficulty] = useState('medium');
  const [moles, setMoles] = useState(Array(GRID_SIZE).fill(false));
  const [highScores, setHighScores] = useState(() => {
    const saved = localStorage.getItem('whackMoleHighScores');
    return saved ? JSON.parse(saved) : { easy: 0, medium: 0, hard: 0 };
  });
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const gameTimerRef = useRef(null);
  const moleTimerRef = useRef(null);
  const activeMolesRef = useRef(new Set());
  const endGame = useCallback(() => {
    setGameState('gameOver');
    setMoles(Array(GRID_SIZE).fill(false));
    activeMolesRef.current.clear();
    if (score > highScores[difficulty]) {
      setHighScores(prev => ({ ...prev, [difficulty]: score }));
    }
    if (gameTimerRef.current) clearTimeout(gameTimerRef.current);
    if (moleTimerRef.current) clearTimeout(moleTimerRef.current);
  }, [score, difficulty, highScores]);
  useEffect(() => {
    localStorage.setItem('whackMoleHighScores', JSON.stringify(highScores));
  }, [highScores]);
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      gameTimerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      endGame();
    }
    return () => {
      if (gameTimerRef.current) clearTimeout(gameTimerRef.current);
    };
  }, [gameState, timeLeft, endGame]);
  useEffect(() => {
    if (gameState === 'playing') {
      const spawnMole = () => {
        const availableHoles = [];
        for (let i = 0; i < GRID_SIZE; i++) {
          if (!activeMolesRef.current.has(i)) availableHoles.push(i);
        }
        if (availableHoles.length > 0) {
          const randomHole = availableHoles[Math.floor(Math.random() * availableHoles.length)];
          const showTime = MOLE_SHOW_TIME[difficulty] + Math.random() * 500;
          setMoles(prev => {
            const newMoles = [...prev];
            newMoles[randomHole] = true;
            return newMoles;
          });
          activeMolesRef.current.add(randomHole);
          setTimeout(() => {
            setMoles(prev => {
              const newMoles = [...prev];
              newMoles[randomHole] = false;
              return newMoles;
            });
            activeMolesRef.current.delete(randomHole);
            setCombo(0);
          }, showTime);
        }
        if (gameState === 'playing') {
          const nextSpawnTime = MOLE_SPAWN_RATE[difficulty] + Math.random() * 500;
          moleTimerRef.current = setTimeout(spawnMole, nextSpawnTime);
        }
      };
      moleTimerRef.current = setTimeout(spawnMole, 1000);
    }
    return () => {
      if (moleTimerRef.current) clearTimeout(moleTimerRef.current);
    };
  }, [gameState, difficulty]);
  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setMoles(Array(GRID_SIZE).fill(false));
    setCombo(0);
    setMaxCombo(0);
    setHits(0);
    setMisses(0);
    activeMolesRef.current.clear();
  }, []);
  const pauseGame = useCallback(() => setGameState('paused'), []);
  const resumeGame = useCallback(() => setGameState('playing'), []);
  const handleMoleClick = useCallback((holeIndex) => {
    if (gameState !== 'playing') return;
    if (moles[holeIndex]) {
      const basePoints = 10;
      const comboBonus = Math.floor(combo / 5) * 5;
      const points = basePoints + comboBonus;
      setScore(prev => prev + points);
      setHits(prev => prev + 1);
      setCombo(prev => {
        const newCombo = prev + 1;
        setMaxCombo(current => Math.max(current, newCombo));
        return newCombo;
      });
      setMoles(prev => {
        const newMoles = [...prev];
        newMoles[holeIndex] = false;
        return newMoles;
      });
      activeMolesRef.current.delete(holeIndex);
    } else {
      setMisses(prev => prev + 1);
      setCombo(0);
    }
  }, [gameState, moles, combo]);
  const backToMenu = useCallback(() => {
    setGameState('menu');
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setMoles(Array(GRID_SIZE).fill(false));
    setCombo(0);
    setMaxCombo(0);
    setHits(0);
    setMisses(0);
    activeMolesRef.current.clear();
  }, []);
  const accuracy = hits + misses > 0 ? Math.round((hits / (hits + misses)) * 100) : 0;
  return (
    <div className="app">
      <header className="app-header">
        <h1>🔨 WHACK-A-MOLE</h1>
        <p>Test your reflexes and reaction time!</p>
      </header>
      <main className="game-container">
        {gameState === 'menu' && (
          <GameMenu
            onStartGame={startGame}
            difficulty={difficulty}
            onDifficultyChange={setDifficulty}
            highScores={highScores}
            soundEnabled={soundEnabled}
            onSoundToggle={setSoundEnabled}
          />
        )}
        {(gameState === 'playing' || gameState === 'paused') && (
          <>
            <ScorePanel
              score={score}
              timeLeft={timeLeft}
              combo={combo}
              accuracy={accuracy}
              difficulty={difficulty}
              gameState={gameState}
              onPause={pauseGame}
              onResume={resumeGame}
              onQuit={backToMenu}
            />
            <GameGrid
              moles={moles}
              onMoleClick={handleMoleClick}
              gameState={gameState}
              combo={combo}
            />
          </>
        )}
        {gameState === 'gameOver' && (
          <div className="game-over-screen">
            <div className="game-over-content">
              <h2>🎯 GAME OVER!</h2>
              <div className="final-stats">
                <div className="stat-row">
                  <span className="stat-label">Final Score:</span>
                  <span className="stat-value">{score}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">High Score ({difficulty}):</span>
                  <span className="stat-value">{highScores[difficulty]}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Accuracy:</span>
                  <span className="stat-value">{accuracy}%</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Max Combo:</span>
                  <span className="stat-value">{maxCombo}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">Hits / Misses:</span>
                  <span className="stat-value">{hits} / {misses}</span>
                </div>
              </div>
              {score > highScores[difficulty] && (
                <div className="new-record">🏆 NEW HIGH SCORE! 🏆</div>
              )}
              <div className="game-over-buttons">
                <button className="play-again-btn" onClick={startGame}>Play Again</button>
                <button className="menu-btn" onClick={backToMenu}>Main Menu</button>
              </div>
            </div>
          </div>
        )}
      </main>
      <footer className="app-footer">
        <p>Developed by Saket Kumar Sinha</p>
      </footer>
      <SoundManager
        enabled={soundEnabled}
        gameState={gameState}
        hits={hits}
        misses={misses}
      />
    </div>
  );
}
export default App;