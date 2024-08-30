//This component will handle all the logic

import React, { useState } from "react";
import ChessBoard from "./ChessBoard";
import { validateInput, runSimulation } from "./Simulation";

function App() {
  const [inputData, setInputData] = useState([]);
  const [result, setResult] = useState("");
  const [piecesA, setPiecesA] = useState([]);
  const [piecesB, setPiecesB] = useState([]);
  const [sizeX, setSizeX] = useState(0);
  const [sizeY, setSizeY] = useState(0);

  const handleInputChange = (e, index) => {
    const newInputData = [...inputData];
    newInputData[index] = e.target.value;
    setInputData(newInputData);
  };

  const handleRunSimulation = () => {
    if (!validateInput(inputData)) {
      setResult("error");
      return;
    }
    const simulationResult = runSimulation(inputData);
    setResult(simulationResult);

    const [ boardSizeX, boardSizeY] = inputData;
    setSizeX(parseInt(boardSizeX));
    setSizeY(parseInt(boardSizeY));

    //initialize positions
    const initialPiecesA = new Array(parseInt(boardSizeX))
      .fill(0)
      .map((_, i) => ({ x: 1, y: 0 }));
    const initialPiecesB = new Array(parseInt(boardSizeX))
      .fill(0)
      .map((_, i) => ({ x: i, y: parseInt(boardSizeY) - 1 }));

    setPiecesA(initialPiecesA);
    setPiecesB(initialPiecesB);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Chess Simulation</h1>
      <div>
        {[
          "Team A",
          "Speed A",
          "TeamB",
          "Speed B",
          "Board Size X",
          "Board Size Y",
        ].map((label, i) => (
          <div key={i}>
            <label>{label}</label>
            <input type="text" onChange={(e) => handleInputChange(e, i)} />
          </div>
        ))}
      </div>
      <button onClick={handleRunSimulation}>Run Simulation</button>
      <h2>Result: {result} </h2>
      <ChessBoard
        piecesA={piecesA}
        piecesB={piecesB}
        sizeX={sizeX}
        sizeY={sizeY}
      />
    </div>
  );
}

export default App;
