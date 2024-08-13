import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Api from "./api/Api";
import UserContext from "./context/UserContext";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./redux/slice/userSlice";

const App = () => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    /* user-details */
    fetchUserDetails();
  }, []);
  return (
    <>
      <UserContext.Provider value={{ fetchUserDetails }}>
        <ToastContainer position="top-center" />
        <Navbar />
        <main className="min-h-[calc(100vh-120px)]">
          <Outlet />
        </main>
        <Footer />
      </UserContext.Provider>
    </>
  );
};
export default App;
