import React, { useState, useEffect } from 'react';
const MOLE_VARIANTS = ['🐹', '🐭', '🐰', '🦔', '🐿️'];
function MoleHole({ index, hasMole, onClick, disabled, combo }) {
  const [isHit, setIsHit] = useState(false);
  const [showMiss, setShowMiss] = useState(false);
  const [moleVariant] = useState(MOLE_VARIANTS[index % MOLE_VARIANTS.length]);
  useEffect(() => {
    if (!hasMole) {
      setIsHit(false);
    }
  }, [hasMole]);
  const handleClick = () => {
    if (disabled) return;
    if (hasMole) {
      setIsHit(true);
      setTimeout(() => onClick(), 100);
    } else {
      setShowMiss(true);
      setTimeout(() => setShowMiss(false), 500);
      onClick();
    }
  };
  return (
    <div 
      className={`mole-hole ${hasMole ? 'has-mole' : ''} ${isHit ? 'hit' : ''} ${showMiss ? 'miss' : ''} ${combo >= 10 ? 'combo-glow' : ''}`}
      onClick={handleClick}
    >
      <div className="hole-rim"></div>
      <div className="hole-interior">
        <div className="hole-shadow"></div>    
        {hasMole && (
          <div className={`mole ${isHit ? 'mole-hit' : 'mole-appear'}`}>
            <div className="mole-body">
              <span className="mole-emoji">{moleVariant}</span>
              <div className="mole-eyes">
                <div className="eye"></div>
                <div className="eye"></div>
              </div>
            </div>
            {isHit && (
              <div className="hit-effect">
                <span className="hit-score">+{10 + Math.floor(combo / 5) * 5}</span>
                <div className="hit-particles">
                  <span>⭐</span>
                  <span>✨</span>
                  <span>💫</span>
                </div>
              </div>
            )}
          </div>
        )}
        {showMiss && (
          <div className="miss-effect">
            <span className="miss-text">MISS!</span>
            <div className="miss-particles">
              <span>💨</span>
              <span>💨</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default MoleHole;