// ValidMoves.ts
import { Piece, SquareType } from "./Board";

const getValidMoves = (row: number, col: number, piece: Piece, board: SquareType[][]) => {
    // if (!piece) return null;
    switch (piece.type) {
        case "P": // Pawn
            return getPawnMoves(row, col, piece, board);

        case "R": // Rook
            return getRookMoves(row, col, piece, board);

        case "N": // Knight
            return getKnightMoves(row, col, piece, board);

        case "B": // Bishop
            return getBishopMoves(row, col, piece, board);

        case "Q": // Queen
            return getQueenMoves(row, col, piece, board);

        case "K": // King
            return getKingMoves(row, col, piece, board);

        default:
            const moves: { row: number; col: number }[] = [];
            return moves;
    }
};

const getPawnMoves = (row: number, col: number, piece: Piece, board: SquareType[][]) => {
    const moves: { row: number; col: number }[] = [];
    const direction = piece.color === "white" ? -1 : 1;
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
            if (
                board[nextRow][col - 1].piece &&
                board[nextRow][col - 1].piece?.color !== piece.color
            ) {
                moves.push({ row: nextRow, col: col - 1 }); // Take piece to the left
            }
        }
        if (col < 7) {
            if (
                board[nextRow][col + 1].piece &&
                board[nextRow][col + 1].piece?.color !== piece.color
            ) {
                moves.push({ row: nextRow, col: col + 1 }); // Take piece to the right
            }
        }
    }

    return moves;
};

const getRookMoves = (row: number, col: number, piece: Piece, board: SquareType[][]) => {
    // Rook moves horizontally and vertically
    const moves: { row: number; col: number }[] = [];

    // Moving down
    for (let r = row + 1; r < 8; r++) {
        if (!board[r][col].piece || board[r][col].piece?.color !== piece.color) {
            moves.push({ row: r, col });
        }
        if (board[r][col].piece) {
            break;
        }
    }

    // Moving up
    for (let r = row - 1; r > -1; r--) {
        if (!board[r][col].piece || board[r][col].piece?.color !== piece.color) {
            moves.push({ row: r, col });
        }
        if (board[r][col].piece) {
            break;
        }
    }

    // Moving right
    for (let c = col + 1; c < 8; c++) {
        if (!board[row][c].piece || board[row][c].piece?.color !== piece.color) {
            moves.push({ row, col: c });
        }
        if (board[row][c].piece) {
            break;
        }
    }

    // Moving left
    for (let c = col - 1; c > -1; c--) {
        if (!board[row][c].piece || board[row][c].piece?.color !== piece.color) {
            moves.push({ row, col: c });
        }
        if (board[row][c].piece) {
            break;
        }
    }

    return moves;
};

const getKnightMoves = (row: number, col: number, piece: Piece, board: SquareType[][]) => {
    const moves: { row: number; col: number }[] = [];
    // Knight moves in L-shape: 2 squares in one direction, 1 square perpendicular
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
            moves.push({ row: newRow, col: newCol });
        }
    });
    return moves;
};

const getBishopMoves = (row: number, col: number, piece: Piece, board: SquareType[][]) => {
    const moves: { row: number; col: number }[] = [];
    // Bishop moves diagonally
    // Implement logic to check the diagonal moves (like the rook but in diagonals)
    // Example:
    for (let r = row + 1, c = col + 1; r < 8 && c < 8; r++, c++) {
        if (board[r][c].piece) break;
        moves.push({ row: r, col: c });
    }
    // Add similar logic for other diagonal directions
    return moves;
};

const getQueenMoves = (row: number, col: number, piece: Piece, board: SquareType[][]) => {
    // Queen moves like both the rook and the bishop
    const moves: { row: number; col: number }[] = getRookMoves(row, col, piece, board);
    return moves.concat(getBishopMoves(row, col, piece, board));
};

const getKingMoves = (row: number, col: number, piece: Piece, board: SquareType[][]) => {
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
            moves.push({ row: newRow, col: newCol });
        }
    });
    return moves;
};

export default getValidMoves;
