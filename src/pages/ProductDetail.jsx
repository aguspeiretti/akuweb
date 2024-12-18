import NavEstatica from "../components/NavEstatica";
import { useProductos } from "../context/crudProductos";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams(); // Obtén el ID de los parámetros de la URL
  const { current: productos } = useProductos(); // Obtén la lista de productos desde el contexto

  // Encuentra el producto que coincide con el id
  const item = productos?.find((producto) => producto.$id === id);

  // Manejo de errores si el producto no se encuentra
  if (!item) {
    return (
      <div className="w-full h-full text-white bg-black bg-opacity-80 flex items-center justify-center">
        <p className="text-xl font-semibold">Producto no encontrado</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-60px)]  text-white bg-kblac bg-opacity-80">
      <NavEstatica />
      <div className="w-full h-full flex flex-wrap justify-center items-center">
        {/* Imagen del producto */}
        <div className="w-3/6 bg-white h-full flex flex-col justify-center items-center">
          <div className="w-full h-full flex justify-center items-center">
            <img
              src={item.imagen}
              alt={item.titulo}
              className="max-w-full max-h-full"
            />
          </div>
        </div>
        {/* Detalles del producto */}
        <div className="w-3/6 h-full p-8 bg-black bg-opacity-90 text-white rounded-lg flex justify-center items-center">
          <div className="w-[80%] h-[100%] flex justify-center  flex-col ">
            <h1 className="font-semibold text-xl pb-8">
              {item.categoria.toUpperCase()}
            </h1>
            <h1 className="font-semibold text-xl pb-8">
              {item.titulo.toUpperCase()}
            </h1>
            <h3 className="font-semibold text-xl pb-6">$ {item.precio}</h3>
            <div className="w-full ">
              <p>DESCRIPCION</p>
              <p className="uppercase">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime
                sunt temporibus, explicabo et animi tenetur cupiditate soluta
                veniam culpa autem magnam cumque libero, magni odio quaerat
                omnis praesentium quisquam quo.
              </p>
            </div>
            <div className="mt-4 ">
              <p>TAMAÑOS</p>
              <div className="flex gap-4 mt-4">
                <div>
                  <select className="w-[150px] h-[50px]" name="" id=""></select>
                </div>
                <div className="w-[150px] h-[50px] text-center">
                  Agregar al carrito
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
