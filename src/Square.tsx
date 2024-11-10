import type { Value } from "./Board";

type SquareProps = {
  value: Value;
  onSquareClick: () => void;
  winnerSqr:string;
  rows:number;
};



export default function Square({ value, onSquareClick,winnerSqr,rows }: SquareProps) {

const size=`${100 / rows}%` ;

  return (
    <button className="square" onClick={onSquareClick} style={{backgroundColor:winnerSqr, flexBasis:size} } >
      {value}
    </button>
  );
}
