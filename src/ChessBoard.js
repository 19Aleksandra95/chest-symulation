//simple component with visualization of the board and movement

import React from "react";

function renderCell(x, y, team, key) {
  const style = {
    width: "100px",
    height: "100px",
    display: "inline-block",
    border: "1px solid black",
    lineHeight: "50px",
    textAlgin: "center",
    backgroundColor: (x + y) % 2 === 0 ? "#f0d9b5" : "#b58863",
  };

  return (
    <div key={key} style={style}>
      {team}
    </div>
  );
}
export default function ChessBoard({ piecesA, piecesB, sizeX, sizeY }) {
  const board = [];
  for (let y = 0; y < sizeY; y++) {
    const row = [];
    for (let x = 0; x < sizeX; x++) {
      const pieceA = piecesA.find((p) => p.x === x && p.y === y);
      const pieceB = piecesB.find((p) => p.x === x && p.y === y);

      if (pieceA) {
        row.push(renderCell(x, y, "A", `${x}, ${y}`));
      } else if (pieceB) {
        row.push(renderCell(x, y, "B", `${x}, ${y}`));
      } else {
        row.push(renderCell(x, y, "", `${x}, ${y}`));
      }
    }
    board.push(
      <div key={y} style={{ display: "flex" }}>
        {row}
      </div>
    );
  }
  return <div>{board}</div>;
}
