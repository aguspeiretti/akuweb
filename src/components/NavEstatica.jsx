import { useState } from "react";
import { useUser } from "../context/UserContext";
import LoginAppwrite from "../pages/LoginAppwrite";
import "../styles/nav.css";
import CartWidgetButton from "./CartWidgetButton";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const NavEstatica = () => {
  const { handleOpen } = useCart();
  const [loginActive, setLoginActive] = useState(false);

  const handleActive = () => {
    setLoginActive(!loginActive);
  };

  const user = useUser();

  return (
    <nav className="flex w-screen justify-center relative  z-50 ">
      <div className="w-screen flex justify-between h-[60px] items-center text-white bg-black/80 px-8">
        <div className="flex gap-14">
          <Link to={"/"}>
            <img src="" alt="logo" />{" "}
          </Link>
          <ul className="flex items-center gap-8">
            <Link to={"catalogo"}>
              <li className="list-none">Productos</li>
            </Link>
            <Link to={"nosotros"}>
              <li className="list-none">Nosotros</li>
            </Link>
            <Link to={"/#contacto"}>
              <li className="list-none">Contacto</li>
            </Link>
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            {user.current ? (
              <div className="flex gap-8 items-center">
                <p>
                  Hola!
                  <span className="font-semibold"> {user.current.name}</span>
                </p>
                <button
                  type="button"
                  onClick={() => user.logout()}
                  className="button bg-indigo-700 py-[4px] px-6 rounded-full"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                {loginActive ? (
                  <div>
                    <LoginAppwrite
                      handleActive={handleActive}
                      loginActive={loginActive}
                    />
                  </div>
                ) : (
                  <p
                    onClick={handleActive}
                    className="button bg-indigo-700 py-[4px] px-6 rounded-full cursor-pointer"
                  >
                    Login
                  </p>
                )}
              </>
            )}
          </div>
          <CartWidgetButton handleOpen={handleOpen} />
        </div>
      </div>
    </nav>
  );
};

export default NavEstatica;
