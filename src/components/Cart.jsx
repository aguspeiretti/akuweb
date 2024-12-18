import { useCart } from "../context/CartContext"; // Ajusta la ruta según tu estructura
import { VscArrowCircleRight } from "react-icons/vsc";
import "../styles/cart.css";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cartOpen,
    handleOpen,
    cart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
  } = useCart();
  return (
    <>
      <div
        className={`${
          cartOpen
            ? "w-[300px] h-screen bg-white cart1 top-0 right-0 z-50 overflow-y-auto p-4 text-black rounded-tl-3xl rounded-bl-3xl shadow-[0_8px_8px_rgba(0,0,0,0.4)]"
            : "w-[300px] h-screen bg-white cart2 top-0 right-[-300px] z-50 overflow-y-auto p-4 text-black rounded-tl-3xl rounded-bl-3xl[0_8px_8px_rgba(0,0,0,0.4)]"
        }`}
      >
        <div className="flex justify-between ">
          <h2 className="text-lg font-bold mb-4">Carrito de Compras</h2>
          <p onClick={handleOpen} className="cursor-pointer">
            <VscArrowCircleRight size={30} className="text-indigo-700" />
          </p>
        </div>
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

            <Link to={"/checkout"}>
              {" "}
              <button
                className="w-full mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                // Implementa la lógica de checkout aquí
              >
                Finalizar Compra
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
