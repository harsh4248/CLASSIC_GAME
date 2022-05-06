import { useState } from "react";

const getRandom = (range) => {
  const val = Math.round(Math.random() * range);
  return val;
};
const copyMatrix = (matrix) => {
  const copy = new Array(matrix.length);
  for(let i = 0;i < matrix.length; i++) {
    copy[i] = new Array(matrix[i].length);
    for(let j = 0;j < matrix[0].length; j++) {
      copy[i][j] = matrix[i][j];
    }
  }
  return copy;
}


const Snake = () => {
  // let bh = document.getElementById('main-contenter').offsetHeight;
  // let hh = document.getElementById('main-contenter').offsetwidth;
  const boardHeight = 17;
  const boardWidth = 50;
  const SNAKE_SPEED = 500;

  //in board if 1 is present than that is snake and if 2 is present than it is food
  const [board, setboard] = useState(
    new Array(boardHeight).fill(0).map((row,i) => new Array(boardWidth).fill(0))
  );
  const [foodLocation, setfoodLocation] = useState({
    row: getRandom(boardHeight),
    col: getRandom(boardWidth),
  });
  const [isKilled,setisKilled] = useState(false);
  const [snake, setsnake] = useState([
    { row: getRandom(boardHeight), col: getRandom(boardWidth) },
  ]);
  console.log(snake);
  console.log(foodLocation);
  console.log(board);
  
  

  return (
    <div className="w-11/12 h-3/4 m-auto flex ">
      <table className="m-auto h-full w-full border" key="main-container">
        <tbody>
          {board.map((row,rowIdx) => {
            return (
              <tr className="h-6 border">
                {row.map((val,valIdx) => {
                  return (
                    <td className="w-6 border" key={rowIdx.toString() + valIdx.toString()}>
                      {val === 2 ? (
                        <div className="bg-red-600 h-full w-full"></div>
                      ) : (
                        <div className="bg-transparent h-full w-full hidden"></div>
                      )}
                      {val === 1 ? (
                        <div className="bg-green-600 h-full w-full"></div>
                      ) : (
                        <div className="bg-transparent h-full w-full hidden"></div>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Snake;
