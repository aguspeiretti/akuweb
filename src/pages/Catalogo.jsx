import { useState } from "react";
import Cart from "../components/Cart";
import "../styles/catalogo.css";
import NavEstatica from "../components/NavEstatica";
import VistaCommerce from "../components/VistaCommerce";

const Catalogo = () => {
  const [animationStart, setAnimationStart] = useState(true);
  const [catSelected, setCatSelected] = useState("cat1");

  const handleAnimation = (cat) => {
    setAnimationStart(false);
    setCatSelected(cat);
  };

  return (
    <div className="w-screen h-[calc(100vh-60px)]-z-10 overflow-hidden">
      <NavEstatica />
      <div className="w-full h-[calc(100vh-60px)] flex absolute z-0 overflow-hidden">
        <div
          className={`${
            animationStart ? "animado1 " : "animado1 animado1-active"
          }`}
          onClick={() => handleAnimation("cat1")}
        >
          <h2 className="titulo">Título 1</h2>
        </div>
        <div
          className={`${
            animationStart ? "animado2" : "animado2 animado2-active"
          }`}
          onClick={() => handleAnimation("cat2")}
        >
          <h2 className="titulo">Título 2</h2>
        </div>

        {catSelected === "cat2" ? (
          <div className="text-white w-[100%] h-[100%]">
            <VistaCommerce />
          </div>
        ) : (
          <div className="text-white w-[100%] h-[100%] ">
            <VistaCommerce />
          </div>
        )}
      </div>
      <Cart />
    </div>
  );
};

export default Catalogo;
