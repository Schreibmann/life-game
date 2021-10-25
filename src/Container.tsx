import React from "react";
import { CellProps, LifeMatrixType } from "./types";
import Cell from "./Cell";

import buttonStyle from "./button.module.scss";

const ROWS = 50;
const COLS = 50;

function fpm(i: number) {
  if (i === 0) return COLS;
  else return i;
}
function fpp(i: number) {
  if (i === 49) return -1;
  else return i;
}

const Container = () => {
  const [timerId, setTimerId] = React.useState<NodeJS.Timeout | null>(null);
  const [evolution, setEvolution] = React.useState<boolean>(false);
  const [initialized, setInitialized] = React.useState<boolean>(false);
  const [lifeMatrix, setLifeMatrix] = React.useState<LifeMatrixType>([]);

  const initLifeMatrix = () => {
    if (evolution) {
      clearTimeout(timerId as NodeJS.Timeout);
      setEvolution(false);
      setTimerId(null);
    }
    const initial: LifeMatrixType = [];
    for (let row = 0; row < ROWS; row++) {
      initial[row] = [];
      for (let col = 0; col < COLS; col++) {
        initial[row][col] = false;
      }
    }
    setLifeMatrix(initial);
    setInitialized(true);
  };

  const handleCellClick = ({ row, col, isAlive }: CellProps) => {
    setLifeMatrix((prev) => {
      const next: LifeMatrixType = JSON.parse(JSON.stringify(prev));
      next[row][col] = !isAlive;
      return next;
    });
  };

  const CalculateNextGeneration = React.useCallback(() => {
    const prevGeneration: LifeMatrixType = JSON.parse(
      JSON.stringify(lifeMatrix)
    );
    const nextGeneration: LifeMatrixType = [];

    for (let row = 0; row < ROWS; row++) {
      nextGeneration[row] = [];
      for (let col = 0; col < COLS; col++) {
        let neighbors = 0;
        if (prevGeneration[row][fpm(col) - 1] === true) neighbors++; //left
        if (prevGeneration[row][fpp(col) + 1] === true) neighbors++; //right
        if (prevGeneration[fpp(row) + 1][col] === true) neighbors++; //bottom
        if (prevGeneration[fpm(row) - 1][col] === true) neighbors++; //up
        if (prevGeneration[fpm(row) - 1][fpp(col) + 1] === true) neighbors++;
        if (prevGeneration[fpp(row) + 1][fpp(col) + 1] === true) neighbors++;
        if (prevGeneration[fpp(row) + 1][fpm(col) - 1] === true) neighbors++;
        if (prevGeneration[fpm(row) - 1][fpm(col) - 1] === true) neighbors++;

        const isCellAlive = neighbors === 2 || neighbors === 3;

        nextGeneration[row][col] = isCellAlive;
      }
    }
    setLifeMatrix(nextGeneration);
  }, [lifeMatrix]);

  const handleClickButton = () => {
    if (evolution) {
      setEvolution(false);
      clearInterval(timerId as NodeJS.Timeout);
      setTimerId(null);
    } else {
      setEvolution(true);
    }
  };

  React.useEffect(() => {
    initLifeMatrix(); 
  }, []);

  React.useEffect(() => {
    if (initialized && evolution) {
      setTimeout(CalculateNextGeneration, 500);
    }
  }, [CalculateNextGeneration, evolution, initialized]);

  return (
    <>
      <figure className="App-container">
        {initialized
          ? lifeMatrix.map((row, rowIdx) => (
              <div className="App-container-row" key={`row-${rowIdx}`}>
                {row.map((col, colIdx) => (
                  <Cell
                    key={`col=${rowIdx}-${colIdx}`}
                    isAlive={col}
                    row={rowIdx}
                    col={colIdx}
                    onClick={evolution ? undefined : handleCellClick}
                  />
                ))}
              </div>
            ))
          : "initializing..."}
      </figure>
      <footer className="App-footer">
      <button className={buttonStyle.button} onClick={handleClickButton}>
        {evolution ? "Stop" : "Start"}
      </button>
      <button className={buttonStyle.button} onClick={initLifeMatrix}>Reset</button>
      </footer>
    </>
  );
};

export default Container;
