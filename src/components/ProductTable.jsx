import { FaTrashCan } from "react-icons/fa6";
import { FaPencil } from "react-icons/fa6";
import { useProductos } from "../context/crudProductos";
import { useEffect, useState } from "react";

const ProductTable = ({ handleEditProduct }) => {
  const productos = useProductos();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (productos) {
      setLoading(false);
    }
  }, [productos]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        Cargando productos...
      </div>
    );
  }

  if (productos.current.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        No hay productos disponibles.
      </div>
    );
  }

  // Filtrar los productos según el término de búsqueda
  const filteredProducts = productos.current.filter((product) => {
    const search = searchTerm.toLowerCase();
    return (
      product.categoria.toLowerCase().includes(search) ||
      product.titulo.toLowerCase().includes(search) ||
      // product.stock.toString().includes(search) ||
      product.precio.toString().includes(search)
    );
  });

  // Ordenar los productos filtrados
  const sortedItems = filteredProducts.sort((a, b) =>
    a.titulo.localeCompare(b.titulo)
  );

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div className="px-4 py-2 border-b">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex-grow overflow-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-white z-10 border-b">
            <tr>
              <th className="px-4 py-2 text-left w-[20%] sticky top-0 bg-white">
                Categoria
              </th>
              <th className="px-4 py-2 text-left w-[25%] sticky top-0 bg-white">
                Título
              </th>
              <th className="px-4 py-2 text-left w-[10%] sticky top-0 bg-white">
                Talle
              </th>
              {/* <th className="px-4 py-2 text-center w-[10%] sticky top-0 bg-white">
                Stock
              </th> */}
              <th className="px-4 py-2 text-center w-[15%] sticky top-0 bg-white">
                Precio
              </th>
              <th className="px-4 py-2 text-center w-[20%] sticky top-0 bg-white">
                Imagen
              </th>
              <th className="px-4 py-2 text-center w-[20%] sticky top-0 bg-white">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedItems?.map((product, index) => (
              <tr
                key={product.$id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition-colors`}
              >
                <td className="px-4 py-2 w-[20%]">{product.categoria}</td>
                <td className="px-4 py-2 w-[25%]">{product.titulo}</td>
                <td className="px-4 py-2 w-[10%]">{product.talle}</td>
                {/* <td className="px-4 py-2 text-center w-[10%]">
                  {product.stock}
                </td> */}
                <td className="px-4 py-2 text-center w-[15%]">
                  ${product.precio.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-center w-[20%]">
                  {product.imagen && (
                    <div className="flex justify-center">
                      <img
                        src={product.imagen}
                        alt={product.titulo}
                        className="w-12 h-12 object-contain rounded"
                      />
                    </div>
                  )}
                </td>
                <td className="px-4 py-2 text-center w-[20%]">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="w-8 h-8 flex items-center justify-center bg-indigo-700  rounded-lg text-white hover:bg-indigo-600 transition-colors"
                    >
                      <FaPencil />
                    </button>

                    <button
                      onClick={() => productos.remove(product.$id)}
                      className="w-8 h-8 flex items-center justify-center bg-indigo-700  rounded-lg text-white hover:bg-indigo-600 transition-colors"
                    >
                      <FaTrashCan />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredProducts.length === 0 && (
        <div className="flex items-center justify-center p-4 text-gray-500">
          No se encontraron productos
        </div>
      )}
    </div>
  );
};

export default ProductTable;
