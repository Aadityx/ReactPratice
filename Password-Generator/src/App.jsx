import { useCallback, useState, useEffect } from 'react'
import './App.css'

function App() {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(8)
  const [includeNumerics, setIncludeNumerics] = useState(false)
  const [includesymbols, setIncludeSymbols] = useState(false)

  const generatePassword = useCallback(() => {
    let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (includeNumerics) {
      charset += '0123456789'
    }
    if (includesymbols) {
      charset += '!@#$%^&*()_+~`|}{[]:;?><,./-='
    }

    let generatedPassword = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      generatedPassword += charset[randomIndex]
    }
    setPassword(generatedPassword)
  }, [includeNumerics, includesymbols, length])

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
  }

  useEffect(() => {
    generatePassword()
  }, [generatePassword])

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <div>
        <label>
          Length:
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            min="4"
            max="128"
          />
        </label>
      </div>
      <div>
        <label>
          Include Numbers:
          <input
            type="checkbox"
            checked={includeNumerics}
            onChange={(e) => setIncludeNumerics(e.target.checked)}
          />
        </label>
      </div>
      <div>
        <label>
          Include Symbols:
          <input
            type="checkbox"
            checked={includesymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
        </label>
      </div>
      <button onClick={generatePassword}>Generate Password</button>
      <div>
        <h2>Generated Password:</h2>
        <p>{password}</p>
        <button onClick={() => copyPassword()}>Copy to Clipboard</button>
      </div>
    </div>
  )
}

export default App
