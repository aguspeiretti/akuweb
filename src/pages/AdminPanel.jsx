import { useState, useRef } from "react";
import { useProductos } from "../context/crudProductos";
import { useUser } from "../context/UserContext";
import ProductTable from "../components/ProductTable";
import NavEstatica from "../components/NavEstatica";

const AdminPanel = () => {
  const user = useUser();
  const productos = useProductos();
  const fileInputRef = useRef(null);

  // State for form fields
  const [titulo, setTitulo] = useState("");
  const [precio, setPrecio] = useState(null);
  // const [stock, setStock] = useState(0);
  const [imagen, setImagen] = useState(null);
  const [categoria, setCategoria] = useState("");
  // const [talle, setTalle] = useState("");
  const [subcategoria, setSubCategoria] = useState("");
  const [detalle, setDeTalle] = useState("");

  // New state for editing
  const [editingProduct, setEditingProduct] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setImagen(file || null);
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validar que los campos no estén vacíos
      if (!titulo.trim() || precio <= 0) {
        alert("Por favor, complete todos los campos correctamente");
        return;
      }

      // Preparar los datos del producto
      const productoData = {
        titulo: titulo.trim(),
        precio: parseFloat(precio),
        // stock: parseInt(stock, 10),
        categoria,
        // talle,
        detalle,
        subcategoria,
      };

      if (editingProduct) {
        // Actualizar producto existente
        await productos.update(
          editingProduct.$id,
          productoData,
          imagen // Pasar el archivo de imagen directamente
        );
      } else {
        // Agregar nuevo producto
        let imageUrl = null;
        if (imagen) {
          imageUrl = await productos.uploadImage(imagen);
        }

        await productos.add({
          userId: user.current.$id,
          ...productoData,
          imagen: imageUrl,
        });
      }

      // Resetear el formulario
      setTitulo("");
      setPrecio(0);
      // setStock(0);
      setImagen(null);
      setDeTalle("");
      setSubCategoria("");
      setEditingProduct(null);
      setCategoria("");
      // setTalle("");
    } catch (err) {
      console.error("Error en el submit:", err);
      alert("Hubo un problema al guardar el producto");
    }
  };

  // New function to start editing a product
  const handleEditProduct = (producto) => {
    setEditingProduct(producto);
    setTitulo(producto.titulo);
    setPrecio(producto.precio);
    setSubCategoria(producto.subcategoria);
    // setStock(producto.stock);
    setCategoria(producto.categoria);
    // setTalle(producto.talle);
    setDeTalle(producto.detalle);
    setImagen(null);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingProduct(null);
    setTitulo("");
    setPrecio(0);
    // setStock(0);
    setImagen(null);
    setCategoria("");
    setSubCategoria("");
    // setTalle("");
    setDeTalle("");
  };

  return (
    <div className="min-h-screen w-screen bg-gray-50">
      <NavEstatica />
      <div className="h-[calc(100vh-60px)] flex">
        {/* Formulario de carga/edición de productos */}
        {user.current ? (
          <div className="flex w-full overflow-hidden">
            <section className="w-80 min-w-80 bg-white shadow-lg overflow-y-auto">
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                  <label
                    className="text-sm font-medium text-gray-700"
                    htmlFor="Titulo"
                  >
                    Titulo
                  </label>
                  <input
                    type="text"
                    placeholder="Titulo"
                    value={titulo}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    onChange={(event) => {
                      setTitulo(event.target.value);
                    }}
                  />
                  <label
                    className="text-sm font-medium text-gray-700"
                    htmlFor="Categoria"
                  >
                    Categoria
                  </label>
                  <input
                    type="text"
                    placeholder="Categoria..uniformes , ambos , empresas..."
                    value={categoria}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    onChange={(event) => {
                      setCategoria(event.target.value);
                    }}
                  />
                  <label
                    className="text-sm font-medium text-gray-700"
                    htmlFor="Categoria"
                  >
                    Subcategoria
                  </label>
                  <input
                    type="text"
                    placeholder="Sub-categorias jockey niños arg...etc"
                    value={subcategoria}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    onChange={(event) => {
                      setSubCategoria(event.target.value);
                    }}
                  />
                  <label
                    className="text-sm font-medium text-gray-700"
                    htmlFor="Detalle"
                  >
                    Detalle
                  </label>
                  <input
                    type="text"
                    placeholder="Detalle"
                    value={detalle}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    onChange={(event) => {
                      setDeTalle(event.target.value);
                    }}
                  />

                  <label
                    className="text-sm font-medium text-gray-700"
                    htmlFor="Precio"
                  >
                    Precio
                  </label>
                  <input
                    type="number"
                    placeholder="Precio"
                    value={precio}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-900"
                    onChange={(event) => {
                      setPrecio(parseFloat(event.target.value) || 0);
                    }}
                  />
                  {/* <input
                type="number"
                placeholder="Stock"
                value={stock}
                required
                min="0"
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-900"
                onChange={(event) => {
                  setStock(parseInt(event.target.value, 10) || 0);
                }}
              /> */}

                  {/* New file input styling */}
                  <label
                    className="text-sm font-medium text-gray-700"
                    htmlFor="file"
                  >
                    Imagen
                  </label>
                  <div>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <button
                      type="button"
                      onClick={handleFileButtonClick}
                      className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md border border-gray-300 hover:bg-gray-200 transition-colors"
                    >
                      Seleccionar Imagen
                    </button>
                    {imagen && (
                      <p className="text-sm text-gray-600 truncate mt-1">
                        {imagen.name}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-4 justify-end">
                  <button
                    type="submit"
                    className="flex-1 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition-colors"
                  >
                    {editingProduct ? "Actualizar " : "Cargar "}
                  </button>
                  {editingProduct && (
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="flex-1 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition-colors"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </form>
            </section>
            {/* Table Section */}
            <div className="flex-1 overflow-hidden">
              <ProductTable handleEditProduct={handleEditProduct} />
            </div>
          </div>
        ) : (
          <div className="w-full p-4">
            <div className="bg-yellow-100 border border-yellow-200 text-yellow-800 p-4 rounded-md">
              <p>Inicia sesión para subir un producto.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
