import { useState } from "react";
const Board = () => {
  //0 MEANS O and 1 means X
  const [matrix, setmatrix] = useState([
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
  ]);
  /* 
    00 01 02
    10 11 12
    20 21 22
  */
  const [turn, setturn] = useState(0);
  const [winner, setWinner] = useState(null);
  const [isWinner, setisWinner] = useState(false);
  const [moves,setMoves] = useState(0);
  const checkCondition = () => {
    
    if (
      (matrix[0][0] === 0 && matrix[0][1] === 0 && matrix[0][2] === 0) ||
      (matrix[1][0] === 0 && matrix[1][1] === 0 && matrix[1][2] === 0) ||
      (matrix[2][0] === 0 && matrix[2][1] === 0 && matrix[2][2] === 0) ||
      (matrix[0][0] === 0 && matrix[1][0] === 0 && matrix[2][0] === 0) ||
      (matrix[0][1] === 0 && matrix[1][1] === 0 && matrix[2][1] === 0) ||
      (matrix[0][2] === 0 && matrix[1][2] === 0 && matrix[2][2] === 0) ||
      (matrix[0][0] === 0 && matrix[1][1] === 0 && matrix[2][2] === 0) ||
      (matrix[0][2] === 0 && matrix[1][1] === 0 && matrix[2][0] === 0)
    ) {
      setisWinner(true);
      setWinner("O");
      return;
    } else if (
      (matrix[0][0] === 1 && matrix[0][1] === 1 && matrix[0][2] === 1) ||
      (matrix[1][0] === 1 && matrix[1][1] === 1 && matrix[1][2] === 1) ||
      (matrix[2][0] === 1 && matrix[2][1] === 1 && matrix[2][2] === 1) ||
      (matrix[0][0] === 1 && matrix[1][0] === 1 && matrix[2][0] === 1) ||
      (matrix[0][1] === 1 && matrix[1][1] === 1 && matrix[2][1] === 1) ||
      (matrix[0][2] === 1 && matrix[1][2] === 1 && matrix[2][2] === 1) ||
      (matrix[0][0] === 1 && matrix[1][1] === 1 && matrix[2][2] === 1) ||
      (matrix[0][2] === 1 && matrix[1][1] === 1 && matrix[2][0] === 1)
    ) {
      setisWinner(true);
      setWinner("X");
      return;
    }else if(moves === 8){setisWinner(true);setWinner('Tie');return;}
    // else {
    //   return {'winner':false,'who':-1};
    // }
  };
  const handleClick = (row, col, turn) => {
    if (matrix[row][col] !== -1 || isWinner) return;
    setMoves(moves+1);
    matrix[row][col] = turn;
    setmatrix(matrix);
    checkCondition(matrix);
    if (isWinner) return;
    console.log(turn);
    if (turn === 0) {
      setturn(1);
    } else {
      setturn(0);
    }
    console.log(matrix);
  };
  const getSign = (row, col) => {
    if (matrix[row][col] !== -1) {
      if (matrix[row][col] === 0) {
        return "O";
      } else {
        return "X";
      }
    } else {
      return " ";
    }
  };

  return (
    <div className="w-1/4 h-2/5 mx-auto m-auto text-3xl">
      <table className="border border-white w-full h-full text-center">
        <tr className="h-1/3">
          <td className="border border-white w-1/3">
            <button
              className="hover:bg-slate-100 hover:bg-opacity-20"
              onClick={() => {
                handleClick(0, 0, turn);
              }}
            >
              {getSign(0, 0)}
            </button>
          </td>
          <td className="border border-white w-1/3">
            <button
              className="hover:bg-slate-100 hover:bg-opacity-20"
              onClick={() => {
                handleClick(0, 1, turn);
              }}
            >
              {getSign(0, 1)}
            </button>
          </td>
          <td className="border border-white w-1/3">
            <button
              className="hover:bg-slate-100 hover:bg-opacity-20"
              onClick={() => {
                handleClick(0, 2, turn);
              }}
            >
              {getSign(0, 2)}
            </button>
          </td>
        </tr>
        <tr className="h-1/3">
          <td className="border border-white w-1/3">
            <button
              className="hover:bg-slate-100 hover:bg-opacity-20"
              onClick={() => {
                handleClick(1, 0, turn);
              }}
            >
              {getSign(1, 0)}
            </button>
          </td>
          <td className="border border-white w-1/3">
            <button
              className="hover:bg-slate-100 hover:bg-opacity-20"
              onClick={() => {
                handleClick(1, 1, turn);
              }}
            >
              {getSign(1, 1)}
            </button>
          </td>
          <td className="border border-white w-1/3">
            <button
              className="hover:bg-slate-100 hover:bg-opacity-20"
              onClick={() => {
                handleClick(1, 2, turn);
              }}
            >
              {getSign(1, 2)}
            </button>
          </td>
        </tr>
        <tr className="h-1/3">
          <td className="border border-white w-1/3">
            <button
              className="hover:bg-slate-100 hover:bg-opacity-20"
              onClick={() => {
                handleClick(2, 0, turn);
              }}
            >
              {getSign(2, 0)}
            </button>
          </td>
          <td className="border border-white w-1/3">
            <button
              className="hover:bg-slate-100 hover:bg-opacity-20"
              onClick={() => {
                handleClick(2, 1, turn);
              }}
            >
              {getSign(2, 1)}
            </button>
          </td>
          <td className="border border-white w-1/3">
            <button
              className="hover:bg-slate-100 hover:bg-opacity-20"
              onClick={() => {
                handleClick(2, 2, turn);
              }}
            >
              {getSign(2, 2)}
            </button>
          </td>
        </tr>
      </table>
      {isWinner && (
        <div className="text-center sm:text-sm md:text-base xl:text-3xl">
          <p className="text-white font-bold italic p-4 m-2">
            {winner === 'Tie' && <p>Match Draws</p>}
            {winner !== 'Tie' && <p>The Winner is: {winner}</p>}
          </p>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              setWinner(null);
              setmatrix([
                [-1, -1, -1],
                [-1, -1, -1],
                [-1, -1, -1],
              ]);
              setisWinner(false);
              setMoves(0);
              setturn(0);
            }}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Board;
