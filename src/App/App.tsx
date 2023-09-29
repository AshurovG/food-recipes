import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.scss'
import RecipesPage from 'pages/RecipesPage'
import RecipesDetailedPage from 'pages/RecipesDetailedPage'
import MealPlanPage from 'pages/MealPlanPage';

function App() {
    return (
        <div>
            <HashRouter>
                <Routes>
                    <Route path='/' element={<RecipesPage />} />

                    <Route path='/recipe'>
                        <Route path=':id' element={<RecipesDetailedPage />} />
                    </Route>

                    <Route path='/mealplan' element={<MealPlanPage />}/>

                    {/* <Route path='*' element={<Navigate to="/" replace />} /> */}
                </Routes>
            </HashRouter>
        </div>
    )
}

export default App

