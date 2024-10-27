import { ReactNode } from "react";

type BoardRowProps = {
  children: ReactNode;
};

export default function BoardRow({ children }: BoardRowProps) {
  return <div className="board-row">{children}</div>;
}
