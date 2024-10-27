import { useRef, useState } from "react";
import type { Config } from "./App";

type ConfigProps = {
  addGame: (rows: number, cols: number, target: number) => void;
  
};

export default function Config({ addGame }: ConfigProps) {
  const [disabledButton, setDisabledButton] = useState(false);
  const rowsRef = useRef<HTMLInputElement>(null);
  const colsRef = useRef<HTMLInputElement>(null);
  const targetRef = useRef<HTMLInputElement>(null);

  function handleClick(event: React.MouseEvent) {
    event.preventDefault(); // necesario si se está usando un formulario
    const rows = parseInt(rowsRef.current!.value, 10);
    const cols = parseInt(colsRef.current!.value, 10);
    const target = parseInt(targetRef.current!.value, 10);
    addGame(rows, cols, target);
  }

  function isValidConfig() {
    const rows = parseInt(rowsRef.current!.value, 10);
    const cols = parseInt(colsRef.current!.value, 10);
    const target = parseInt(targetRef.current!.value, 10);
    return !isNaN(rows) && !isNaN(cols) && !isNaN(target);
  }

  function handleChange() {
    setDisabledButton(!isValidConfig());
  }

  return (
    <form>
      <label>
        Rows:
        <input
          type="number"
          min={1}
          max={10}
          defaultValue={3}
          ref={rowsRef}
          onChange={handleChange}
        />
      </label>
      <label>
        Cols:
        <input
          type="number"
          min={1}
          max={10}
          defaultValue={3}
          ref={colsRef}
          onChange={handleChange}
        />
      </label>
      <label>
        Target:
        <input
          type="number"
          min={1}
          max={5}
          defaultValue={3}
          ref={targetRef}
          onChange={handleChange}
        />
      </label>
      <button onClick={handleClick} disabled={disabledButton}>
        Add game
      </button>
    </form>
  );
}
