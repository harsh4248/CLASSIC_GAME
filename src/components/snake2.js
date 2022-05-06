import { useEffect, useState } from "react";
import useInterval from './useInterval';

class LinkedListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class SinglyLinkedList {
  constructor(value) {
    const node = new LinkedListNode(value);
    this.head = node;
    this.tail = node;
  }
}
const SankeGame = () => {
  const getRandom = (range) => {
    const val = Math.round(Math.random() * range);
    return val;
  };
  const createBoardSize = (size) => {
    let counter = 1;
    const board = [];
    for (let i = 0; i < size / 3; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(counter);
        counter++;
      }
      board.push(row);
    }
    return board;
  };

  const DIRECTIONS = {
    UP: 0,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 1,
  };
  const boardSize = 40;
  const STARTING_SNAKECELL = 1;
  const STARTING_FOODCELL = 120;
  const [board, setboard] = useState(createBoardSize(boardSize));
  const [snakeCells, setsnakeCells] = useState(new Set([STARTING_SNAKECELL]));
  const [foodCell, setFoodCell] = useState(STARTING_FOODCELL);
  const [snake, setsnake] = useState(new SinglyLinkedList(STARTING_SNAKECELL));
  const [direction, setdirection] = useState(DIRECTIONS.RIGHT);

  const increaseSnakeSize = () => {
    let temp = [...snakeCells];
    let snakeTail = temp[temp.length - 1];
    let newSnakeCell;
    switch (direction) {
      case DIRECTIONS.UP: {
        newSnakeCell = snakeTail+boardSize;
        break;
      }
      case DIRECTIONS.RIGHT: {
        newSnakeCell = snakeTail - 1;
        break;
      }
      case DIRECTIONS.LEFT: {
        newSnakeCell = snakeTail + 1;
        break;
      }
      case DIRECTIONS.DOWN: {
        newSnakeCell = snakeTail - boardSize;
        break;
      }
      default: {
        newSnakeCell = snakeTail - 1;
        break;
      }
    }
    
    temp.push(newSnakeCell);
    setsnakeCells(new Set(temp));
  }
  const copyArr = () => {
    let temp = [...snakeCells];
    for(let i = temp.length - 1; i > 0; i--) {
      temp[i] = temp[i-1];
    }
    return temp;
  }
  const moveSnake = () => {
    document.addEventListener("keydown", (event) => {
      switch (event.key) { 
        case "ArrowRight":
          setdirection(DIRECTIONS.RIGHT);
          break;
        case "ArrowUp":
          setdirection(DIRECTIONS.UP);
          break;
        case "ArrowDown":
          setdirection(DIRECTIONS.DOWN);
          break;
        case "ArrowLeft":
          setdirection(DIRECTIONS.LEFT);
          break;

        default:
          setdirection(DIRECTIONS.RIGHT);
          break;
      }
    });
    let temp = copyArr();
    const currentHeadCordinates = {
      row: Math.floor(temp[0] / boardSize),
      col: Math.floor(temp[0] % boardSize)-1,
    };
    if(temp[0] % boardSize === 0) {
      currentHeadCordinates.col = boardSize;
    }
    switch (direction) {
      case DIRECTIONS.UP: {
        temp[0] = temp[0] - boardSize;
        currentHeadCordinates.row--;
        break;
      }
      case DIRECTIONS.RIGHT: {
        temp[0] = temp[0] + 1;
        currentHeadCordinates.col++;
        break;
      }
      case DIRECTIONS.LEFT: {
        temp[0] = temp[0] - 1;
        currentHeadCordinates.col--;
        break;
      }
      case DIRECTIONS.DOWN: {
        temp[0] = temp[0] + boardSize;
        currentHeadCordinates.row++;
        break;
      }
      default: {
        temp[0] = temp[0] + 1;
        currentHeadCordinates.col++;
        break;
      }
    }
    if(temp.lastIndexOf(temp[0]) !== 0) {
      temp = [STARTING_SNAKECELL];
    }
    setsnakeCells(new Set(temp));

    //temp = [...snakeCells];
    console.log(temp[0] + " " + foodCell);
    if (temp[0] === foodCell) {
      let newFoodCell = getRandom(boardSize * (boardSize / 3));
      while (snakeCells.has(newFoodCell)) {
        newFoodCell = getRandom(boardSize * (boardSize / 3));
      }
      // snakeCells.add(foodCell);
      setFoodCell(newFoodCell);
      increaseSnakeSize();
      console.log(snakeCells);
    }
    
    if (
      currentHeadCordinates.col < 0 ||
      currentHeadCordinates.col > boardSize ||
      currentHeadCordinates.row < 0 ||
      currentHeadCordinates.row >= boardSize / 3
    ) {
      setsnakeCells(new Set([STARTING_SNAKECELL]));
      console.log("SNAKE KILLED!!!!");
    }

    // console.log(snakeCells);
  };

  useEffect(() => {
    // setInterval(() => {
    //   moveSnake();
    //   //console.log(snake.head.value);
    //   // set
    // }, 1000);
  }, [snakeCells]);

  useInterval(moveSnake,100);

  // const handleMovement = () => {
  //   moveSnake();
  // };

  return (
    // <div className="board">
    //   {board.map((row, rowIdx) => (
    //     <div key={rowIdx} className="row">
    //       {row.map((cellValue, cellIdx) => (
    //         <div key={cellIdx} className={'cell ' + snakeCells.has(cellValue) ? 'snake-cell' : ''}>{cellValue}</div>
    //       ))}
    //     </div>
    //   ))}
    // </div>
    <div className="w-11/12 h-3/4 m-auto flex">
      {/* <button
        className=" bg-white text-black"
        onClick={() => {
          handleMovement();
        }}
      >
        move manually
      </button> */}
      <table className="m-auto h-full w-full border">
        <tbody>
          {board.map((row, rowIdx) => {
            return (
              <tr className="h-6 " key={rowIdx}>
                {row.map((cellValue, cellIdx) => {
                  return (
                    <td
                      className={
                        "w-6 " +
                        (snakeCells.has(cellValue) ? "bg-green-500 " : "") +
                        (foodCell === cellValue ? "bg-red-500" : "")
                      }
                      key={rowIdx.toString() + cellIdx.toString()}
                    >
                      {/* <p className="text-white">{cellValue}</p> */}
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

export default SankeGame;
