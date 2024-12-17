import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import LoginAppwrite from "../pages/LoginAppwrite";
import "../styles/nav.css";
import CartWidgetButton from "./CartWidgetButton";
import { Link } from "react-router-dom";

const Nav = ({ handleOpen }) => {
  const [loginActive, setLoginActive] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Estado para controlar visibilidad
  const [lastScrollY, setLastScrollY] = useState(0); // Guarda la posición previa del scroll

  const handleActive = () => {
    setLoginActive(!loginActive);
  };

  const user = useUser();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Desaparece si el scroll baja y está más allá de los 50px
        setIsVisible(false);
      } else {
        // Aparece si el scroll sube o está quieto
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup para evitar fugas de memoria
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`flex w-screen justify-center mt-6 fixed z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-[200px]"
      }`}
    >
      <div className="w-[95vw] flex rounded-full justify-between h-[60px] items-center text-white bg-black/80 px-8">
        <div className="flex gap-14">
          <img src="" alt="logo" />
          <ul className="flex items-center gap-8">
            <Link to={"catalogo"}>
              {" "}
              <li className="list-none">Productos</li>
            </Link>
            <Link to={"nosotros"}>
              {" "}
              <li className="list-none">Nosotros</li>
            </Link>
            <Link to={"/#contacto"}>
              {" "}
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

export default Nav;
