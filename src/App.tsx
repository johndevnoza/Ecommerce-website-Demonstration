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
import Favorites from "./pages/userRelated/Favorites";
import Sales from "./pages/productRelated/Sales";
import Profile from "./pages/userRelated/Profile";
import Orders from "./pages/userRelated/Orders";
import ProfileDetails from "./pages/userRelated/ProfileDetails";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/products/page/:page"
          element={<Products isHomePage={false} />}
        />
        <Route path="/product/productName/:id" element={<Product />} />
        <Route path="/product-category" element={<Categories />}>
          <Route path=":categoryName" element={<Category />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<UseProtectedRoute />}>
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/profile" element={<Profile />}>
            <Route path="/profile/Details" element={<ProfileDetails />} />
            <Route path="/profile/Orders" element={<Orders />} />
          </Route>
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/sales" element={<Sales />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
