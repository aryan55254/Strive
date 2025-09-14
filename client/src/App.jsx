import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SavedDiets from "./pages/SavedDiets";
import SavedWorkouts from "./pages/SavedWorkouts";
import GenerateDiet from "./pages/GenenerateDiet";
import GenerateWorkout from "./pages/GenerateWorkout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/saveddiets" element={<SavedDiets />}></Route>
      <Route path="/savedworkouts" element={<SavedWorkouts />}></Route>
      <Route path="/generatediet" element={<GenerateDiet />}></Route>
      <Route path="/generateworkout" element={<GenerateWorkout />}></Route>
    </Routes>
  );
}

export default App;
