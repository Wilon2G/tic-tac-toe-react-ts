import type { Value } from "./Board";

type SquareProps = {
  value: Value;
  onSquareClick: () => void;
  winnerSqr:string;
};



export default function Square({ value, onSquareClick,winnerSqr }: SquareProps) {
  return (
    <button className="square" onClick={onSquareClick} style={{backgroundColor:winnerSqr}} >
      {value}
    </button>
  );
}
