import React, { useState, useEffect, useContext} from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom'
import './App.css'
import MainMenu from './MainMenu'
import Tutorial from './tutorial' // Fix the file name casing


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
