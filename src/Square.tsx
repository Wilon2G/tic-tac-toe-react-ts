import type { Value } from "./Board";

type SquareProps = {
  value: Value;
  onSquareClick: () => void;
};

export default function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
