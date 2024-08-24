import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/user/Login";
import SignUp from "../pages/user/SignUp";
import ForgotPassword from "../pages/user/ForgotPassword";
import ProductCategoryList from "../components/category/ProductCategoryList";
import ProductDetails from "../pages/product/ProductDetails";
import { Cancel, Cart, Home, Orders, SearchProduct, Success } from "../pages";
import { AdminPanel, AllOrders, AllProducts, AllUsers } from "../pages/admin-panel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "product-category",
        element: <ProductCategoryList />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "success",
        element: <Success />,
      },
      {
        path: "cancel",
        element: <Cancel />,
      },
      {
        path: "orders",
        element: <Orders />,
      },

      {
        path: "search",
        element: <SearchProduct />,
      },
      {
        path: "admin",
        element: <AdminPanel />,
        children: [
          {
            path: "all-users",
            element: <AllUsers />,
          },
          {
            path: "all-products",
            element: <AllProducts />,
          },
          {
            path: "all-orders",
            element: <AllOrders />,
          },
        ],
      },

      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "forgotpassword",
        element: <ForgotPassword />,
      },
      // Add more routes here
    ],
  },
]);
export default router;
