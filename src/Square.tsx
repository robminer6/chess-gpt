// Square.tsx
import React from "react";
import { Piece } from "./Board";

interface SquareProps {
    row: number;
    col: number;
    piece?: Piece;
    isHighlighted?: boolean;
    onClick?: () => void;
}

const pieceSymbols: { [key: string]: string } = {
    P: "♙", // Pawn
    R: "♖", // Rook
    N: "♘", // Knight
    B: "♗", // Bishop
    Q: "♕", // Queen
    K: "♔", // King
};

const Square: React.FC<SquareProps> = React.memo(
    ({ row, col, piece, isHighlighted = false, onClick }) => {
        const handleClick = () => {
            if (onClick) {
                onClick();
            }
        };

        return (
            <div
                onClick={handleClick}
                key={`${row}-${col}`}
                className={`square ${row % 2 === col % 2 ? "white" : "black"} ${
                    isHighlighted ? "highlighted" : null
                }`}
            >
                {piece && (
                    <span className={`piece ${piece.color}Piece`}>{pieceSymbols[piece.type]}</span>
                )}
            </div>
        );
    }
);

export default Square;
