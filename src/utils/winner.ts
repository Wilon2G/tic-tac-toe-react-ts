import { Squares } from "../Game";

type calculateWinnerParams = {
  squares: Squares;
  lastMove: number;
  cols: number;
  target: number;
};


export function calculateWinner({
  squares,
  lastMove,
  cols,
  target,
}: calculateWinnerParams): (string | number)[] | null {
  const value = squares[lastMove];
  if (!value) {
    return null;
  }

  const row = Math.floor(lastMove / cols);
  const col = lastMove % cols;

  const isSameRow = (move: number) => Math.floor(move / cols) === row;
  const isSameCol = (move: number) => move % cols === col;
  const isSameDiagonal = (move: number) =>
    Math.floor(move / cols) - row === (move % cols) - col;
  const isSameAntiDiagonal = (move: number) =>
    Math.floor(move / cols) - row === -((move % cols) - col);

  const nextHorizontal = (move: number) => move + 1;
  const prevHorizontal = (move: number) => move - 1;
  const nextVertical = (move: number) => move + cols;
  const prevVertical = (move: number) => move - cols;
  const nextDiagonal = (move: number) => move + cols + 1;
  const prevDiagonal = (move: number) => move - cols - 1;
  const nextAntiDiagonal = (move: number) => move + cols - 1;
  const prevAntiDiagonal = (move: number) => move - cols + 1;

  const horizontal = calculateSameValues(
    squares,
    lastMove,
    nextHorizontal,
    prevHorizontal,
    isSameRow
  );
  if (horizontal.length >= target) {
    return [value, ...horizontal.slice(0, 3)];
  }

  const vertical = calculateSameValues(
    squares,
    lastMove,
    nextVertical,
    prevVertical,
    isSameCol
  );
  if (vertical.length >= target) {
    return [value, ...vertical.slice(0, 3)];
  }

  const diagonal = calculateSameValues(
    squares,
    lastMove,
    nextDiagonal,
    prevDiagonal,
    isSameDiagonal
  );
  if (diagonal.length >= target) {
    return [value, ...diagonal.slice(0, 3)];
  }

  const antiDiagonal = calculateSameValues(
    squares,
    lastMove,
    nextAntiDiagonal,
    prevAntiDiagonal,
    isSameAntiDiagonal
  );
  if (antiDiagonal.length >= target) {
    return [value, ...antiDiagonal.slice(0, 3)];
  }

  if (squares.every((v) => v !== null)) {
    return ["Draw"];
  }

  return null;
}

function calculateSameValues(
  squares: Squares,
  lastMove: number,
  next: (move: number) => number,
  prev: (move: number) => number,
  isValid: (move: number) => boolean
): number[] {
  const value = squares[lastMove];
  if (!value) {
    return [];
  }

  const moves = [lastMove];
  for (let move = next(lastMove); isValid(move); move = next(move)) {
    if (squares[move] === value) {
      moves.push(move);
    } else {
      break;
    }
  }
  for (let move = prev(lastMove); isValid(move); move = prev(move)) {
    if (squares[move] === value) {
      moves.push(move);
    } else {
      break;
    }
  }
  return moves;
}


































// export function calculateWinner({
//   squares,
//   lastMove,
//   cols,
//   target,
// }: calculateWinnerParams): (string | number[])[] | null {
//   const value = squares[lastMove];
//   if (!value) {
//     return null;
//   }

//   const row = Math.floor(lastMove / cols);
//   const col = lastMove % cols;

//   const isSameRow = (move: number) => Math.floor(move / cols) === row;
//   const isSameCol = (move: number) => move % cols === col;
//   const isSameDiagonal = (move: number) =>
//     Math.floor(move / cols) - row === (move % cols) - col;
//   const isSameAntiDiagonal = (move: number) =>
//     Math.floor(move / cols) - row === -((move % cols) - col);

//   const nextHorizontal = (move: number) => move + 1;
//   const prevHorizontal = (move: number) => move - 1;
//   const nextVertical = (move: number) => move + cols;
//   const prevVertical = (move: number) => move - cols;
//   const nextDiagonal = (move: number) => move + cols + 1;
//   const prevDiagonal = (move: number) => move - cols - 1;
//   const nextAntiDiagonal = (move: number) => move + cols - 1;
//   const prevAntiDiagonal = (move: number) => move - cols + 1;

//   // Check all directions for a winning line
//   const horizontal = calculateSameValues(
//     squares,
//     lastMove,
//     nextHorizontal,
//     prevHorizontal,
//     isSameRow
//   );
//   if (horizontal.length >= target) {
//     return [value, ...horizontal.slice(0, 3)];
//   }

