# Scattegories 
Online Popular board game scattegories turned to a Website. Right now the game is single player. 
## Front End 
Front end done with React + Vite. I used Reacts router to navigate through addresses.  
## How to play 
Tutorial found in /tutorial. The aim of the game is to come up with words that fit a category and start with the rolled letter. You have 60 seconds to fill the categories marked with sound(Ticking clock), after that time runs out(explosion) You can roll a new letter and start a new round with new categories.  
## Start Screen: 
Has 3 buttons: Start, Roll and Restart. Roll assigns you a letter, Restart returns you to Start screen and is pressable any time. Start button starts the game. It won't let you start if you haven't rolled a letter. <img width="1440" alt="Screenshot 2024-01-02 at 18 49 35" src="https://github.com/Sekseli3/ScattegoriesFullstack/assets/120391401/0ead8263-e3b4-4124-92f4-d8d5f331d7f1">  
## Playing Screen:
Score system is now implemented (was not it pictures)
<img width="1440" alt="Screenshot 2024-01-02 at 18 54 04" src="https://github.com/Sekseli3/ScattegoriesFullstack/assets/120391401/d0eaad1b-0081-446f-8db4-189d2a8d256a">   TODO: Backend authentication, possibly multiplayer stuff 

## Score count
The game will automatically calculate your points on each round after time runs out. It will grant you points if your inputted word either starts with given letter
or has "the" in front and then the given letter. You don't have to worry about upper and lower case

## Dependencies
Of course you need react + vite, then you need to install react dom router with npm install react-router-dom
