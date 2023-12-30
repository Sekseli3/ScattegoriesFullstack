import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import './App.css';
import alarmSound from './alarm.wav';

function Game() {
  const { id } = useParams();
  const [count, setCount] = useState(60);
  const [number, setNumber] = useState();
  const [isRunning, setIsRunning] = useState(false);
  const [round, setRound] = useState(0);
  const audio = new Audio(alarmSound);

  useEffect(() => {
    if (isRunning && count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else if (count === 0) {
      setIsRunning(false);
      playSound();
    }
  }, [count, isRunning]);

  useEffect(() => {
    if (isRunning) {
      setRound(round + 1);
    }
  }, [isRunning]);

  function playSound() {
    audio.play();
    audio.volume = 0.2;
    setTimeout(() => audio.pause(), 4000);
  }

  function randomChar() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    setNumber(chars.charAt(Math.floor(Math.random() * chars.length)));
  }

  const rotation = (count / 60) * 360;

  return (
    <div>
      <h1>Game {id} - Round: {round}</h1>
      <h1>{count > 0 ? `Time remaining: ${count} seconds` : 'Time is up!'}</h1>
      <svg width="200" height="200">
        <circle cx="100" cy="100" r="80" stroke="black" strokeWidth="4" fill="white" />
        <line x1="100" y1="100" x2="100" y2="20" stroke="black" strokeWidth="4" transform={`rotate(${-rotation} 100 100)`} />
      </svg>
      {!isRunning && (
        <div>
          <button onClick={() => { setCount(60); setIsRunning(true); }}>Start</button>
        </div>
      )}
      {!isRunning && (
        <div>
          <button onClick={() => randomChar()}>Random Char</button>
        </div>
      )}
      <h1>{number}</h1>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/game/:id" element={<h1>HEllo</h1>} />
        <Route
          path="/game"
          element={
            <div>
              <h1>Welcome to the Game Hub</h1>
              <p>Click on the links below to start a game:</p>
              <ul>
                <li><Link to="/game/1">Game 1</Link></li>
                <li><Link to="/game/2">Game 2</Link></li>
                <li><Link to="/game/3">Game 3</Link></li>
              </ul>
            </div>
          }
        />
        <Route path="/" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
