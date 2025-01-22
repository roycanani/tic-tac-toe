import React from "react";
import Board from "./components/Board";
import "./styles.css";

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>X Mix Drix</h1>
      <Board />
    </div>
  );
};

export default App;
