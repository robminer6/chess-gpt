import React, { useState } from "react";
import getValidMoves from "./validMoves";
import Square from "./Square";
import Color from "./Color";
import { movePrompt, stringToPiece, stringToRowCol, AIMove } from "./apiUtils";
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
    winner: Color | null;
    setWinner: React.Dispatch<React.SetStateAction<Color | null>>;
    setAIMove: React.Dispatch<React.SetStateAction<AIMove | null>>;
}

const Board: React.FC<BoardProps> = ({ board, setBoard, winner, setWinner, setAIMove }) => {
    const [selectedPiece, setSelectedPiece] = useState<{
        row: number;
        col: number;
        piece: Piece | null;
    } | null>(null);

    const handleSquareClick = async (row: number, col: number) => {
        if (winner) return;

        const selectedSquare = board[row][col];
        const piece = selectedSquare.piece;

        if (selectedPiece) {
            if (board[row][col].highlighted) {
                // Move the piece to the new square
                const newBoard = [...board];

                const destinationSquare = newBoard[row][col];
                if (
                    destinationSquare.piece?.type === "K" &&
                    destinationSquare.piece?.color !== selectedPiece.piece?.color
                ) {
                    setWinner(selectedPiece.piece ? selectedPiece.piece.color : null);
                }

                newBoard[selectedPiece.row][selectedPiece.col].piece = null;

                if (selectedPiece.piece?.type === "P" && (row === 0 || row === 7)) {
                    // Automatically promote to queen
                    newBoard[row][col].piece = { type: "Q", color: selectedPiece.piece.color };
                } else {
                    newBoard[row][col].piece = selectedPiece.piece;
                }

                setBoard(
                    newBoard.map((boardRow) =>
                        boardRow.map((square) => ({ ...square, highlighted: false }))
                    )
                );

                setSelectedPiece(null);
                if (!winner) {
                    setTimeout(() => null, 10);
                    applyAIMove(await getAIMove(newBoard));
                }
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
    };

    // Sends the board state to the Netlify function, which calls the ChatGPT API
    async function getAIMove(board: SquareType[][]): Promise<AIMove | null> {
        const boardState = JSON.stringify(board); // Convert board to a string representation
        try {
            const response = await fetch("/.netlify/functions/gpt-move", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "gpt-4", // I can use "gpt-3.5-turbo" instead if 4 is too $$$
                    messages: [
                        {
                            role: "system",
                            content:
                                "You are an advanced AI playing a game of chess with the Black pieces. You are highly skilled and capable of analyzing the game to make the best moves for Black.",
                        },
                        {
                            role: "user",
                            content: `${movePrompt}${boardState}`,
                        },
                    ],
                    max_tokens: 100, // Adjust tokens as needed
                }),
            });
            // TODO: Add all the AI's previous moves to the assistant role in the API call

            if (!response.ok) {
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data.choices[0].message.content);
            return extractMoveFromResponse(data.choices[0].message.content);
        } catch (error) {
            console.error("Error in getAIMove:", error);
            return null;
        }
    }

    function extractMoveFromResponse(responseText: string): AIMove {
        const pieceRegex = /Piece:\s(.+)/;
        const fromRegex = /From:\s(.+)/;
        const toRegex = /To:\s(.+)/;
        const explanationRegex = /Explanation:\s(.+)/;

        return {
            piece: stringToPiece(pieceRegex.exec(responseText)?.[1] ?? "", Color.black),
            from: stringToRowCol(fromRegex.exec(responseText)?.[1] ?? ""),
            to: stringToRowCol(toRegex.exec(responseText)?.[1] ?? ""),
            explanation: explanationRegex.exec(responseText)?.[1] ?? "",
        };
    }

    function applyAIMove(move: AIMove | null) {
        if (move === null) {
            setAIMove({
                piece: null,
                from: null,
                to: null,
                explanation: "I had trouble contacting OpenAI's API. Free turn for you!",
            });
            return;
        }

        // Extract row, col, and piece from the move
        const { piece, from, to } = move;

        if (!piece || !from || !to) {
            setAIMove({
                piece,
                from,
                to,
                explanation: "Some of my answer couldn't be parsed. You got lucky!",
            });
            return;
        }

        const newBoard = [...board];
        // Remove piece from old position if it exists there
        if (
            newBoard[from.row][from.col].piece?.type === piece.type &&
            newBoard[from.row][from.col].piece?.color === piece.color
        ) {
            newBoard[from.row][from.col].piece = null;
        }

        const destinationSquare = newBoard[to.row][to.col];
        if (
            destinationSquare.piece?.type === "K" &&
            destinationSquare.piece?.color !== piece.color
        ) {
            setWinner(piece.color);
        }

        // Create piece at new position
        destinationSquare.piece = piece;

        // Update the board state
        setBoard(
            newBoard.map((boardRow) =>
                boardRow.map((square) => ({ ...square, highlighted: false }))
            )
        );
        setAIMove(move);
    }

    return (
        <div className="board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((square, colIndex) => (
                        <Square
                            key={`${rowIndex}-${colIndex}`}
                            row={rowIndex}
                            col={colIndex}
                            piece={square.piece}
                            isHighlighted={square.highlighted}
                            onClick={() => handleSquareClick(rowIndex, colIndex)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;
