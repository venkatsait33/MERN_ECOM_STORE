import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Login from "../pages/user/Login";
import SignUp from "../pages/user/SignUp";
import ForgotPassword from "../pages/user/ForgotPassword";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/user/AllUsers";
import AllProducts from "../pages/product/AllProducts";
import ProductCategoryList from "../components/category/ProductCategoryList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      {path:"product-category/:categoryName", element:<ProductCategoryList/>},
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
