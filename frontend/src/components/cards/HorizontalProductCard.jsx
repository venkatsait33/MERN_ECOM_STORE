import { useContext, useEffect, useState } from "react";
import FetchCategoryProducts from "../../helpers/FetchCategoryProducts";
import DisplayCurrency from "../../helpers/DisplayCurrency";
import { Link } from "react-router-dom";
import AddToCart from "../../helpers/AddToCart";
import UserContext from "../../context/UserContext";

const HorizontalProductCard = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(5).fill(null);
  const { fetchUserAddToCart } = useContext(UserContext);

  const handleAddToCart = async (e, id) => {
    await AddToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await FetchCategoryProducts(category);
    setData(categoryProduct?.data);
    setLoading(false);
  };

  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-2 m-2">
      <h2 className="mb-2 text-xl font-semibold text-accent">{heading}</h2>
      <div className="flex gap-2 ">
        {loading
          ? loadingList.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex"
                >
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                  <div className="grid w-full gap-2 p-4">
                    <h2 className="p-1 text-base font-medium text-black rounded-full md:text-lg text-ellipsis line-clamp-1 bg-slate-200 animate-pulse"></h2>
                    <p className="p-1 capitalize rounded-full text-slate-500 bg-slate-200 animate-pulse"></p>
                    <div className="flex w-full gap-3">
                      <p className="w-full p-1 font-medium text-red-600 rounded-full bg-slate-200 animate-pulse"></p>
                      <p className="w-full p-1 line-through rounded-full text-slate-500 bg-slate-200 animate-pulse"></p>
                    </div>
                    <button className="text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : data?.map((product, index) => {
              return (
                <Link
                  to={"/product/" + product?._id}
                  key={index}
                  className="w-64 rounded shadow-xl cursor-pointer card card-compact bg-slate-200"
                >
                  <figure className="min-h-[120px] max-h-[120px]">
                    <img
                      src={product?.productImage[0]}
                      alt="Shoes"
                      className="object-scale-down h-full transition-all hover:scale-110 mix-blend-multiply"
                    />
                  </figure>
                  <div className="rounded card-body bg-primary text-base-100">
                    <h2 className="card-title text-ellipsis line-clamp-2">
                      {product?.productName}
                    </h2>
                    <p>{product?.category}</p>
                    <div className="flex ">
                      <p className="text-xl font-bold">
                        {DisplayCurrency(product.sellingPrice)}
                      </p>
                      <p className="line-through">
                        {DisplayCurrency(product.price)}
                      </p>
                    </div>

                    <div className="justify-end card-actions">
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={(e) => handleAddToCart(e, product._id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default HorizontalProductCard;
