import { useState } from "react";
import { useProductos } from "../context/crudProductos"; // Ajusta la ruta según tu estructura
import { useCart } from "../context/CartContext"; // Ajusta la ruta según tu estructura
import Cart from "../components/Cart";
import "../styles/catalogo.css";

const Catalogo = () => {
  const [animationStart, setAnimationStart] = useState(true);
  const [catSelected, setCatSelected] = useState("cat1");

  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("");
  // const [selectedTalle, setSelectedTalle] = useState("");

  // Obtener productos del contexto
  const { current: productos, loading, error } = useProductos();
  const { addToCart } = useCart();

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
          // const matchTalle =
          //   !selectedTalle ||
          //   (producto.talle && producto.talle === selectedTalle);

          return matchSearchTerm && matchCategoria;
        })
      : [];

  const handleAnimation = (cat) => {
    setAnimationStart(false);
    setCatSelected(cat);
  };

  const handleAddToCart = (producto) => {
    addToCart({
      $id: producto.$id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      // talle: producto.talle,
    });
  };

  return (
    <div className="w-screen h-[calc(100vh-60px)] bg-zinc-400 overflow-hidden -z-10">
      <div className="w-full h-[calc(100vh-60px)] flex absolute z-0">
        <div
          className={`${
            animationStart ? "animado1 " : "animado1 animado1-active"
          }`}
          onClick={() => handleAnimation("cat1")}
        ></div>
        <div
          className={`${
            animationStart ? "animado2" : "animado2 animado2-active"
          }`}
          onClick={() => handleAnimation("cat2")}
        ></div>

        {catSelected === "cat2" ? (
          <div className="text-white w-[100%] h-[100%] bg-gray-900 flex p-2 gap-2">
            {/* Filtros - Columna Izquierda */}
            <div className="w-[18%] h-[100%] bg-gray-500 rounded-xl p-4">
              <h2 className="text-xl font-bold mb-4">Filtros</h2>

              {/* Buscador */}
              <input
                type="text"
                placeholder="Buscar producto..."
                className="w-full p-2 rounded mb-4 text-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/* Filtro por Categoría */}
              <div className="mb-4">
                <label className="block mb-2">Categoría</label>
                <select
                  className="w-full p-2 rounded text-black"
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
            <div className="w-[82%] h-[100%] bg-gray-400 rounded-xl p-4 overflow-y-auto">
              {loading ? (
                <div className="text-center">Cargando productos...</div>
              ) : error ? (
                <div className="text-red-500">Error al cargar productos</div>
              ) : filteredProductos.length === 0 ? (
                <div className="text-center">No se encontraron productos</div>
              ) : (
                <div className="grid grid-cols-4 gap-4">
                  {filteredProductos.map((producto) => (
                    <div
                      key={producto.$id}
                      className="bg-white rounded-lg shadow-md p-4 flex flex-col"
                    >
                      {producto.imagen && (
                        <img
                          src={producto.imagen}
                          alt={producto.nombre}
                          className="w-full h-48 object-contain rounded-t-lg mb-4"
                        />
                      )}
                      <h3 className="text-lg font-semibold">
                        {producto.nombre}
                      </h3>
                      {/* <p className="text-gray-600">Talle: {producto.talle}</p> */}
                      <p className="text-xl font-bold text-green-600 mb-2">
                        ${producto.precio.toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleAddToCart(producto)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                      >
                        Agregar al Carrito
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-white w-[100%] h-[100%] bg-gray-900 flex gap-2 p-2">
            {/* Contenido anterior */}
          </div>
        )}
      </div>

      <Cart />
    </div>
  );
};

export default Catalogo;
