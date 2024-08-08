import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-100px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default App;
