import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import reactLogo from '../assets/react.svg'
import './App.scss'
import RecipesPage from 'pages/RecipesPage'
import RecipesDetailedPage from 'pages/RecipesDetailedPage'
function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<RecipesPage />} />
                    <Route path='/recipe'>
                        <Route path=':id' element={<RecipesDetailedPage />} />
                    </Route>
                    <Route path='*' element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App

