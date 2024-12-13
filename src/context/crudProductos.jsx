/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { databases, storage } from "../lib/appwrite";
import { ID, Query } from "appwrite";

export const AKU_DATABASE_ID = "67599510001ff20002af";
export const PRODUCTOS_COLLECTION_ID = "675ac5320003cd915208";
export const BUCKET_ID = "675acd72000f9f824904";

const ProductosContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useProductos() {
  const context = useContext(ProductosContext);
  if (context === undefined) {
    throw new Error("useProductos must be used within a ProductosProvider");
  }
  return context;
}

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function uploadImage(imageFile) {
    if (!imageFile) return null;

    try {
      const response = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        imageFile
      );
      const fileUrl = storage.getFileView(BUCKET_ID, response.$id).href;
      console.log("Imagen subida, URL:", fileUrl);
      return fileUrl;
    } catch (err) {
      console.error("Error subiendo imagen:", err);
      setError("No se pudo subir la imagen");
      throw err;
    }
  }
  async function deleteImage(imageUrl) {
    if (!imageUrl) return;

    try {
      // Extract the file ID from the Appwrite file view URL
      const fileIdMatch = imageUrl.match(
        /\/v1\/storage\/buckets\/[^/]+\/files\/([^/]+)\/view/
      );

      if (fileIdMatch && fileIdMatch[1]) {
        const fileId = fileIdMatch[1];
        await storage.deleteFile(BUCKET_ID, fileId);
        console.log("Imagen eliminada:", fileId);
      } else {
        // Alternative method: try to extract the last part of the URL
        const urlParts = imageUrl.split("/");
        const fileId = urlParts[urlParts.length - 1];

        if (fileId) {
          await storage.deleteFile(BUCKET_ID, fileId);
          console.log("Imagen eliminada (método alternativo):", fileId);
        } else {
          console.warn("No se pudo extraer el ID de imagen:", imageUrl);
        }
      }
    } catch (err) {
      console.warn("Error eliminando imagen anterior:", err);
      // Only set error if it's not a "file not found" type of error
      if (err.code !== 404) {
        setError("No se pudo eliminar la imagen anterior");
      }
    }
  }
  async function add(producto, imageFile) {
    setLoading(true);
    setError(null);

    try {
      let imagenUrl = null;
      if (imageFile) {
        imagenUrl = await uploadImage(imageFile);
      }

      const documentData = {
        ...producto,
        ...(imagenUrl && { imagen: imagenUrl }),
      };

      console.log("Datos del documento a guardar:", documentData);

      const response = await databases.createDocument(
        AKU_DATABASE_ID,
        PRODUCTOS_COLLECTION_ID,
        ID.unique(),
        documentData
      );

      console.log("Documento creado exitosamente:", response);
      setProductos((prevProductos) => [response, ...prevProductos]);

      setLoading(false);
      return response;
    } catch (err) {
      console.error("Error creando producto:", err);
      setError("No se pudo crear el producto");
      setLoading(false);
      throw err;
    }
  }

  async function update(id, producto, newImageFile) {
    setLoading(true);
    setError(null);

    try {
      // Buscar el producto existente
      const existingProduct = productos.find((p) => p.$id === id);

      let imagenUrl = existingProduct?.imagen;

      // Si hay un nuevo archivo de imagen
      if (newImageFile) {
        // Si ya existe una imagen, eliminarla
        if (imagenUrl) {
          try {
            await deleteImage(imagenUrl);
          } catch (deleteError) {
            console.warn("No se pudo eliminar la imagen anterior", deleteError);
          }
        }

        // Subir la nueva imagen
        imagenUrl = await uploadImage(newImageFile);
      }

      // Preparar datos de actualización
      const updateData = {
        ...producto,
      };

      // Agregar la imagen solo si hay una URL
      if (imagenUrl) {
        updateData.imagen = imagenUrl;
      }

      // Actualizar documento en la base de datos
      const response = await databases.updateDocument(
        AKU_DATABASE_ID,
        PRODUCTOS_COLLECTION_ID,
        id,
        updateData
      );

      console.log("Producto actualizado:", response);

      // Actualizar el estado local de productos
      setProductos((prevProductos) =>
        prevProductos.map((p) => (p.$id === id ? response : p))
      );

      setLoading(false);
      return response;
    } catch (err) {
      console.error("Error actualizando producto:", err);
      setError("No se pudo actualizar el producto");
      setLoading(false);
      throw err;
    }
  }

  async function remove(id) {
    setLoading(true);
    setError(null);

    try {
      const producto = productos.find((p) => p.$id === id);

      await databases.deleteDocument(
        AKU_DATABASE_ID,
        PRODUCTOS_COLLECTION_ID,
        id
      );

      if (producto?.imagen) {
        await deleteImage(producto.imagen);
      }

      setProductos((prevProductos) =>
        prevProductos.filter((p) => p.$id !== id)
      );

      setLoading(false);
    } catch (err) {
      console.error("Error eliminando producto:", err);
      setError("No se pudo eliminar el producto");
      setLoading(false);
      throw err;
    }
  }

  async function init() {
    setLoading(true);
    setError(null);

    try {
      const response = await databases.listDocuments(
        AKU_DATABASE_ID,
        PRODUCTOS_COLLECTION_ID,
        [Query.orderDesc("$createdAt"), Query.limit(10)]
      );

      console.log("Productos cargados:", response.documents);
      setProductos(response.documents);
      setLoading(false);
    } catch (err) {
      console.error("Error inicializando productos:", err);
      setError("No se pudieron cargar los productos");
      setLoading(false);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <ProductosContext.Provider
      value={{
        current: productos,
        add,
        update,
        remove,
        uploadImage,
        loading,
        error,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}
