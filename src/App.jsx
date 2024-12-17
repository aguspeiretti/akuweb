import { Navigate, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";

import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel";
import Catalogo from "./pages/Catalogo";
import Checkout from "./pages/Checkout";
import { useUser } from "./context/UserContext";
import { useState } from "react";
import Cart from "./components/Cart";

function App() {
  const user = useUser();
  const [cartOpen, setCartOpen] = useState(false);
  // Verificamos si el usuario es admin
  const isAdmin =
    user.current &&
    user.current.labels &&
    user.current.labels.includes("admin");
  console.log(user);

  const handleOpen = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <CartProvider>
      <Nav handleOpen={handleOpen} />
      <Cart cartOpen={cartOpen} handleOpen={handleOpen} />
      <Routes>
        <Route
          path="/"
          element={isAdmin ? <Navigate to="/admin" /> : <Home />}
        />
        <Route
          path="/admin"
          element={isAdmin ? <AdminPanel /> : <Navigate to="/" />}
        />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* Otras rutas */}
      </Routes>
    </CartProvider>
  );
}

export default App;
