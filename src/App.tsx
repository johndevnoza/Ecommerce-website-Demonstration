import { Routes, Route } from "react-router-dom";
import { Products } from "./pages/products/Products";

function App() {
  return (
    <>
      <Routes>
        <Route path="/products" element={<Products />} />
      </Routes>
    </>
  );
}

export default App;
