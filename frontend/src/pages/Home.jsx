import { ToastContainer } from "react-toastify";
import BannerProduct from "../components/BannerProduct";
import HorizontalProductCard from "../components/cards/HorizontalProductCard";
import VerticalProductCard from "../components/cards/VerticalProductCard";
import CategoryList from "../components/category/CategoryList";

function Home() {
  return (
    <div className="container mx-auto">
      <ToastContainer position="top-center" />
      <CategoryList />
      <BannerProduct />
      <HorizontalProductCard
        heading={"Top Selling AirPods"}
        category={"airpodes"}
      />
      <VerticalProductCard
        category={"mobiles"}
        heading={"Top selling mobiles"}
      />
      <HorizontalProductCard
        heading={"Popular Earphones and Headphones"}
        category={"earphones"}
      />
      <VerticalProductCard
        category={"camera"}
        heading={"Best selling DSLR Cameras"}
      />
      <HorizontalProductCard
        heading={"Trending Smart Watches"}
        category={"watches"}
      />
    </div>
  );
}

export default Home;
