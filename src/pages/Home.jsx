import { useLocation } from "react-router-dom";
import Cart from "../components/Cart";
import FormContacto from "../components/FormContacto";
import Reviews from "../components/Reviews";
import StatsBanner from "../components/StatesBanner";
import { useEffect } from "react";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="w-screen h-auto">
      <div className="w-screen h-[100vh] bg-white relative rounded-b-[100px]"></div>
      <div className="w-screen h-[400px] flex justify-center items-center">
        <StatsBanner />
      </div>
      <div className="w-screen h-[100vh] bg-white relative rounded-t-[100px] rounded-b-[100px] py-8 px-[40px] flex flex-col">
        {/* Contenedor del Texto */}
        <div className="flex  w-full flex-none mt-8 mb-8">
          <p className="text-black w-[50%] font-bold text-[40px] text-center">
            asdasda asdadasfgsadfd
          </p>
          <p className="text-black w-[50%]">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio atque
            neque accusamus nemo earum, veritatis expedita repudiandae! Commodi
            quibusdam incidunt cupiditate recusandae qui consequatur tempora,
            architecto rem, possimus ut quae.
          </p>
        </div>
        {/* Contenedor Grid */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-2 gap-4 px-24 flex-grow overflow-auto pb-4">
          <div className="w-[100%] bg-white rounded-3xl relative shadow-[0_8px_8px_rgba(0,0,0,0.4)]"></div>
          <div className="w-[100%] bg-indigo-700 rounded-3xl relative shadow-[0_8px_8px_rgba(0,0,0,0.2)]"></div>
          <div className="w-[100%] bg-indigo-700 rounded-3xl relative shadow-[0_8px_8px_rgba(0,0,0,0.2)]"></div>
          <div className="w-[100%] bg-white rounded-3xl relative shadow-[0_8px_8px_rgba(0,0,0,0.4)]"></div>
        </div>
      </div>

      <div className="w-screen h-[100vh] flex justify-center items-center">
        <Reviews />
      </div>
      <div
        id="contacto"
        className="w-screen h-[100vh] bg-white relative rounded-t-[100px] rounded-b-[100px]"
      >
        <FormContacto />
      </div>
      <div className="w-screen h-[50vh] flex justify-center items-center"></div>
    </div>
  );
};

export default Home;
