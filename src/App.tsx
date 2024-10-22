import { useState } from "react";
import "./App.css";
import Board from "./Board";
import Color from "./Color";
import InitialBoard from "./InitialBoard";
import { AIMove } from "./apiUtils";

function App() {
    const [board, setBoard] = useState(InitialBoard);
    const [winner, setWinner] = useState<Color | null>(null);
    const [aiMove, setAIMove] = useState<AIMove | null>(null);

    const resetBoard = () => {
        setBoard(InitialBoard);
        setWinner(null);
        setAIMove(null);
    };

    return (
        <div className="app-container">
            <header className="header-message">
                <h1>Welcome to ChessGPT</h1>
                <p>
                    Think you have what it takes to beat ChatGPT at chess? Think again! Overcoming
                    the AI's blatant cheating is a Herculean task for even the best grandmasters.
                </p>
                <strong>Rules:</strong>
                <br />
                If ChatGPT says that it wants to move a piece that doesn't exist, it will be spawned
                in.
                <br />
                The game ends when either King is captured. Checkmate and stalemate do not exist.
                <br />
                ChatGPT needs some time to come up with its moves. Don't make another until it
                responds to you!
            </header>
            {winner && (
                <div className="winner-message">
                    {winner === Color.white
                        ? "White Wins! Click reset to play again."
                        : "Black Wins! Click reset to play again."}
                </div>
            )}
            <div className="board-and-explanation">
                <Board
                    board={board}
                    setBoard={setBoard}
                    winner={winner}
                    setWinner={setWinner}
                    setAIMove={setAIMove}
                />
                <div className="right-side">
                    <div className="ai-explanation">
                        <h2>ChessGPT's Move Explanation</h2>
                        {aiMove ? (
                            <p>
                                <strong>Piece:</strong> {aiMove?.piece?.type ?? "Unknown"} <br />
                                <strong>From:</strong>{" "}
                                {aiMove?.from
                                    ? `${String.fromCharCode(97 + aiMove.from.col)}${
                                          8 - aiMove.from.row
                                      }`
                                    : "Unknown"}{" "}
                                <br />
                                <strong>To:</strong>{" "}
                                {aiMove?.to
                                    ? `${String.fromCharCode(97 + aiMove.to.col)}${
                                          8 - aiMove.to.row
                                      }`
                                    : "Unknown"}{" "}
                                <br />
                                <strong>Explanation:</strong> {aiMove.explanation}
                            </p>
                        ) : (
                            <p>
                                Make your first move and ChessGPT will respond. It needs some time
                                to come up with its move, so{" "}
                                <strong>don't make another until it responds to you!</strong>
                            </p>
                        )}
                    </div>
                    <button className="reset-button" onClick={resetBoard}>
                        Reset Board
                    </button>
                </div>
            </div>
            <footer className="footer">
                <p>Created by Rob Miner</p>
                <p>
                    <a
                        href="https://github.com/robminer6/chess-gpt"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Source code
                    </a>
                    {" | "}
                    <a
                        href="https://robminer6.github.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        My website
                    </a>
                    {" | "}
                    <a
                        href="https://www.linkedin.com/in/rob-miner/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        LinkedIn
                    </a>
                </p>
            </footer>
        </div>
    );
}

export default App;
