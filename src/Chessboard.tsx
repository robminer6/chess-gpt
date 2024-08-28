// Chessboard.tsx
import React, { useState } from "react";
import "./Chessboard.css";

type Piece = {
    type: string; // 'P' for Pawn, 'R' for Rook, etc.
    color: "white" | "black";
};

type Square = Piece | null;

const initialBoardSetup: Square[][] = [
    // Initial setup for a chess game
    [
        { type: "R", color: "black" },
        { type: "N", color: "black" },
        { type: "B", color: "black" },
        { type: "Q", color: "black" },
        { type: "K", color: "black" },
        { type: "B", color: "black" },
        { type: "N", color: "black" },
        { type: "R", color: "black" },
    ],
    [
        { type: "P", color: "black" },
        { type: "P", color: "black" },
        { type: "P", color: "black" },
        { type: "P", color: "black" },
        { type: "P", color: "black" },
        { type: "P", color: "black" },
        { type: "P", color: "black" },
        { type: "P", color: "black" },
    ],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [
        { type: "P", color: "white" },
        { type: "P", color: "white" },
        { type: "P", color: "white" },
        { type: "P", color: "white" },
        { type: "P", color: "white" },
        { type: "P", color: "white" },
        { type: "P", color: "white" },
        { type: "P", color: "white" },
    ],
    [
        { type: "R", color: "white" },
        { type: "N", color: "white" },
        { type: "B", color: "white" },
        { type: "Q", color: "white" },
        { type: "K", color: "white" },
        { type: "B", color: "white" },
        { type: "N", color: "white" },
        { type: "R", color: "white" },
    ],
];

const ChessBoard: React.FC = () => {
    const [board, setBoard] = useState<Square[][]>(initialBoardSetup);

    const renderSquare = (row: number, col: number) => {
        const isBlack = (row + col) % 2 === 1;
        const className = isBlack ? "square black" : "square white";
        const piece = board[row][col];

        return (
            <div key={`${row}-${col}`} className={className}>
                {piece && <span className={`piece ${piece.color}Piece`}>{piece.type}</span>}
            </div>
        );
    };

    const renderRow = (row: number) => {
        const squares = [];
        for (let col = 0; col < 8; col++) {
            squares.push(renderSquare(row, col));
        }
        return (
            <div key={row} className="row">
                {squares}
            </div>
        );
    };

    const renderBoard = () => {
        const rows = [];
        for (let row = 0; row < 8; row++) {
            rows.push(renderRow(row));
        }
        return <div className="board">{rows}</div>;
    };

    return <div>{renderBoard()}</div>;
};

export default ChessBoard;
