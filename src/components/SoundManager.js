import { useEffect, useRef } from 'react';
function SoundManager({ enabled, gameState, hits, misses }) {
  const audioContextRef = useRef(null);
  const prevHitsRef = useRef(0);
  const prevMissesRef = useRef(0);
  useEffect(() => {
    if (enabled && !audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  }, [enabled]);
  useEffect(() => {
    if (enabled && hits > prevHitsRef.current && audioContextRef.current) {
      playHitSound();
    }
    prevHitsRef.current = hits;
  }, [hits, enabled]);
  useEffect(() => {
    if (enabled && misses > prevMissesRef.current && audioContextRef.current) {
      playMissSound();
    }
    prevMissesRef.current = misses;
  }, [misses, enabled]);
  const playHitSound = () => {
    if (!audioContextRef.current) return;
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1200, audioContextRef.current.currentTime + 0.1);
    gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.2);
    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + 0.2);
  };
  const playMissSound = () => {
    if (!audioContextRef.current) return;
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    oscillator.frequency.setValueAtTime(200, audioContextRef.current.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContextRef.current.currentTime + 0.3);
    gainNode.gain.setValueAtTime(0.2, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.3);
    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + 0.3);
  };
  return null;
}
export default SoundManager;