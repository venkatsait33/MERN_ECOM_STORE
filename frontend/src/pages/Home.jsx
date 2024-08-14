import BannerProduct from "../components/BannerProduct";
import HorizontalProductCard from "../components/cards/HorizontalProductCard";
import CategoryList from "../components/category/CategoryList";

function Home() {
  return <div className=''>
    <CategoryList />
    <BannerProduct />
    <HorizontalProductCard category={ "airpodes"} />
  </div>;
}

export default Home;
