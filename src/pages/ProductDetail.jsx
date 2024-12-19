import { useState } from "react";
import NavEstatica from "../components/NavEstatica";
import { useCart } from "../context/CartContext";
import { useProductos } from "../context/crudProductos";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const [selectedTalle, setSelectedTalle] = useState("");
  const { id } = useParams();
  const { current: productos } = useProductos();
  const { addToCart } = useCart();

  const item = productos?.find((producto) => producto.$id === id);

  const varTalles1 = [0, 1, 2, 4, 6, 8, 10, 12, 16, "S", "M", "L", "XL", "XXL"];

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold mb-4">Producto no encontrado</h2>
          <p className="text-gray-400">
            El producto que buscas no está disponible
          </p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedTalle) {
      alert("Por favor selecciona un talle");
      return;
    }
    addToCart({ ...item, talle: selectedTalle });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <NavEstatica />
      <div className="h-[calc(100vh-60px)] max-w-7xl mx-auto px-4 py-4 ">
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Imagen del producto */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={item.imagen}
                  alt={item.titulo}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Detalles del producto */}
          <div className="lg:w-1/2 h-auto">
            <div className="bg-gray-800 rounded-lg shadow-xl p-8">
              <div className="space-y-6">
                {/* Categoría */}
                <div className="inline-block px-3 py-1 bg-indigo-600 rounded-full text-sm font-medium">
                  {item.categoria.toUpperCase()}
                </div>

                {/* Título */}
                <h1 className="text-3xl font-bold text-white">
                  {item.titulo.toUpperCase()}
                </h1>

                {/* Precio */}
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-white">
                    ${item.precio.toLocaleString()}
                  </span>
                </div>

                {/* Descripción */}
                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">
                    DESCRIPCIÓN
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Maxime sunt temporibus, explicabo et animi tenetur
                    cupiditate soluta veniam culpa autem magnam cumque libero,
                    magni odio quaerat omnis praesentium quisquam quo.
                  </p>
                </div>

                {/* Selector de talle y botón */}
                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-4">
                    SELECCIONA EL TALLE
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <select
                      className="w-full sm:w-1/2 px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      value={selectedTalle}
                      onChange={(e) => setSelectedTalle(e.target.value)}
                    >
                      <option value="">Seleccionar talle</option>
                      {varTalles1.map((talle) => (
                        <option key={talle} value={talle}>
                          Talle {talle}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={handleAddToCart}
                      className="w-full sm:w-1/2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Agregar al carrito
                    </button>
                  </div>
                </div>

                {/* Información adicional */}
                <div className="border-t border-gray-700 pt-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">
                        ENVÍO
                      </h3>
                      <p className="mt-2 text-sm text-gray-300">
                        A cargo del comprador por alguna plataforma como pedidos
                        ya o cabify
                      </p>
                    </div>
                  </div>
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
