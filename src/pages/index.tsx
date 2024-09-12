import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./layout";
import Cart from "./cart";
import Home from "./home";
import ProductsLayout from "./products";
import Products from "./products/products";
import ProductIndex from "./products/productIndex";
import ProductDetail from "./products/productDetail";
import Profile from "./auth/profile";
import DeleteAccount from "./auth/profile/deleteAccount";
import ProfileLayout from "./auth/profile/profile";
import CheckoutSuccess from "./cart/checkout";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />

      <Route path="products" element={<ProductsLayout />}>
        <Route index element={<Products />} />
        <Route path="category/:category" element={<ProductIndex />} />
        <Route path=":id" element={<ProductDetail />} />
      </Route>
      <Route path="profile" element={<ProfileLayout />}>
        <Route index element={<Profile />} />
        <Route path="/profile/delete-account" element={<DeleteAccount />} />
      </Route>
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<CheckoutSuccess />} />
    </Route>
  )
);

export default routes;
