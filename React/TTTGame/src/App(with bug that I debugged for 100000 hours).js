/*A few questions:
1. why setStep(history.length - 1) cann't work? But has to use index? the relationship between step and history.length-1 always exists.
2. why the output for line 20  and line 24 are the same??? after setHistory and setStep.
3. why const currentSquares = history[step] line 13 executes 2 times each time??

*/
import { useState } from "react"


export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [step, setStep] = useState(0)
  const currentSquares = history[step]
  function handlePlay(square) {
    setHistory([...history, square]);
    setStep(step + 1);
  }

  function jumpTo(count) {
    console.log(history[step])
    setHistory(history.slice(0, count + 1),)
    setStep(history.length - 1)

    console.log(history[step])
  }

  const moves = history.map((square, index) => {
    let msg = '';
    if (index == 0) {
      msg = 'Go to start';
    }
    else {
      msg = 'Go to move #' + index
    }

    return (
      <li key={index}>
        <button title={index} onClick={() => jumpTo(index)}>{msg}</button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquares} step={step} onPlay={handlePlay} />
      </div>

      <div className="game-info">
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  )

}


function Square({ value, onSquareClick }) {
  return <button
    className="square"
    onClick={onSquareClick}>{value}</button>
}

function Board({ squares, step, onPlay }) {
  const winner = checkWinner(squares)
  let status = winner ? ('WINNER: ' + winner) : (step % 2 == 0 ? 'Next: X' : 'Next: O');
  function handleClick(i) {
    const nextSquares = squares.slice();
    if (nextSquares[i] || winner) {
      return
    }
    if (step % 2 == 0) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares)
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


function checkWinner(squares) {
  return null;
}

// function checkWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],

//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],

//     [0, 4, 8],
//     [2, 4, 6]
//   ]
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && (squares[a] == squares[b]) && (squares[a] == squares[c])) {
//       return squares[a];
//     }
//   }
//   return null;
// }