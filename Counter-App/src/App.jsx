import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Heading from './Heading'

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
    <div className="App">
      <h1 className='heading'>{a}</h1>
      <Heading count={count}/> {/*value passing*/ }
      <button className='btn' onClick={incr}>Increment</button>
      <button className='btn' onClick={decr}>Decrement</button>
      <button className='btn' onClick={reset}>Reset</button>
    </div>
  )
}

export default App 
