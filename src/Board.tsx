import Square from "./Square";
import BoardRow from "./BoardRow";
import type { Squares, Winner } from "./Game";
import { calculateWinner } from "./utils/winner";
import { useCallback, useEffect, useState } from "react";

type BoardProps = {
  rows: number;
  cols: number;
  target: number;
  xIsNext: boolean;
  squares: Squares;
  onPlay: (nextSquares: Squares, winner: Winner) => void;
  winner: Winner;
};

export default function Board({
  rows,
  cols,
  target,
  xIsNext,
  squares,
  onPlay,
  winner,
}: BoardProps) {
  const [timeLeft, setTimeLeft] = useState(10);

  const [winPositions, setWinPositions] = useState<(number|string)[]>([]);


  const makeMove = useCallback(
    (index: number) => {
      if (squares[index] || winner) {
        return;
      }
      const value = xIsNext ? "X" : "O";
      const nextSquares = squares.map((v, i) => (i === index ? value : v));

      


        const arr = calculateWinner({  //Súper chapuza, calculateWinner devuelve o null o ["Draw"] o ["ganador X u O", posicion n1, posicion n2, posicion n3...]
        squares: nextSquares,           //Probablemente sería mejor pasar el estado a calculateWinner o algo no se
        lastMove: index,
        cols,
        target,
      });
      
      let actualWinner: Winner=null;
      if (arr==null) {
        actualWinner=null;    
        setWinPositions([]);  //Otra chapuza, para reseterar el estado, si no hay ganador nos aseguramos que no hay nada en el arrag WinPositions
      }
      else{
        if (arr[0]==="X") {
          actualWinner="X";
          setWinPositions(arr.slice(1)); //Seguimos con chapuzas, sólo cuando gana X u O hacemos un slice del array (para no guardar el valor, sólo las posiciones)
        }
        if(arr[0]==="O"){
          actualWinner="O";
          setWinPositions(arr.slice(1)); //Y seteamos el estado de winPositions
        }
        if (arr[0]==="Draw") {
          actualWinner="Draw";
          setWinPositions([]); //La misma chapuza de antes para reiniciar el array
        }
      }

      

      onPlay(nextSquares, actualWinner);
    },
    [cols, onPlay, squares, target, winner, xIsNext]
  );

  const randomMove = useCallback(() => {
    const emptySquares = squares
      .map((v, i) => (v === null ? i : -1))
      .filter((v) => v !== -1);
    const randomIndex =
      emptySquares[Math.floor(Math.random() * emptySquares.length)];

    return makeMove(randomIndex);
  }, [squares, makeMove]);

  useEffect(() => {
    if (winner) {
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        return prevTimeLeft - 1;
      });
    }, 1000);
    return () => {
      clearInterval(timer);
      setTimeLeft(10);
    };
  }, [squares, winner]); // squares no la detecta como dependencia pero es importante para reiniciar el tiempo

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(10);
      randomMove();
    }
  }, [timeLeft, randomMove]);

  return (
    <>
      <div className="status">
        {winner
          ? winner === "Draw"
            ? "It's a draw!"
            : "Winner: " + winner
          : "Next player: " + (xIsNext ? "X" : "O")}
        <br />
        {!winner && <>Time left: {timeLeft}</>}
      </div>
      {Array(rows)
        .fill(null)
        .map((_v, r) => (
          <BoardRow key={r}>
            {Array(cols)
              .fill(null)
              .map((_v, c) => {
                const key = c + cols * r;
                return (
                  <Square
                    winnerSqr= {(winPositions.includes(key)?"red":"")} //Busca que el cuadrado (key es el número de cuadrado) esté en el array de cuadrados ganadores
                    key={key}
                    value={squares[key]}
                    onSquareClick={() => makeMove(key)}
                    rows={rows}
                  />
                );
              })}
          </BoardRow>
        ))}
    </>
  );
}
