import { Navigate, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Home from "./pages/Home";
import AdminPanel from "./pages/AdminPanel";
import Catalogo from "./pages/Catalogo";
import Checkout from "./pages/Checkout";
import { useUser } from "./context/UserContext";
import Cart from "./components/Cart";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const user = useUser();
  // Verificamos si el usuario es admin
  const isAdmin =
    user.current &&
    user.current.labels &&
    user.current.labels.includes("admin");
  console.log(user);

  return (
    <CartProvider>
      <Cart />
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
        <Route path="/catalogo/detail/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* Otras rutas */}
      </Routes>
    </CartProvider>
  );
}

export default App;
