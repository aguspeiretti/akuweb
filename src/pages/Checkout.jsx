import { useState } from "react";
import { useCart } from "../context/CartContext";
import { ImWhatsapp } from "react-icons/im";

const Checkout = () => {
  const { cart, getTotalPrice } = useCart();
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
    const productList = cart
      .map(
        (item) =>
          `- ${item.titulo} x${item.cantidad} ($${item.precio * item.cantidad})`
      )
      .join("\n");

    const total = getTotalPrice();

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
    const businessWhatsAppNumber = "+5493518015096";
    const message = encodeURIComponent(generateWhatsAppMessage());
    window.open(
      `https://wa.me/${businessWhatsAppNumber}?text=${message}`,
      "_blank"
    );
    setOrderSent(true);
  };

  if (orderSent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ¡Gracias por tu pedido!
            </h2>
            <p className="text-gray-600 mb-4">
              Hemos enviado tu pedido al vendedor. Pronto recibirás una
              respuesta para confirmar la disponibilidad de los productos.
            </p>
            <p className="text-sm text-gray-500">
              Nuestro equipo se pondrá en contacto contigo en breve.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Finalizar Compra
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Resumen del pedido */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-800 text-white px-6 py-4">
                <h2 className="text-xl font-semibold">Resumen del Pedido</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Producto
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Talle
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cantidad
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cart.map((product, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {product.titulo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {product.talle}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                          {product.cantidad}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                          ${(product.precio * product.cantidad).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-gray-50 px-6 py-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Información de Contacto
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="nombreCompleto"
                  >
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="nombreCompleto"
                    name="nombreCompleto"
                    value={formData.nombreCompleto}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="telefono"
                  >
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    pattern="[0-9]+"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
                >
                  <ImWhatsapp className="text-xl" />
                  <span>Enviar pedido por WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
