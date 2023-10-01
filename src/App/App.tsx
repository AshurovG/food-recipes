import * as React from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import './App.scss'
import RecipesPage from 'pages/RecipesPage'
import RecipesDetailedPage from 'pages/RecipesDetailedPage'
import MealPlanPage from 'pages/MealPlanPage';
import AuthForm from 'pages/AuthForm'
import RestaurantsPage from 'pages/RestaurantsPage'
import ProfilePage from 'pages/ProfilePage'
import rootStore from 'Store/RootStore/instance';

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
  
            <Route path="/restaurants" element={<RestaurantsPage />} />
  
            {!rootStore.auth.isLogin && <Route path="/auth" element={<AuthForm />} />}
  
            {rootStore.auth.isLogin && <Route path="/profile" element={<ProfilePage />} />}
  
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </HashRouter>
      </div>
    );
  }
  
export default observer(App);
