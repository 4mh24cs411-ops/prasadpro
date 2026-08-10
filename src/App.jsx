import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardPage from './pages/DashboardPage';
import MealPlannerPage from './pages/MealPlannerPage';
import IngredientScannerPage from './pages/IngredientScannerPage';
import NutritionVideosPage from './pages/NutritionVideosPage';
import RecipesPage from './pages/RecipesPage';
import GroceryListPage from './pages/GroceryListPage';
import NutritionTrackerPage from './pages/NutritionTrackerPage';
import ProfilePage from './pages/ProfilePage';

// Premium Authentication Flow Pages
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import GoalSelectionPage from './pages/GoalSelectionPage';

export default function App() {
  return (
    <Routes>
      {/* Root Route Defaults to Login Flow as Starting Page */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Standalone Authentication & Onboarding Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/goal-selection" element={<GoalSelectionPage />} />

      {/* Main Application Layout & Features (Accessible after login or via navigation) */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/meal-planner" element={<MealPlannerPage />} />
        <Route path="/ingredient-scanner" element={<IngredientScannerPage />} />
        <Route path="/nutrition-videos" element={<NutritionVideosPage />} />
        <Route path="/recipes" element={<Navigate to="/ingredient-scanner" replace />} />
        <Route path="/grocery" element={<GroceryListPage />} />
        <Route path="/tracker" element={<NutritionTrackerPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Route>
    </Routes>
  );
}
