import { useState } from "react";
const Snake = () => {
    // let bh = document.getElementById('main-contenter').offsetHeight;
    // let hh = document.getElementById('main-contenter').offsetwidth;

    const boardHeight = Math.round(17);
    const boardWidth = Math.round(50);

  const [board, setboard] = useState(
    new Array(boardHeight).fill(0).map(() => new Array(boardWidth).fill(0))
  );

  const getRandom = () => {
    
    const row = Math.round(Math.random() * boardHeight);
    const col = Math.round(Math.random() * boardWidth);
  }

  console.log(board);
  return (
    <div className="w-11/12 h-3/4 m-auto flex " >
      <table className="m-auto h-full w-full border" id="main-container">
        <tbody>
          {board.map((row) => {
            return (
              <tr className="h-6 border">
                {row.map((val) => {
                  return <td className="w-6 border"></td>;
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
