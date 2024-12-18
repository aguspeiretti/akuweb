/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const ProductCard = ({ item }) => {
  console.log(item);

  return (
    <div className="w-[300px] h-[350px] bg-gray-200 mr-2 mb-2 flex  flex-col items-center  rounded-md shadow-lg shadow-indigo-700/20">
      <div className="w-[90%] h-1/2  bg-white flex justify-center items-center overflow-hidden rounded-xl mt-4">
        <img src={item.imagen} alt={item.titulo} />
      </div>
      <div className="w-[90%] h-1/2 flex justify-between flex-col p-4">
        <h3 className="text-black pt-4">{item.titulo}</h3>
        <p>{item.descripcion}</p>
        <Link to={`/catalogo/detail/${item.$id}`}>
          <div className="w-full flex justify-center">
            <button className="w-[70%] p-2 h-9 bg-indigo-700 rounded-xl text-xs mt-4 text-white font-semibold shadow-xl">
              Ver producto
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
