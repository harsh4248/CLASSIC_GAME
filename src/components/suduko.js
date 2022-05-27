import SudokoButton from "./sbutton";
import { useState } from "react";

const Suduko = () => {
  const question = [
    [-1, -1, -1, -1, 2, 6, 4, -1, -1],
    [-1, 6, -1, -1, -1, -1, -1, -1, -1],
    [-1, 8, -1, -1, 9, 5, -1, -1, 1],
    [-1, -1, 6, -1, 7, -1, -1, 8, -1],
    [1, -1, 8, 9, -1, -1, -1, 7, -1],
    [-1, 7, -1, -1, 4, 2, -1, -1, -1],
    [6, 9, -1, 1, 5, -1, 8, 3, -1],
    [-1, 1, 5, -1, -1, -1, -1, -1, -1],
    [-1, 3, 4, -1, -1, -1, -1, 5, 6],
  ];
  const btn = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const [data, setdata] = useState("");

  const [sudoko, setsudoko] = useState(question);

  // console.log("here");
  //console.log((-1).toString());
  const [isComplete, setisComplete] = useState(false);
  const [isSolving, setisSolving] = useState(false);
  // const [flags, setFlags] = useState([0, 0, 0]);
  // const [ocrArr, setocrArr] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const boardClick = (row, col) => {
    if (question[row][col] === -1) {
      sudoko[row][col] = data;
      setsudoko(sudoko);
      // wrongVal(data, row, col);
      // rightVal(data, row, col);
      const isValid = checkConstraints(row, col, data);
      if (isValid === false) {
        document.getElementById(
          row.toString() + col.toString()
        ).style.backgroundColor = "red";
      } else {
        document.getElementById(
          row.toString() + col.toString()
        ).style.backgroundColor = "transparent";
      }
      const btn = document.getElementById(row.toString() + col.toString());
      btn.innerText = sudoko[row][col];
      //console.log(sudoko);
    }
  };
  const autoBoardClick = (row, col) => {
    if (sudoko[row][col] === -1) {
      sudoko[row][col] = data;
      setsudoko(sudoko);
      // wrongVal(data, row, col);
      // rightVal(data, row, col);
      // const isValid = checkConstraints(row, col, data);
      // if (isValid === false) {
      //   document.getElementById(
      //     row.toString() + col.toString()
      //   ).style.backgroundColor = "red";
      // } else {
      //   document.getElementById(
      //     row.toString() + col.toString()
      //   ).style.backgroundColor = "transparent";
      // }
      document.getElementById(
        row.toString() + col.toString()
      ).style.backgroundColor = "transparent";
      const btn = document.getElementById(row.toString() + col.toString());
      btn.innerText = sudoko[row][col];
      //console.log(sudoko);
    }
  };

  const numberbtnClick = (val) => {
    setdata(val);
  };

  const checkConstraints = (row, col, val) => {
    //const val = sudoko[row][col];
    //check all values in rows returning false if wrong value;
    for (let j = 0; j < sudoko[0].length; j++) {
      if (sudoko[row][j] === val && j !== col) {
        return false;
      }
    }
    //checking all values in column
    for (let i = 0; i < sudoko.length; i++) {
      if (sudoko[i][col] === val && i !== row) {
        return false;
      }
    }
    //below two variable is used to get the index number of matrix
    const row0 = determineMatrics(row);
    const col0 = determineMatrics(col);
    for (let i = row0[0]; i <= row0[1]; i++) {
      for (let j = col0[0]; j <= col0[1]; j++) {
        if (sudoko[i][j] === val && i !== row && j !== col) {
          return false;
        }
      }
    }
    return true;
  };
  const determineMatrics = (val) => {
    if (val >= 0 && val <= 2) return [0, 2];
    else if (val >= 3 && val <= 5) return [3, 5];
    else return [6, 8];
  };
  const toogleCompleteDiv = (isFinished) => {
    const ComDiv = document.getElementById("complete-div");
    ComDiv.style.display = "block";
    if (isFinished === true) {
      setisComplete(true);
    } else {
      setTimeout(() => {
        ComDiv.style.display = "none";
      }, 2000);
    }
  };
  const checkSudoko = () => {
    //let swit = 0;
    for (let i = 0; i < sudoko.length; i++) {
      for (let j = 0; j < sudoko[i].length; j++) {
        if (sudoko[i][j] === -1) {
          toogleCompleteDiv(false);
          return false;
        } else {
          const isValid = checkConstraints(i, j);
          if (isValid === false) {
            toogleCompleteDiv(false);
            return false;
          }
        }
      }
      // if(swit === 1) {
      //   break;
      // }
    }

    toogleCompleteDiv(true);
    return true;
  };
  const solveSudoko = () => {
    //console.log(sudoko);
    for (let i = 0; i < question.length; i++) {
      for (let j = 0; j < question[0].length; j++) {
        sudoko[i][j] = question[i][j];

      }
    }
    setsudoko(sudoko);
    solve(sudoko);
  };
  const solve = (board) => {
    //console.log(board);
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === -1) {
          for (let nums = 1; nums <= 9; nums++) {
            if (checkConstraints(i, j, nums)) {
              board[i][j] = nums;
              setdata(nums);
              autoBoardClick(i, j);
              document.getElementById(
                i.toString() + j.toString()
              ).style.backgroundColor = "transparent";
              if (solve(board) === true) {
                return true;
              } else {
                board[i][j] = -1;
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  };
  return (
    <div className="w-11/12 h-3/4 m-auto  flex flex-row">
      <div className="p-2 w-1/2 h-full m-auto">
        <div className="text-white">
          <p className="lg:text-2xl md:text-base sm:text-xs text-center p-2 m-4">
            HOW TO PLAY:
          </p>
          <ol className="list-decimal p-2">
            <li className="m-2">Select number from below.</li>
            <li className="m-2">Select Cell in the board.</li>
            <li className="m-2">
              if you want to change cell value the process is same.
            </li>
            <li className="m-2">
              if can't solve press solve to get the answer.
            </li>
          </ol>
        </div>
        {btn.map((data, i) => (
          <SudokoButton text={data} id={i} click={numberbtnClick} />
        ))}
        <div className="lg:flex lg:flex-row sm:flex-col md:flex-col m-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded lg:m-auto m-4"
            onClick={() => {
              console.log(sudoko);
              checkSudoko();
            }}
          >
            Check
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded lg:m-auto m-4"
            onClick={() => {
              setisSolving(true);
              setTimeout(() => {
                setisSolving(false);
              }, 1000);

              solveSudoko();
            }}
          >
            Solve
          </button>
        </div>
        {isSolving && (
          <div className="text-white text-xl">
            <p>Solving.....</p>
          </div>
        )}
        <div className="hidden" id="complete-div">
          {isComplete ? (
            <div>
              <p className="text-white mb-4 text-xl">
                Your Game is Completed. Want to play again???
              </p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded lg:m-auto m-4"
                onClick={() => {
                  //sudoko = question;
                  for (let i = 0; i < question.length; i++) {
                    for (let j = 0; j < question[0].length; j++) {
                      sudoko[i][j] = question[i][j];
                    }
                  }
                  setsudoko(sudoko);
                  console.log(sudoko);
                  setisComplete(false);
                  // sudoko =  question;
                }}
              >
                PLAY AGAIN
              </button>
            </div>
          ) : (
            <div className="text-white text-xl">
              <p>Please Complete the sudoko!!!</p>
            </div>
          )}
        </div>
      </div>
      <div className="p-2 w-3/4 h-full flex">
        <div className="m-auto">
          <table className="border border-white">
            <tbody className="border border-white">
              {sudoko.map((row, i) => {
                return (
                  <tr className="h-10 border border-white ">
                    {row.map((val, j) => {
                      return (
                        <td className="w-10 h-10 border border-white hover:bg-slate-100 hover:bg-opacity-20">
                          <button
                            className="w-full h-full text-2xl"
                            id={i.toString() + j.toString()}
                            onClick={() => {
                              boardClick(i, j);
                            }}
                          >
                            {val !== -1 ? val : ""}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Suduko;
