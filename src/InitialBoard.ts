// InitialBoard.ts
import { SquareType } from "./Board";
import Color from "./Color";

const InitialBoard: SquareType[][] = [
    // Initial setup for a chess game
    [
        { piece: { type: "R", color: Color.black }, highlighted: false },
        { piece: { type: "N", color: Color.black }, highlighted: false },
        { piece: { type: "B", color: Color.black }, highlighted: false },
        { piece: { type: "Q", color: Color.black }, highlighted: false },
        { piece: { type: "K", color: Color.black }, highlighted: false },
        { piece: { type: "B", color: Color.black }, highlighted: false },
        { piece: { type: "N", color: Color.black }, highlighted: false },
        { piece: { type: "R", color: Color.black }, highlighted: false },
    ],
    [
        { piece: { type: "P", color: Color.black }, highlighted: false },
        { piece: { type: "P", color: Color.black }, highlighted: false },
        { piece: { type: "P", color: Color.black }, highlighted: false },
        { piece: { type: "P", color: Color.black }, highlighted: false },
        { piece: { type: "P", color: Color.black }, highlighted: false },
        { piece: { type: "P", color: Color.black }, highlighted: false },
        { piece: { type: "P", color: Color.black }, highlighted: false },
        { piece: { type: "P", color: Color.black }, highlighted: false },
    ],
    [
        { piece: { type: "P", color: Color.white }, highlighted: false },
        { piece: { type: "P", color: Color.black }, highlighted: false },
        { highlighted: false },
        { highlighted: false },
        { highlighted: false },
        { highlighted: false },
        { highlighted: false },
        { piece: { type: "P", color: Color.white }, highlighted: false },
    ],
    [
        { highlighted: false },
        { piece: { type: "B", color: Color.black }, highlighted: false },
        { highlighted: false },
        { highlighted: false },
        { piece: { type: "Q", color: Color.black }, highlighted: false },
        { highlighted: false },
        { highlighted: false },
        { highlighted: false },
    ],
    [
        { highlighted: false },
        { piece: { type: "P", color: Color.black }, highlighted: false },
        { highlighted: false },
        { highlighted: false },
        { piece: { type: "R", color: Color.white }, highlighted: false },
        { highlighted: false },
        { highlighted: false },
        { highlighted: false },
    ],
    [
        { piece: { type: "P", color: Color.black }, highlighted: false },
        { piece: { type: "K", color: Color.black }, highlighted: false },
        { piece: { type: "P", color: Color.white }, highlighted: false },
        { highlighted: false },
        { piece: { type: "P", color: Color.black }, highlighted: false },
        { highlighted: false },
        { highlighted: false },
        { piece: { type: "P", color: Color.black }, highlighted: false },
    ],
    [
        { piece: { type: "P", color: Color.white }, highlighted: false },
        { piece: { type: "P", color: Color.white }, highlighted: false },
        { piece: { type: "P", color: Color.white }, highlighted: false },
        { piece: { type: "P", color: Color.white }, highlighted: false },
        { piece: { type: "P", color: Color.white }, highlighted: false },
        { piece: { type: "P", color: Color.white }, highlighted: false },
        { piece: { type: "P", color: Color.white }, highlighted: false },
        { piece: { type: "P", color: Color.white }, highlighted: false },
    ],
    [
        { piece: { type: "R", color: Color.white }, highlighted: false },
        { piece: { type: "N", color: Color.white }, highlighted: false },
        { piece: { type: "B", color: Color.white }, highlighted: false },
        { piece: { type: "Q", color: Color.white }, highlighted: false },
        { piece: { type: "K", color: Color.white }, highlighted: false },
        { piece: { type: "B", color: Color.white }, highlighted: false },
        { piece: { type: "N", color: Color.white }, highlighted: false },
        { piece: { type: "R", color: Color.white }, highlighted: false },
    ],
];

export default InitialBoard;
