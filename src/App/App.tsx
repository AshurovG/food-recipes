import * as React from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.scss'
import RecipesPage from 'pages/RecipesPage'
import RecipesDetailedPage from 'pages/RecipesDetailedPage'
import MealPlanPage from 'pages/MealPlanPage';
import AuthForm from 'pages/AuthForm'
import RestaurantsPage from 'pages/RestaurantsPage'

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
                    
                    <Route path='/restaurants' element={<RestaurantsPage/>}/>

                    <Route path='/auth' element={<AuthForm />}></Route>

                    <Route path='*' element={<Navigate to="/" replace />} />
                </Routes>
            </HashRouter>
        </div>
    )
}

export default App

