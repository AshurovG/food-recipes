import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import './App.css'
import Card from 'components/Card'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
            <Card title="eda" subtitle="edaaaaaaaaaaaaaaaaa" image='http://s1.1zoom.ru/big7/856/Meat_products_French_511460.jpg' />
        </>
    )
}

export default App
