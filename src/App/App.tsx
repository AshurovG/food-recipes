import { useState } from 'react'
// import reactLogo from '../assets/react.svg'
import './App.scss'
// import Input from 'components/Input'
// import Card from 'components/Card'
// import Button from 'components/Button'
// import CheckBox from 'components/CheckBox'
import MultiDropdown from 'components/MultiDropdown'

type Option = {
    /** Ключ варианта, используется для отправки на бек/использования в коде */
    key: string;
    /** Значение варианта, отображается пользователю */
    value: string;
};

function App() {
    const [value, setValue] = useState<Option[]>([]);
    return (
        <div>app</div>
    )
}

export default App
