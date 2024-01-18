import React, { useState, useEffect} from 'react'
import './App.css'
import alarmSound from './assets/clock.mp3'
import explosion from './assets/explosion.mp3'
import categories from './assets/ScattegoriesCategories.txt'

function MainMenu() {
    const [number, setNumber] = useState()
    const [categoriesList, setCategoriesList] = useState([])
    const [count, setCount] = useState(0)
    const [round, setRound] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [points,setPoints] = useState(0)
    const [explosionAudio, setExplosionAudio] = useState(null);
    const [audio, setAudio] = useState(null)
    const [inputs, setInputs] = useState(Array(categoriesList.length).fill(''))
  
  useEffect(() => {
    const audioObj = new Audio(alarmSound)
    setAudio(audioObj)
  }, [])

  useEffect(() => {
    const explosionAudioObj = new Audio(explosion);
    setExplosionAudio(explosionAudioObj);
  }, []);
  
useEffect(() => {
  if (isRunning && count > 0) {
    const timer = setTimeout(() => setCount(count - 1), 1000);
    return () => clearTimeout(timer);
  } else if (count === 0) {
    calculatePoints()
    if (explosionAudio) {
      explosionAudio.play();
    }
    setIsRunning(false);
  }
}, [count, isRunning, explosionAudio, inputs, points]);
  
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

    function calculatePoints(){
        let points = 0
        for(let i = 0; i < inputs.length; i++){
            if(inputs[i].charAt(0).toUpperCase() === number){
                points += 1
            }
            else if(inputs[i].slice(0,3).toLowerCase() === "the"){
                if(inputs[i].charAt(4).toUpperCase() === number){
                points += 1
                }
             }
        }
        setPoints(points)
    }

    const rotation = (count / 60) * 360
  
    return (
      <div>
        <h1> Round: {round}</h1>
        <h1> Points: {points}</h1>
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
    <div className="form-container">
    <div className="form-group">
        {categoriesList.slice((round-1) * cpr,round*cpr).map((category, index) => (
      <div key={index} className="input-group">
      <label className="category-lavel">{category  }</label>
      <input className="category-input"
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
  </div>
      </div>
    );
}
export default MainMenu;
