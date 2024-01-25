/*
handlePlay function: why the same output for those "console.log"
Game(): why triggered twice every time.
*/

import { useState } from "react";

function Square({ value, onSquareClick }) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}

function Board({ squares, step, onPlay }) {
    const winner = checkWinner(squares);
    let status = winner
        ? ("WINNER: " + winner)
        : step % 2 == 0
            ? "Next: X"
            : "Next: O";
    function handleClick(i) {
        const nextSquares = squares.slice();
        if (nextSquares[i] || winner) {
            return;
        }

        if (step % 2 == 0) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }

        // console.log("nextSquares" + nextSquares);
        // console.log("squares" + squares);
        onPlay(nextSquares);
    }

    return (
        <>
            <h2>{status}</h2>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </>
    );
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [step, setStep] = useState(0);

    const CurrentSquares = history[step];
    console.log('triggered!');

    function handlePlay(square) {
        console.log('1st time:' + history);
        setHistory([...history, square]);
        setStep(step + 1);
        console.log('2nd time:' + history);
    }

    function jumpTo(index) {
        setHistory(history.slice(0, index + 1));
        setStep(index);
    }

    const moves = history.map((square, index) => {
        let msg = "";
        if (index == 0) {
            msg = "Go to start";
        } else {
            msg = "Go to move #" + index;
        }

        return (
            <li key={index}>
                <button title={index} onClick={() => jumpTo(index)}>
                    {msg}
                </button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={CurrentSquares} step={step} onPlay={handlePlay} />
            </div>

            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}





function checkWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
            return squares[a];
        }
    }
    return null;
}
