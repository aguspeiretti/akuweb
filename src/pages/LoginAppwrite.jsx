/* eslint-disable react/prop-types */
import { useState } from "react";
import { useUser } from "../context/UserContext";
import "../styles/nav.css";

const LoginAppwrite = ({ handleActive, loginActive }) => {
  const user = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginButton = () => {
    if (email && password) {
      user.login(email, password), handleActive;
    } else {
      handleActive();
    }
  };

  return (
    <section>
      <form
        className={` ${
          loginActive ? "flex gap-2 login-active" : "flex gap-2 login"
        }`}
      >
        <div className="flex gap-2 ">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            className="rounded-full px-4 w-[200px] text-black "
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            className="rounded-full px-4 w-[200px] text-black "
          />
        </div>

        <button
          className="button bg-indigo-700 py-[4px] px-6 rounded-full"
          type="button"
          onClick={handleLoginButton}
        >
          Login
        </button>
        <div>
          {/* <button
            className="button"
            type="button"
            onClick={() => user.register(email, password)}
          >
            Register
          </button> */}
        </div>
      </form>
    </section>
  );
};

export default LoginAppwrite;
