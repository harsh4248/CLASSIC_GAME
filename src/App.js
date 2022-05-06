import Board from "./components/board";
import NavBar from "./components/navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Suduko from "./components/suduko";
//import Snake from "./components/snake";
import SankeGame from "./components/snake2";
//import Snake from "./components/snake";

const App = () => {
  return (
    <div className="content bg-slate-900 h-screen w-screen flex flex-col">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/sudoko" element={<Suduko/>} />
          <Route path="/snake" element={<SankeGame/>} />
          <Route path="*" element={<div className="text-white text-9xl text-center">Page Not Found!!!</div>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
