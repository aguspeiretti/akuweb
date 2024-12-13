import { useState } from "react";
import { ref, push, set } from "firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { database, storage } from "./firebaseConfig";

const ProductUpload = () => {
  const [productData, setProductData] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProductData((prev) => ({
      ...prev,
      imagen: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Subir imagen a Firebase Storage
      const imageRef = storageRef(
        storage,
        `productos/${productData.imagen.name}`
      );
      const snapshot = await uploadBytes(imageRef, productData.imagen);
      const imageUrl = await getDownloadURL(snapshot.ref);

      // Crear producto con URL de imagen
      const newProductRef = push(ref(database, "productos"));
      await set(newProductRef, {
        nombre: productData.nombre,
        precio: productData.precio,
        descripcion: productData.descripcion,
        imagenUrl: imageUrl,
      });

      alert("Producto subido exitosamente");
      // Limpiar formulario
      setProductData({
        nombre: "",
        precio: "",
        descripcion: "",
        imagen: null,
      });
    } catch (error) {
      console.error("Error subiendo producto:", error);
      alert("Hubo un error subiendo el producto");
    }
  };

  return (
    <div>
      <h2>Subir Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del producto"
          value={productData.nombre}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio"
          value={productData.precio}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={productData.descripcion}
          onChange={handleInputChange}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        <button type="submit">Subir Producto</button>
      </form>
    </div>
  );
};

export default ProductUpload;
