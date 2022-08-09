
import './App.css';
import Die from './die';
import React, { useEffect } from 'react';
import { nanoid } from "nanoid";


function App() {
  const [sec, setsec] = React.useState(0)
  const [min, setmin] = React.useState(0)
  const [dice, setdice] = React.useState(allnewdice())
  const [ten, setten] = React.useState(false)
  var timer;
  React.useEffect(() => {
    timer = setInterval(() => {
      setsec(sec + 1);
      if (sec === 59) {
        setmin(min + 1);
        setsec(0)
      }
    },1000)
    return () => clearInterval(timer)
  })
  const stop = () => {
    clearInterval(timer)
  }
  React.useEffect(
    ()=>{
      if(ten)
      stop()
    }
  )
  React.useEffect(() => {
    const all = dice.every((die) => die.isHeld === true)
    const first = dice[0].value
    const allsame = dice.every((die) => die.value === first)
    if (all && allsame) {
      setten(true)
      
    }
  }, [dice])
  function allnewdice() {
    const newdice = []
    for (let i = 0; i < 10; i++) {
      newdice.push({
        id: nanoid(),
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      })
    }
    return newdice
  }
  
  function roll() {
    if (!ten) {
      setdice(old => old.map(die => {
        return die.isHeld ? die : {
          id: nanoid(),
          value: Math.ceil(Math.random() * 6),
          isHeld: false
        }
      }))

      setcount(prev => (prev + 1))
    }
    else {
       setcount(0)
       setsec(0)
       setmin(0)
     setten(false)
      setdice(allnewdice())
    }
  }
  function holddice(id) {
    setdice(old => old.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld } : die
    }))
  }
 
  const [count, setcount] = React.useState(0)
  const diceelements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holddice={() => holddice(die.id)} />)
  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='diceco'>
        {diceelements}
      </div>
      <button className='roll'
        onClick={roll}>{ten ? "New game" : "Roll"}</button>
      <button className='roll' > score : {count}</button>
      <button className='roll' > time : {min < 10 ? "0" + min : min}:{sec}</button>
    </main>

  )
}


export default App;
