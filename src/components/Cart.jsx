import { useState } from "react";
import { RiShoppingCartLine } from "react-icons/ri";
import { useCart } from "../context/CartContext"; // Ajusta la ruta según tu estructura
import "../styles/cart.css";

const Cart = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  const handleOpen = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <>
      <div
        className={`${
          cartOpen
            ? "w-[300px] h-[calc(100vh-60px)] bg-slate-800 cart1 right-0 z-50 overflow-y-auto p-4 text-white"
            : "w-[300px] h-[calc(100vh-60px)] bg-slate-800 cart2 right-[-300px] z-50 overflow-y-auto p-4 text-white"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Carrito de Compras</h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-400">El carrito está vacío</p>
        ) : (
          <div>
            {cart.map((item) => (
              <div
                key={item.$id}
                className="flex items-center justify-between border-b border-gray-700 py-2"
              >
                <div className="flex items-center space-x-2">
                  {item.imagen && (
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="w-16 h-16 object-contain rounded"
                    />
                  )}
                  <div>
                    <p className="font-semibold">{item.nombre}</p>
                    <p className="text-sm text-gray-400">
                      ${item.precio.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item.$id, item.cantidad - 1)}
                    className="bg-indigo-700 text-white px-2 rounded"
                  >
                    -
                  </button>
                  <span>{item.cantidad}</span>
                  <button
                    onClick={() => updateQuantity(item.$id, item.cantidad + 1)}
                    className="bg-indigo-700 text-white px-2 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.$id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-4 flex justify-between items-center">
              <span className="font-bold">Total:</span>
              <span className="text-xl">${getTotalPrice().toFixed(2)}</span>
            </div>

            <button
              className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700"
              // Implementa la lógica de checkout aquí
            >
              Finalizar Compra
            </button>
          </div>
        )}
      </div>

      <div
        className={`${
          cartOpen
            ? "w-[80px] h-[40px] bg-indigo-700 rounded-full flex justify-center items-center text-indigo-300 botonCart1 right-[260px] bottom-[100px] cursor-pointer"
            : "w-[80px] h-[40px] bg-indigo-700 rounded-full flex justify-center items-center text-indigo-300 botonCart2 right-[-40px] bottom-[100px] cursor-pointer"
        }`}
        onClick={handleOpen}
      >
        <div className="w-[40px] flex justify-center items-center z-0 relative">
          <RiShoppingCartLine size={20} />
          {cart.length > 0 && (
            <span className="absolute -top-4 -left-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </div>
        <div className="w-[40px]"></div>
      </div>
    </>
  );
};

export default Cart;
