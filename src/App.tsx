import { Routes, Route } from "react-router-dom";
import { Products } from "./pages/products/Products";
import Home from "./pages/Home";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import Product from "./pages/products/Product";
import Categories from "./pages/Categories";
import Category from "./pages/Category";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        {/* <Route path="/products/categories" element={<Categories />} /> */}
        <Route path="/products/categories" element={<Categories />}>
          <Route path=":id" element={<Category />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
