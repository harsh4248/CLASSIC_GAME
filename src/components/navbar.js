import { Link } from "react-router-dom";
const NavBar = () => {
  const handleMenu = () => {
    const menu = document.getElementById("menu-items");
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  };
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 flex-1 text-white mr-6">
        <svg
          className="fill-current h-8 w-8 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 26 26"
        >
          <polygon
            className="play-btn__svg"
            points="9.33 6.69 9.33 19.39 19.3 13.04 9.33 6.69"
          />
          <path
            className="play-btn__svg"
            d="M26,13A13,13,0,1,1,13,0,13,13,0,0,1,26,13ZM13,2.18A10.89,10.89,0,1,0,23.84,13.06,10.89,10.89,0,0,0,13,2.18Z"
          />
        </svg>
        <span className="font-semibold text-xl tracking-tight">Games</span>
      </div>
      <div className="block lg:hidden">
        <button
          className=" flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white relative"
          id="drop-down-menu"
          onClick={() => {
            handleMenu();
          }}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
        <div
          className="z-10 absolute bg-opacity-30 bg-slate-900 right-6 hidden  divide-y divide-gray-100 rounded shadow w-44 "
          id="menu-items"
        >
          <ul>
            <li>
              <Link
                to='/'
                className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4"
                onClick={() => {handleMenu()}}

              >
                TIC-TAC-TOE
              </Link>
            </li>
            <li>
              <Link
                to="/sudoko"
                className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4"
                onClick={() => {handleMenu()}}
              >
                SUDOKO
              </Link>
            </li>
            <li>
              <Link
                to="/snake"
                className="block mt-4 lg:inline-block lg:mt-0 text-white mr-4"
                onClick={() => {handleMenu()}}
              >
                SNAKE
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto md:text-right lg:text-right lg:content-between md:hidden sm:hidden">
        <div className="text-sm lg:flex-grow hidden lg:block md:hidden sm:hidden">
          <Link
            to='/'
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            TIC-TAC-TOE
          </Link>
          <Link
            to='/sudoko'
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            SUDOKO
          </Link>
          <Link
            to="/snake"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
          >
            SNAKE
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
