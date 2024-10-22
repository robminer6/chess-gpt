import { Piece } from "./Board";
import Color from "./Color";

const movePrompt: string = `Given the following chess board state as a 2D array, 
make the best move for the Black pieces and explain your reasoning. 
This game of chess will end when one of the two kings is captured. 
Please return your response in the following structured format with no additional output:

1. Piece: <piece name, like "Knight", "Pawn", etc.>
2. From: <from square, like "e2">
3. To: <to square, like "e4">
4. Explanation: <explain why you made this move in three sentences or fewer>

Here is the current board state: `;

const stringToPiece = (fullPiece: string, color: Color): Piece | null => {
    switch (fullPiece) {
        case "Pawn":
            return { type: "P", color };
        case "Knight":
            return { type: "N", color };
        case "King":
            return { type: "K", color };
        case "Rook":
            return { type: "R", color };
        case "Bishop":
            return { type: "B", color };
        case "Queen":
            return { type: "Q", color };
        default:
            return null;
    }
};

const stringToRowCol = (square: string): { row: number; col: number } | null => {
    if (square.length < 2) {
        return null;
    }
    let col = null;
    switch (square[0]) {
        case "a":
            col = 0;
            break;
        case "b":
            col = 1;
            break;
        case "c":
            col = 2;
            break;
        case "d":
            col = 3;
            break;
        case "e":
            col = 4;
            break;
        case "f":
            col = 5;
            break;
        case "g":
            col = 6;
            break;
        case "h":
            col = 7;
            break;
        default:
            break;
    }
    if (col === null) {
        return null;
    }
    const row = parseInt(square[1], 10);
    if (isNaN(row)) {
        return null;
    }
    return { row: 8 - row, col };
};

export type AIMove = {
    piece: Piece | null;
    from: { row: number; col: number } | null;
    to: { row: number; col: number } | null;
    explanation: string | null;
};

export { movePrompt, stringToPiece, stringToRowCol };
