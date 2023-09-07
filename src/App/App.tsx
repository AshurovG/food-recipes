import { useState } from 'react'
// import reactLogo from '../assets/react.svg'
import './App.scss'
import Input from 'components/Input'
// import Card from 'components/Card'
// import Button from 'components/Button'

function App() {
    return (
        <div className="tstw">
            <Input disabled={false} placeholder='fhdkjfsa' onChange={() => console.log(111)} />
        </div>
    )
}

export default App
