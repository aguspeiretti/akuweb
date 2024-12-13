import { useState } from "react";
import { useUser } from "../context/UserContext";
import LoginAppwrite from "../pages/LoginAppwrite";
import "../styles/nav.css";

const Nav = () => {
  const [loginActive, setLoginActive] = useState(false);

  const handleActive = () => {
    setLoginActive(!loginActive);
  };

  const user = useUser();
  return (
    <nav className="flex justify-between h-[60px] items-center text-white w-screen bg-black px-8 ">
      <img src="" alt="logo" />
      <div className="relative">
        {user.current ? (
          <div className="flex gap-8 items-center">
            <p>
              Hola!<span className="font-semibold"> {user.current.name}</span>
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
    </nav>
  );
};

export default Nav;
