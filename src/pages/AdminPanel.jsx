import { useState, useRef } from "react";
import { useProductos } from "../context/crudProductos";
import { useUser } from "../context/UserContext";
import ProductTable from "../components/ProductTable";

const AdminPanel = () => {
  const user = useUser();
  const productos = useProductos();
  const fileInputRef = useRef(null);

  // State for form fields
  const [titulo, setTitulo] = useState("");
  const [precio, setPrecio] = useState(0);
  // const [stock, setStock] = useState(0);
  const [imagen, setImagen] = useState(null);
  const [categoria, setCategoria] = useState("");
  const [talle, setTalle] = useState("");

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
        talle,
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
      setEditingProduct(null);
      setCategoria("");
      setTalle("");
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
    // setStock(producto.stock);
    setCategoria(producto.categoria);
    setTalle(producto.talle);
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
    setTalle("");
  };

  return (
    <div className="container mx-auto px-4 py-8 flex">
      {/* Formulario de carga/edición de productos */}
      {user.current ? (
        <section className="bg-white shadow-md rounded-lg p-6 mb-8 w-[300px] h-[calc(100vh-60px)]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Titulo"
                value={titulo}
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-950"
                onChange={(event) => {
                  setTitulo(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Categoria"
                value={categoria}
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-950"
                onChange={(event) => {
                  setCategoria(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Talle"
                value={talle}
                required
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-950"
                onChange={(event) => {
                  setTalle(event.target.value);
                }}
              />
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
                  className="w-full bg-gray-100 text-gray-700 py-3 rounded-md border border-gray-300 hover:bg-gray-200 transition duration-300 ease-in-out"
                >
                  Seleccionar Imagen
                </button>
                {imagen && (
                  <div className="mt-2 text-sm text-gray-600 truncate">
                    {imagen.name}
                  </div>
                )}
              </div>
            </div>
            <div className="flex space-x-4 justify-end">
              <button
                type="submit"
                className="w-[130px] bg-indigo-700 text-white py-3 rounded-md hover:bg-indigo-800 transition duration-300 ease-in-out"
              >
                {editingProduct ? "Actualizar " : "Cargar "}
              </button>
              {editingProduct && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="w-[130px] bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600 transition duration-300 ease-in-out"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>
      ) : (
        <section className="bg-yellow-100 border border-yellow-200 text-yellow-800 p-4 rounded-md mb-8">
          <p>Inicia sesión para subir un producto.</p>
        </section>
      )}

      <ProductTable handleEditProduct={handleEditProduct} />
    </div>
  );
};

export default AdminPanel;
