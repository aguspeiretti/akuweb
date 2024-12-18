import { useState } from "react";
// import { useCart } from "../context/CartContext";
import { useProductos } from "../context/crudProductos";
import ProductCard from "./ProductCard";

const VistaCommerce = () => {
  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("");
  // const [selectedTalle, setSelectedTalle] = useState("");

  // Obtener productos del contexto
  const { current: productos, loading, error } = useProductos();
  //   const { addToCart } = useCart();

  //   const varTalles1 = [0, 1, 2, 4, 6, 8, 10, 12, 16, "S", "M", "L", "XL", "XXL"];

  // Obtener categorías y talles únicos
  const categorias = [...new Set(productos.map((p) => p.categoria))];
  // const talles = [...new Set(productos.map((p) => p.talle))];

  // Función de filtrado de productos
  const filteredProductos =
    productos.length > 0
      ? productos.filter((producto) => {
          const matchSearchTerm = producto.nombre
            ? producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
            : true;
          const matchCategoria =
            !selectedCategoria ||
            (producto.categoria && producto.categoria === selectedCategoria);
          return matchSearchTerm && matchCategoria;
        })
      : [];

  //   const handleAddToCart = (producto) => {
  //     addToCart({
  //       $id: producto.$id,
  //       nombre: producto.nombre,
  //       precio: producto.precio,
  //       imagen: producto.imagen,
  //       // talle: producto.talle,
  //     });
  //   };

  return (
    <div className="w-full h-full  flex gap-2 p-2 overflow-hidden">
      <div className="w-[15%] h-[100%] bg-indigo-700 rounded-xl p-4">
        {/* Buscador */}
        <input
          type="text"
          placeholder="Buscar producto..."
          className="w-full p-2 rounded-xl  mb-4 text-black shadow-xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Filtro por Categoría */}
        <div className="mb-4">
          <label className="block mb-4 mt-4 font-bold">Categoría</label>
          <select
            className="w-full p-2 rounded-xl text-black shadow-xl"
            value={selectedCategoria}
            onChange={(e) => setSelectedCategoria(e.target.value)}
          >
            <option value="">Todas las Categorías</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por Talle */}
        {/* <div className="mb-4">
                <label className="block mb-2">Talle</label>
                <select
                  className="w-full p-2 rounded text-black"
                  value={selectedTalle}
                  onChange={(e) => setSelectedTalle(e.target.value)}
                >
                  <option value="">Todos los Talles</option>
                  {talles.map((talle) => (
                    <option key={talle} value={talle}>
                      {talle}
                    </option>
                  ))}
                </select>
              </div> */}
      </div>

      {/* Productos - Columna Derecha */}
      <div className="w-[85%] h-[100%] bg-white rounded-xl p-4 overflow-y-auto">
        {loading ? (
          <div className="text-center">Cargando productos...</div>
        ) : error ? (
          <div className="text-red-500">Error al cargar productos</div>
        ) : filteredProductos.length === 0 ? (
          <div className="text-center">No se encontraron productos</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProductos.map((producto) => (
              <ProductCard key={producto.titulo} item={producto} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VistaCommerce;
