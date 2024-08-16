import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Api from "./api/Api";
import UserContext from "./context/UserContext";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./redux/slice/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);
  const fetchUserDetails = async () => {
    const responseData = await fetch(Api.current_user.url, {
      method: Api.current_user.method,
      credentials: "include",
    });

    const apiData = await responseData.json();

    if (apiData.success) {
      dispatch(setUserDetails(apiData));
    }
  };

  const fetchUserAddToCart = async () => {
    const responseData = await fetch(Api.countOfCartProducts.url, {
      method: Api.countOfCartProducts.method,
      credentials: "include",
    });
    const apiData = await responseData.json();

    if (apiData.success) {
      setCartProductCount(apiData?.data?.count);
    }
    if (apiData.error) {
      toast.error(apiData.message);
    }
  };


  useEffect(() => {
    /* user-details */
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);
  return (
    <>
      <UserContext.Provider
        value={{ fetchUserDetails, cartProductCount, fetchUserAddToCart }}
      >
        <div className="container mx-auto">
          <Navbar />
          <main className="min-h-[calc(100vh-120px)]">
            <Outlet />
          </main>
          <Footer />
        </div>
      </UserContext.Provider>
    </>
  );
};
export default App;
