import Calendario from "../components/Calendario";

const FormContacto = () => {
  return (
    <div
      className="w-screen md:h-screen "
      // style={{
      //   backgroundImage: handleBackgroundImage(), // Usar la variable de importación
      //   backgroundSize: "cover", // O "contain" según necesites
      //   backgroundPosition: "center", // Para centrar la imagen
      //   loading: "lazy",
      // }}
    >
      <div className="w-full h-full flex gap-4 justify-center items-center flex-col md:flex-row">
        <div className=" w-[90%] md:w-[45%] md:h-[90%]  relative rounded-3xl text-black p-4">
          <div className="w-full flex justify-center text-black text-[25px] text-center md:text-[35px] mb-4">
            <p>
              Agenda tu consulta{" "}
              <span className="text-indigo-700 font-semibold">GRATUITA</span>
            </p>
          </div>

          <Calendario />
        </div>
        <div className="w-full md:w-[45%] md:h-[90%] relative  text-black p-8 mt-4">
          <div className="w-full flex justify-center text-black text-[25px] md:text-[35px] mb-4">
            <p className="mt-[-15px]  text-center mb-12">
              Pedi tu presupuesto{" "}
              <span className="text-indigo-700 font-semibold">SIN CARGO</span>
            </p>
          </div>
          <form action="" className="flex flex-col ">
            <input
              className="p-4 border-[2px] focus:outline-indigo-500  focus:placeholder:text-white  border-indigo-700 mb-4 rounded-full bg-transparent text-white"
              placeholder="Nombre y apellido"
              type="text"
            />
            <input
              className="p-4 border-[2px] focus:outline-indigo-500  focus:placeholder:text-white  border-indigo-700 mb-4 rounded-full bg-transparent text-white"
              placeholder="Email"
              type="email"
            />
            <input
              className="p-4 border-[2px] focus:outline-indigo-500  focus:placeholder:text-white  border-indigo-700 mb-4 rounded-full bg-transparent text-white"
              placeholder="Telefono"
              type="number"
            />
            <textarea
              className="p-4 border-[2px] h-32 focus:outline-indigo-500  focus:placeholder:text-white  border-indigo-700 mb-4 rounded-3xl bg-transparent text-white"
              placeholder="Comentario"
            />
            <div className="w-full flex justify-center">
              <button
                aria-label="Enviar formulario"
                type="submit"
                className=" w-[50%] py-4 px-8 mt-4 rounded-full shadow-xl text-black bg-gradient-to-r from-indigo-700 to-indigo-300"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormContacto;
