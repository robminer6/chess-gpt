// Board.tsx
import React, { useCallback, useState } from "react";
import getValidMoves from "./ValidMoves";
import Square from "./Square";
import Color from "./Color";
import "./Board.css";

export type Piece = {
    type: string; // 'P' for Pawn, 'R' for Rook, etc.
    color: Color;
};

export type SquareType = {
    piece: Piece | null;
    highlighted: boolean;
};

interface BoardProps {
    board: SquareType[][];
    setBoard: React.Dispatch<React.SetStateAction<SquareType[][]>>;
}

const Board: React.FC<BoardProps> = ({ board, setBoard }) => {
    const [selectedPiece, setSelectedPiece] = useState<{
        row: number;
        col: number;
        piece: Piece | null;
    } | null>(null);

    const handleSquareClick = useCallback(
        (row: number, col: number) => {
            const selectedSquare = board[row][col];
            const piece = selectedSquare.piece;

            if (selectedPiece) {
                if (board[row][col].highlighted) {
                    // Move the piece to the new square
                    const newBoard = [...board];
                    newBoard[selectedPiece.row][selectedPiece.col].piece = null;
                    newBoard[row][col].piece = selectedPiece.piece;

                    setBoard(
                        newBoard.map((boardRow) =>
                            boardRow.map((square) => ({ ...square, highlighted: false }))
                        )
                    );
                    setSelectedPiece(null);
                } else {
                    // Reset selection and highlights
                    setBoard((prevBoard) =>
                        prevBoard.map((boardRow) =>
                            boardRow.map((square) => ({ ...square, highlighted: false }))
                        )
                    );
                    setSelectedPiece(null);
                }
                return;
            }

            if (!piece) {
                setBoard((prevBoard) =>
                    prevBoard.map((boardRow) =>
                        boardRow.map((square) => ({ ...square, highlighted: false }))
                    )
                );
                return;
            }

            // Highlight valid moves for the selected piece
            const validMoves = getValidMoves(row, col, piece, board);
            setSelectedPiece({ row, col, piece });
            setBoard((prevBoard) =>
                prevBoard.map((boardRow, r) =>
                    boardRow.map((square, c) => ({
                        ...square,
                        highlighted: validMoves.some((move) => move.row === r && move.col === c),
                    }))
                )
            );
        },
        [board, selectedPiece, setBoard]
    );

    const renderRow = (row: number) => {
        const squares = [];
        for (let col = 0; col < 8; col++) {
            squares.push(
                <Square
                    key={`${row}-${col}`}
                    row={row}
                    col={col}
                    piece={board[row][col].piece}
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
