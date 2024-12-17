import { useState } from "react";
import { RiShoppingCartLine } from "react-icons/ri";
import { useCart } from "../context/CartContext";

const CartWidgetButton = ({ handleOpen }) => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  return (
    <>
      <div
        onClick={handleOpen}
        className="w-[40px] h-[40px] bg-indigo-700 rounded-full flex justify-center items-center text-indigo-300  cursor-pointer"
      >
        <div className="w-[40px] flex justify-center items-center z-0 relative">
          <RiShoppingCartLine size={20} />
          {cart.length > 0 && (
            <span className="absolute -top-4 -left-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default CartWidgetButton;
