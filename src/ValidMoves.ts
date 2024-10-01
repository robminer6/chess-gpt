// ValidMoves.ts
import { Piece, SquareType } from "./Board";
import Color from "./Color";

const getValidMoves = (row: number, col: number, piece: Piece, board: SquareType[][]) => {
    switch (piece.type) {
        case "P": // Pawn
            return getPawnMoves(row, col, piece.color, board);

        case "N": // Knight
            return getKnightMoves(row, col, piece.color, board);

        case "K": // King
            return getKingMoves(row, col, piece.color, board);

        case "R": // Rook
            return getRookMoves(row, col, piece.color, board);

        case "B": // Bishop
            return getBishopMoves(row, col, piece.color, board);

        case "Q": // Queen
            return getQueenMoves(row, col, piece.color, board);

        default:
            const moves: { row: number; col: number }[] = [];
            return moves;
    }
};

const getPawnMoves = (row: number, col: number, color: Color, board: SquareType[][]) => {
    const moves: { row: number; col: number }[] = [];
    const direction = color === Color.white ? -1 : 1;
    const nextRow = row + direction;

    if (nextRow >= 0 && nextRow < 8) {
        if (!board[nextRow][col].piece) {
            moves.push({ row: nextRow, col }); // Move forward
            // Some math to determine the starting row for each color
            if (row === -2.5 * direction + 3.5 && !board[nextRow + direction][col].piece) {
                moves.push({ row: nextRow + direction, col }); // Move forward twice
            }
        }
        if (col > 0) {
            if (board[nextRow][col - 1].piece && board[nextRow][col - 1].piece?.color !== color) {
                moves.push({ row: nextRow, col: col - 1 }); // Take piece to the left
            }
        }
        if (col < 7) {
            if (board[nextRow][col + 1].piece && board[nextRow][col + 1].piece?.color !== color) {
                moves.push({ row: nextRow, col: col + 1 }); // Take piece to the right
            }
        }
    }
    return moves;
};

const getKnightMoves = (row: number, col: number, color: Color, board: SquareType[][]) => {
    // Knight moves in L-shape: 2 squares in one direction, 1 square perpendicular
    const moves: { row: number; col: number }[] = [];
    const knightMoves = [
        { r: -2, c: -1 },
        { r: -2, c: 1 },
        { r: -1, c: 2 },
        { r: -1, c: -2 },
        { r: 1, c: 2 },
        { r: 1, c: -2 },
        { r: 2, c: 1 },
        { r: 2, c: -1 },
    ];

    knightMoves.forEach((move) => {
        const newRow = row + move.r;
        const newCol = col + move.c;
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            if (board[newRow][newCol].piece?.color !== color) {
                moves.push({ row: newRow, col: newCol });
            }
        }
    });
    return moves;
};

const getKingMoves = (row: number, col: number, color: Color, board: SquareType[][]) => {
    // King moves one square in any direction
    const moves: { row: number; col: number }[] = [];
    const kingMoves = [
        { r: -1, c: 0 },
        { r: 1, c: 0 },
        { r: 0, c: -1 },
        { r: 0, c: 1 },
        { r: -1, c: -1 },
        { r: -1, c: 1 },
        { r: 1, c: -1 },
        { r: 1, c: 1 },
    ];

    kingMoves.forEach((move) => {
        const newRow = row + move.r;
        const newCol = col + move.c;
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            if (board[newRow][newCol].piece?.color !== color) {
                moves.push({ row: newRow, col: newCol });
            }
        }
    });
    return moves;
};

// If the square is empty or has a piece of the opposite color, adds it to moves. Returns if the square has a piece or not
const addPossibleMove = (
    row: number,
    col: number,
    color: Color,
    board: SquareType[][],
    moves: { row: number; col: number }[]
) => {
    if (!board[row][col].piece || board[row][col].piece?.color !== color) {
        moves.push({ row, col });
    }
    if (board[row][col].piece) {
        return true;
    }
    return false;
};

const getRookMoves = (row: number, col: number, color: Color, board: SquareType[][]) => {
    // Rook moves horizontally and vertically
    const moves: { row: number; col: number }[] = [];

    // Moving down
    for (let r = row + 1; r < 8; r++) {
        if (addPossibleMove(r, col, color, board, moves)) {
            break;
        }
    }
    // Moving up
    for (let r = row - 1; r > -1; r--) {
        if (addPossibleMove(r, col, color, board, moves)) {
            break;
        }
    }
    // Moving right
    for (let c = col + 1; c < 8; c++) {
        if (addPossibleMove(row, c, color, board, moves)) {
            break;
        }
    }
    // Moving left
    for (let c = col - 1; c > -1; c--) {
        if (addPossibleMove(row, c, color, board, moves)) {
            break;
        }
    }
    return moves;
};

const getBishopMoves = (row: number, col: number, color: Color, board: SquareType[][]) => {
    // Bishop moves diagonally
    const moves: { row: number; col: number }[] = [];

    // Moving down and to the right
    for (let r = row + 1, c = col + 1; r < 8 && c < 8; r++, c++) {
        if (addPossibleMove(r, c, color, board, moves)) {
            break;
        }
    }
    // Moving down and to the left
    for (let r = row + 1, c = col - 1; r < 8 && c > -1; r++, c--) {
        if (addPossibleMove(r, c, color, board, moves)) {
            break;
        }
    }
    // Moving up and to the right
    for (let r = row - 1, c = col + 1; r > -1 && c < 8; r--, c++) {
        if (addPossibleMove(r, c, color, board, moves)) {
            break;
        }
    }
    // Moving up and to the left
    for (let r = row - 1, c = col - 1; r > -1 && c > -1; r--, c--) {
        if (addPossibleMove(r, c, color, board, moves)) {
            break;
        }
    }
    return moves;
};

const getQueenMoves = (row: number, col: number, color: Color, board: SquareType[][]) => {
    // Queen moves like both the rook and the bishop
    const moves: { row: number; col: number }[] = getRookMoves(row, col, color, board);
    return moves.concat(getBishopMoves(row, col, color, board));
};

export default getValidMoves;
