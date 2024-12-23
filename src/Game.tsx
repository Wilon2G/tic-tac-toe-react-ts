import { ReactNode, useState } from "react";
import Board from "./Board";

export type Value = "X" | "O" | null;
export type Winner = Value | "Draw";
export type Squares = Value[];

type History = {
  squares: Squares;
  winner: Winner;
}[];

type GameProps = {
  rows: number;
  cols: number;
  target: number;
  // delGame:(gameName:string)=>void;
  title:string;
};

export default function Game({ rows, cols, target }: GameProps) { // Si queremos eliminar el juego desde game tenemos que poder pasarle la función y el título ,delGame,title
  const [history, setHistory] = useState<History>([
    {
      squares: Array(rows * cols).fill(null),
      winner: null,
    },
  ]);
  const [currentMove, setCurrentMove] = useState(0);

  const moves: ReactNode[] = [];

  for (let move = 0; move < history.length; move++) {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    moves.push(
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  function handlePlay(nextSquares: Squares, winner: Winner) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, winner },
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const { squares: currentSquares, winner } = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  // function handleDel() {
  //   delGame(title);             // Función para borrar el juego desde game
  // }

  // const delButtonComponent=<button onClick={handleDel}>Eliminar</button>;      //Botón de delete

  return (
    <div className="game">
      
      <div className="game-board">
        <Board
          rows={rows}
          cols={cols}
          target={target}
          xIsNext={xIsNext}
          squares={currentSquares}
          winner={winner}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
      {/* {delButtonComponent} */}    {/*Para poner el botón de delete dentro de game*/}
    </div>
  );
}
