import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const a = "Counter App"
  const [count, setCount] = useState(0);
  const incr = () =>{
    setCount(count+1);
  }
  const decr = () => {
    setCount(count-1);
  }
  const reset = () => {
    setCount(0);
  }
  return (
    <div>
      <h1>{a}</h1>
      <h2>Current Value = {count}</h2>
      <button onClick={incr}>Increment</button>
      <button onClick={decr}>Decrement</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default App 
