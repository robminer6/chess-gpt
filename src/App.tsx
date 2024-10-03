import React, { useState } from "react";
import "./App.css";
import Board from "./Board";
import InitialBoard from "./InitialBoard";

function App() {
    const [board, setBoard] = useState(InitialBoard);

    const resetBoard = () => {
        setBoard(InitialBoard);
    };

    return (
        <div className="app-container">
            {" "}
            {/* Centering both button and board */}
            <button className="reset-button" onClick={resetBoard}>
                Reset Board
            </button>
            <Board board={board} setBoard={setBoard} />
        </div>
    );
}

export default App;
