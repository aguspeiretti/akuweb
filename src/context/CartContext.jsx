/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

// Hook personalizado para usar el contexto del carrito
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState(() => {
    // Inicializar desde localStorage si existe
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Guardar el carrito en localStorage cuando cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Agregar producto al carrito
  const addToCart = (producto) => {
    setCart((prevCart) => {
      // Verificar si el producto ya existe en el carrito
      const existingItemIndex = prevCart.findIndex(
        (item) => item.$id === producto.$id && item.talle === producto.talle
      );

      if (existingItemIndex > -1) {
        // Si existe, incrementar la cantidad en 1
        const newCart = [...prevCart];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          cantidad: newCart[existingItemIndex].cantidad + 1,
        };
        return newCart;
      } else {
        // Si no existe, agregar nuevo producto con cantidad 1
        return [
          ...prevCart,
          {
            ...producto,
            cantidad: 1,
          },
        ];
      }
    });
  };

  // Eliminar producto del carrito
  const removeFromCart = (productoId) => {
    setCart((prevCart) => prevCart.filter((item) => item.$id !== productoId));
  };

  // Actualizar cantidad de un producto
  const updateQuantity = (productoId, cantidad) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.$id === productoId
          ? { ...item, cantidad: Math.max(1, cantidad) }
          : item
      )
    );
  };

  // Limpiar todo el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Obtener número total de items en el carrito
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.cantidad || 1), 0);
  };

  // Obtener precio total del carrito
  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.precio * (item.cantidad || 1),
      0
    );
  };

  const handleOpen = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        handleOpen,
        cartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
