// Board.tsx
import React, { useCallback, useState } from "react";
import InitialBoard from "./InitialBoard";
import getValidMoves from "./ValidMoves";
import Square from "./Square";
import "./Board.css";

export type Piece = {
    type: string; // 'P' for Pawn, 'R' for Rook, etc.
    color: "white" | "black";
};

export type SquareType = {
    piece?: Piece;
    highlighted: boolean;
};

const Board: React.FC = () => {
    const [board, setBoard] = useState<SquareType[][]>(InitialBoard);

    const handleSquareClick = useCallback(
        (row: number, col: number) => {
            const selectedSquare = board[row][col];
            const piece = selectedSquare.piece;

            if (!piece) {
                // If no piece is present, reset all highlights
                setBoard((prevBoard) =>
                    prevBoard.map((boardRow) =>
                        boardRow.map((square) => ({ ...square, highlighted: false }))
                    )
                );
                return;
            }

            const validMoves = getValidMoves(row, col, piece, board);

            setBoard((prevBoard) =>
                prevBoard.map((boardRow, r) =>
                    boardRow.map((square, c) => ({
                        ...square,
                        highlighted: validMoves.some((move) => move.row === r && move.col === c),
                    }))
                )
            );
        },
        [board]
    );

    const renderRow = (row: number) => {
        const squares = [];
        for (let col = 0; col < 8; col++) {
            squares.push(
                <Square
                    row={row}
                    col={col}
                    piece={board[row][col]?.piece}
                    isHighlighted={board[row][col].highlighted}
                    onClick={() => handleSquareClick(row, col)}
                />
            );
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

    return renderBoard();
};

export default Board;
