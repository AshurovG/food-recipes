import * as React from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import './App.scss'
import RecipesPage from 'pages/RecipesPage'
import RecipesDetailedPage from 'pages/RecipesDetailedPage'
import MealPlanPage from 'pages/MealPlanPage';
import AuthForm from 'pages/AuthForm'
// import RestaurantsPage from 'pages/RestaurantsPage'
import AboutPage from 'pages/AboutPage'
import ProfilePage from 'pages/ProfilePage'
import FavoritesPage from 'pages/FavoritesPage'
import rootStore from 'Store/RootStore/instance';

if (!localStorage.getItem('isLogin')) {
  rootStore.auth.setIsLogin(false)
  localStorage.setItem('isLogin', 'false')
  const userInfo = {
    username: '',
    password: '',
    fullname: '',
    spoonacularUsername: '',
    spoonacularPassword: '',
    hash: ''
  }

  localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

function App() {
    return (
      <div>
        <HashRouter>
          <Routes>
            <Route path="/" element={<RecipesPage />} />
  
            <Route path="/recipe">
              <Route path=":id" element={<RecipesDetailedPage />} />
            </Route>
  
            <Route path="/mealplan" element={<MealPlanPage />} />
  
            <Route path="/about" element={<AboutPage />} />
  
            {!rootStore.auth.isLogin && <Route path="/auth" element={<AuthForm />} />}
  
            {rootStore.auth.isLogin && <Route path="/profile" element={<ProfilePage />} />}

            {rootStore.auth.isLogin &&<Route path='/favorites' element={<FavoritesPage/>}/>}
  
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
      </div>
    );
  }
  
export default observer(App);
