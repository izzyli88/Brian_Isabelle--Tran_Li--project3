import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Rules from "./pages/Rules";
import Game from "./pages/Game";
import HighScores from "./pages/HighScores";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Other Pages */}
        <Route path="/rules" element={<Rules />} />
        <Route path="/game" element={<Game />} />
        <Route path="/highscores" element={<HighScores />} />
      </Routes>
    </Router>
  );
}
export default App;
