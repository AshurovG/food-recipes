import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import reactLogo from '../assets/react.svg'
import './App.scss'
import RecipesPage from 'pages/RecipesPage'
import RecipesDetailedPage from 'pages/RecipesDetailedPage'
// import Input from 'components/Input'
// import Card from 'components/Card'
// import Button from 'components/Button'
// import MultiDropdown from 'components/MultiDropdown'
// import CheckIcon from 'components/icons/CheckIcon';
// import ArrowDownIcon from 'components/icons/ArrowDownIcon';
// import FavoritesIcon from 'components/icons/FavoritesIcon';
// import AccountIcon from 'components/icons/AccountIcon';
// import SearchIcon from 'components/icons/SearchIcon';
// import CheckBox from 'components/CheckBox'

// type Option = {
//     /** Ключ варианта, используется для отправки на бек/использования в коде */
//     key: string;
//     /** Значение варианта, отображается пользователю */
//     value: string;
// };
function App() {
    // const [value, setValue] = useState<Option[]>([]);
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<RecipesPage />} />
                    <Route path='/recipe' element={<RecipesDetailedPage />}></Route>
                </Routes>

            </BrowserRouter>
        </div>
    )
}

export default App

