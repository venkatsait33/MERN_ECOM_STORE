import { useEffect, useState } from "react";
import FetchCategoryProducts from "../../helpers/FetchCategoryProducts";
import DisplayCurrency from "../../helpers/DisplayCurrency";
import { Link } from "react-router-dom";
const VerticalProductCard = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(11).fill(null);

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
        {data?.map((product, index) => {
          return (
            <Link
              to={"product/" + product?._id}
              key={index}
              className="w-64 rounded shadow-xl cursor-pointer card card-compact bg-slate-200"
            >
              <figure className="min-h-[220px] max-h-[220px]">
                <img
                  src={product?.productImage[0]}
                  alt="Shoes"
                  className="object-scale-down h-full transition-all hover:scale-110 mix-blend-multiply "
                />
              </figure>
              <div className="rounded card-body bg-neutral-content text-base-100">
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
                  <button className="btn btn-secondary btn-sm">Buy Now</button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default VerticalProductCard;
