import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SavedDiets from "./pages/SavedDiets";
import SavedWorkouts from "./pages/SavedWorkouts";
import GenerateDiet from "./pages/GenenerateDiet";
import GenerateWorkout from "./pages/GenerateWorkout";
import ProtectedRoutes from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route
        path="/saveddiets"
        element={
          <ProtectedRoutes>
            <SavedDiets />
          </ProtectedRoutes>
        }
      ></Route>
      <Route
        path="/savedworkouts"
        element={
          <ProtectedRoutes>
            <SavedWorkouts />
          </ProtectedRoutes>
        }
      ></Route>
      <Route
        path="/generatediet"
        element={
          <ProtectedRoutes>
            <GenerateDiet />
          </ProtectedRoutes>
        }
      ></Route>
      <Route
        path="/generateworkout"
        element={
          <ProtectedRoutes>
            <GenerateWorkout />
          </ProtectedRoutes>
        }
      ></Route>
    </Routes>
  );
}

export default App;
