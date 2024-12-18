import { useState } from "react";
import { useCart } from "../context/CartContext"; // Asumo que tienes un contexto de carrito
import { ImWhatsapp } from "react-icons/im";
const Checkout = () => {
  const { cart, getTotalPrice } = useCart(); // Obtener items del carrito

  const [orderSent, setOrderSent] = useState(false);
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    email: "",
    telefono: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateWhatsAppMessage = () => {
    // Genera el mensaje de pedido
    const productList = cart
      .map(
        (item) =>
          `- ${item.titulo} x${item.cantidad} ($${item.precio * item.cantidad})`
      )
      .join("\n");

    const total = cart.reduce(
      (sum, item) => sum + item.precio * item.cantidad,
      0
    );

    return `*Nuevo Pedido*\n
Nombre: ${formData.nombreCompleto}
Teléfono: ${formData.telefono}
Email: ${formData.email}

*Productos:*
${productList}

*Total: $${total.toFixed(2)}*

Por favor, confirme disponibilidad de productos.`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Número de WhatsApp del negocio (reemplazar con el número real)
    const businessWhatsAppNumber = "+5493518015096";

    // Codificar el mensaje para URL
    const message = encodeURIComponent(generateWhatsAppMessage());

    // Abrir WhatsApp Web con el mensaje pre-lleno
    window.open(
      `https://wa.me/${businessWhatsAppNumber}?text=${message}`,
      "_blank"
    );

    // Marcar pedido como enviado
    setOrderSent(true);
  };

  if (orderSent) {
    return (
      <div className="text-center p-6 bg-green-100">
        <h2 className="text-2xl font-bold text-green-700">
          ¡Gracias por tu pedido!
        </h2>
        <p className="mt-4 text-green-600">
          Hemos enviado tu pedido al vendedor. Pronto recibirás una respuesta
          para confirmar la disponibilidad de los productos.
        </p>
        <p className="mt-2 text-sm text-gray-600">
          Nuestro equipo se pondrá en contacto contigo en breve.
        </p>
      </div>
    );
  }

  return (
    <div className="finalizar w-screen h-screen flex pt-10 pl-4">
      <div className="w-1/2 h-5/6  rounded-xl bg-slate-600 opacity-90 relative ">
        <h2 className="text-white text-1xl font-bold px-8 py-4">Mi pedido</h2>
        <div>
          <table className="w-full">
            <thead className="bg-black bg-opacity-50 ">
              <tr>
                <th className="px-4 py-2 text-left ">Título</th>
                <th className="px-4 py-2 text-center">talle</th>
                <th className="px-4 py-2  text-center">Cantidad</th>
              </tr>
            </thead>
            <tbody className="">
              {cart.map((product, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? "bg-gray-200 bg-opacity-50"
                      : "bg-gray-400 h-10 bg-opacity-50"
                  }
                >
                  <td className="px-4 py-2">{product.titulo}</td>
                  <td className="px-4 py-2 text-center">{product.talle}</td>
                  <td className="px-4 py-2 text-center">{product.cantindad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="absolute bottom-5 h-10 w-full bg-slate-400 flex items-center justify-end pr-8">
          <p className="mr-2">Total: </p>
          <div className="font-bold"> ${getTotalPrice().toFixed(2)}</div>
        </div>
      </div>
      <div className=" w-1/2 flex flex-col justify-start items-center">
        <h1 className="text-white text-2xl mb-10">
          Complete los campos para finalizar la compra
        </h1>
        <form className="w-2/3 mt-4">
          <label className="block mb-2 text-white" htmlFor="nombreCompleto">
            Nombre Completo:
          </label>
          <input
            type="text"
            id="nombreCompleto"
            name="nombreCompleto"
            value={formData.nombreCompleto}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded"
            required
          />

          <label className="block mb-2 text-white" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded"
            required
            pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
          />

          <label className="block mb-2 text-white" htmlFor="telefono">
            Teléfono:
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full p-2 mb-4 rounded"
            required
            pattern="[0-9]+"
          />
        </form>

        <button
          onClick={handleSubmit}
          className="bg-lime-600 p-2 text-white rounded-lg mt-2"
        >
          Enviar pedido por <ImWhatsapp />
        </button>
      </div>
    </div>
  );
};

export default Checkout;
