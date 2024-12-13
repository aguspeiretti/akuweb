import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { ProductosProvider } from "./context/crudProductos.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <ProductosProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProductosProvider>
    </UserProvider>
  </StrictMode>
);
