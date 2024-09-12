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
import ErrorBoundary from "../components/error/errorBoundary";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorBoundary />}>
      <Route index element={<Home />} errorElement={<ErrorBoundary />} />

      <Route
        path="products"
        errorElement={<ErrorBoundary />}
        element={<ProductsLayout />}
      >
        <Route index element={<Products />} errorElement={<ErrorBoundary />} />
        <Route
          path="category/:category"
          element={<ProductIndex />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path=":id"
          element={<ProductDetail />}
          errorElement={<ErrorBoundary />}
        />
      </Route>
      <Route
        path="profile"
        element={<ProfileLayout />}
        errorElement={<ErrorBoundary />}
      >
        <Route index element={<Profile />} errorElement={<ErrorBoundary />} />
        <Route
          path="/profile/delete-account"
          element={<DeleteAccount />}
          errorElement={<ErrorBoundary />}
        />
      </Route>
      <Route path="cart" element={<Cart />} errorElement={<ErrorBoundary />} />
      <Route
        path="checkout"
        errorElement={<ErrorBoundary />}
        element={<CheckoutSuccess />}
      />
    </Route>
  )
);

export default routes;
