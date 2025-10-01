import { Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SavedDiets from "./pages/SavedDiets";
import SavedWorkouts from "./pages/SavedWorkouts";
import GenerateDiet from "./pages/GenenerateDiet";
import GenerateWorkout from "./pages/GenerateWorkout";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Landing />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* --- Protected Routes --- */}
      {/* These remain unchanged */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/saveddiets"
        element={
          <ProtectedRoute>
            <SavedDiets />
          </ProtectedRoute>
        }
      />
      <Route
        path="/savedworkouts"
        element={
          <ProtectedRoute>
            <SavedWorkouts />
          </ProtectedRoute>
        }
      />
      <Route
        path="/generatediet"
        element={
          <ProtectedRoute>
            <GenerateDiet />
          </ProtectedRoute>
        }
      />
      <Route
        path="/generateworkout"
        element={
          <ProtectedRoute>
            <GenerateWorkout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
