import React, { useState, useEffect, useContext} from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
import './App.css'
import alarmSound from './assets/clock.mp3'
import categories from './assets/ScattegoriesCategories.txt'

function MainMenu() {
  const [number, setNumber] = useState()
  const [categoriesList, setCategoriesList] = useState([])
  const [count, setCount] = useState(0)
  const [round, setRound] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [audio, setAudio] = useState(null)
  const [inputs, setInputs] = useState(Array(categoriesList.length).fill(''))

useEffect(() => {
  const audioObj = new Audio(alarmSound)
  setAudio(audioObj)
}, [])

  useEffect(() => {
    if (isRunning && count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000)
      return () => clearTimeout(timer)
    } else if (count === 0) {
      setIsRunning(false)
    }
  }, [count, isRunning])

  useEffect(() => {
    if (isRunning) {
      setRound(round + 1)
    }
  }, [isRunning])

  const cpr = 12

  useEffect(() => {
    // Fetch categories only when the component mounts
    fetch(categories)
      .then(response => response.text())
      .then(data => {
        const categories = data.split('\n').filter(category => category)
        setCategoriesList(categories)
      });
  }, [])

  const startGame = () => {
    if(number === undefined){
      alert("Press Roll to get a letter")
      return
    }
    setIsRunning(true);
    setCount(60);
    setInputs(Array(categoriesList.length).fill(''))
    if (audio) {
      audio.play().catch(error => console.log(error))
    }
  }

  function randomChar() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    setNumber(chars.charAt(Math.floor(Math.random() * chars.length)))
  }
  function restart(){
    setCount(60)
    setIsRunning(false)
    setRound(0)
    if (audio) {
      audio.pause()
      audio.currentTime = 0;  // Optional: reset audio to start
    }
  }
  const rotation = (count / 60) * 360

  return (
    <div>
      <h1> Round: {round}</h1>
      <h1>{count > 0 ? `Time remaining: ${count} seconds` : 'Time is up!'}</h1>
      <svg width="200" height="200">
        <circle cx="100" cy="100" r="80" stroke="black" strokeWidth="4" fill="white" />
        <line x1="100" y1="100" x2="100" y2="20" stroke="black" strokeWidth="4" transform={`rotate(${-rotation} 100 100)`} />
      </svg>
      {!isRunning && (
        <div>
           <button onClick={startGame}>Start</button>
        </div>
      )}
      {!isRunning && (
        <div>
          <button onClick={() => randomChar()}>Roll</button>
        </div>       
      )}
      <div>
        <button onClick = {() => restart()}>Restart</button>
      </div>
      <h1>{number}</h1>
      {categoriesList.slice((round-1) * cpr,round*cpr).map((category, index) => (
    <div key={index}>
    <label>{category  }</label>
    <input 
      type="text" 
      disabled={count === 0} 
      value={inputs[index]} 
      onChange={event => {
        const newInputs = [...inputs]
        newInputs[index] = event.target.value
        setInputs(newInputs)
      }}
    />
  </div>
))}
    </div>
  );
}
function Tutorial() {
  return(
    <div>
      <h1>Scattegories rules</h1>
     <ul>
        <h2> Press Roll, you will see a letter</h2>
        <h2> The goal of the game is to give an example of each of the categories presented starting with the spesific letter</h2>
        <h2> Try to come up with unique answers, because duplicate answers give no points(only in multiplayer)</h2>
        <h2> You have 60 seconds to complete the task</h2>
        <h2> Press Start to start the timer</h2>
        <h2> Press Restart to restart the game</h2>
      </ul>
    </div>
  )
}


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/tutorial/" element={<Tutorial />} /> 
        <Route path="/" element={<MainMenu />} />
      </Routes>
    </Router>
  );
}

export default App;
