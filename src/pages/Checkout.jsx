import React, { useState } from "react";
import { useCart } from "../context/CartContext"; // Asumo que tienes un contexto de carrito

const Checkout = () => {
  // const { cartItems } = useCart(); // Obtener items del carrito

  const cartItems = ["remera", "pantalon", "pollera"];

  const [customerData, setCustomerData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [orderSent, setOrderSent] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const generateWhatsAppMessage = () => {
    // Genera el mensaje de pedido
    const productList = cartItems
      .map(
        (item) =>
          `- ${item.name} x${item.quantity} ($${item.price * item.quantity})`
      )
      .join("\n");

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return `*Nuevo Pedido*\n
Nombre: ${customerData.name}
Teléfono: ${customerData.phone}
Email: ${customerData.email}

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
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Finalizar Pedido</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Nombre Completo</label>
          <input
            type="text"
            name="name"
            value={customerData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Teléfono</label>
          <input
            type="tel"
            name="phone"
            value={customerData.phone}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email (opcional)</label>
          <input
            type="email"
            name="email"
            value={customerData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            Enviar Pedido por WhatsApp
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
