import { Routes, Route } from "react-router-dom";
import { Products } from "@/pages/productRelated/products/Products";
import Home from "@/pages/Home";
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import Product from "@/pages/productRelated/products/Product";
import Login from "@/components/form/Login";
import Register from "./components/form/Register";
import UseProtectedRoute from "./hooks/useProtectedRoute";
import Category from "@/pages/productRelated/Category";
import Categories from "@/pages/productRelated/Categories";
import Shopping from "./pages/userRelated/Shopping";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<UseProtectedRoute />}></Route>
        <Route path="/products" element={<Products />} />
        <Route path="/products/product/:id" element={<Product />} />
        <Route path="/product-category" element={<Categories />}>
          <Route path=":id" element={<Category />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shopping" element={<Shopping />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
