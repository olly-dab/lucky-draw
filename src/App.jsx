import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import Registration from "./pages/Registration";
import LuckyDraw from "./pages/LuckyDraw";

import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <BrowserRouter>
      <div className={darkMode ? "app dark" : "app"}>
        <Sidebar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div className="main-area">
          <Topbar />

          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route
                path="/registration"
                element={<Registration />}
              />

              <Route
                path="/lucky-draw"
                element={<LuckyDraw />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;