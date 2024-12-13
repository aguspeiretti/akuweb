import { RiShoppingCartLine } from "react-icons/ri";
import Cart from "./Cart";

const CartWidgetButton = () => {
  return (
    <>
      <Cart />
      <div className="w-[80px] h-[40px] bg-indigo-700 rounded-full flex justify-center items-center text-indigo-300 absolute bottom-24 right-[-40px]">
        <div className="w-[40px] flex justify-center items-center">
          <RiShoppingCartLine size={20} />
        </div>
        <div className="w-[40px]"></div>
      </div>
    </>
  );
};

export default CartWidgetButton;
