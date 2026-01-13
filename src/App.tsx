import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Game } from "./components/game/game";
import { BoardDesigner } from "./components/designer/board-designer";

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/designer" element={<BoardDesigner />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