//   const vertical = calculateSameValues(
//     squares,
//     lastMove,
//     nextVertical,
//     prevVertical,
//     isSameCol
//   );
//   if (vertical.length >= target) {
//     return [value, ...vertical.slice(0, 3)];
//   }

//   const diagonal = calculateSameValues(
//     squares,
//     lastMove,
//     nextDiagonal,
//     prevDiagonal,
//     isSameDiagonal
//   );
//   if (diagonal.length >= target) {
//     return [value, ...diagonal.slice(0, 3)];
//   }

//   const antiDiagonal = calculateSameValues(
//     squares,
//     lastMove,
//     nextAntiDiagonal,
//     prevAntiDiagonal,
//     isSameAntiDiagonal
//   );
//   if (antiDiagonal.length >= target) {
//     return [value, ...antiDiagonal.slice(0, 3)];
//   }

//   // If no winner and board is full, return "Draw"
//   if (squares.every((v) => v !== null)) {
//     return ["Draw"];
//   }

//   // Game is still ongoing
//   return null;
// }

// function calculateSameValues(
//   squares: Squares,
//   lastMove: number,
//   next: (move: number) => number,
//   prev: (move: number) => number,
//   isValid: (move: number) => boolean
// ): number[] {
//   const value = squares[lastMove];
//   if (!value) {
//     return [];
//   }

//   const moves = [lastMove];
//   for (let move = next(lastMove); isValid(move); move = next(move)) {
//     if (squares[move] === value) {
//       moves.push(move);
//     } else {
//       break;
//     }
//   }
//   for (let move = prev(lastMove); isValid(move); move = prev(move)) {
//     if (squares[move] === value) {
//       moves.push(move);
//     } else {
//       break;
//     }
//   }
//   return moves;
// }
























// export function calculateWinner({
//   squares,
//   lastMove,
//   cols,
//   target,
// }: calculateWinnerParams) {
//   const value = squares[lastMove];
//   if (!value) {
//     return null;
//   }

//   const row = Math.floor(lastMove / cols);
//   const col = lastMove % cols;

//   const isSameRow = (move: number) => Math.floor(move / cols) === row;
//   const isSameCol = (move: number) => move % cols === col;
//   const isSameDiagonal = (move: number) =>
//     Math.floor(move / cols) - row === (move % cols) - col;
//   const isSameAntiDiagonal = (move: number) =>
//     Math.floor(move / cols) - row === -((move % cols) - col);

//   const nextHorizontal = (move: number) => move + 1;
//   const prevHorizontal = (move: number) => move - 1;
//   const nextVertical = (move: number) => move + cols;
//   const prevVertical = (move: number) => move - cols;
//   const nextDiagonal = (move: number) => move + cols + 1;
//   const prevDiagonal = (move: number) => move - cols - 1;
//   const nextAntiDiagonal = (move: number) => move + cols - 1;
//   const prevAntiDiagonal = (move: number) => move - cols + 1;

//   const horizontal = calculateSameValues(
//     squares,
//     lastMove,
//     nextHorizontal,
//     prevHorizontal,
//     isSameRow
//   );

//   if (horizontal >= target) {
//     return value;
//   }

//   const vertical = calculateSameValues(
//     squares,
//     lastMove,
//     nextVertical,
//     prevVertical,
//     isSameCol
//   );

//   if (vertical >= target) {
//     return value;
//   }

//   const diagonal = calculateSameValues(
//     squares,
//     lastMove,
//     nextDiagonal,
//     prevDiagonal,
//     isSameDiagonal
//   );

//   if (diagonal >= target) {
//     return value;
//   }

//   const antiDiagonal = calculateSameValues(
//     squares,
//     lastMove,
//     nextAntiDiagonal,
//     prevAntiDiagonal,
//     isSameAntiDiagonal
//   );

//   if (antiDiagonal >= target) {
//     return value;
//   }

//   if (squares.every((v) => v !== null)) {
//     return "Draw";
//   }

//   return null;
// }

// function calculateSameValues(
//   squares: Squares,
//   lastMove: number,
//   next: (move: number) => number,
//   prev: (move: number) => number,
//   isValid: (move: number) => boolean
// ) {
//   const value = squares[lastMove];
//   if (!value) {
//     return 0;
//   }

//   const moves = [lastMove];
//   for (let move = next(lastMove); isValid(move); move = next(move)) {
//     if (squares[move] === value) {
//       moves.push(move);
//     } else {
//       break;
//     }
//   }
//   for (let move = prev(lastMove); isValid(move); move = prev(move)) {
//     if (squares[move] === value) {
//       moves.push(move);
//     } else {
//       break;
//     }
//   }
//   return moves.length;
// }
