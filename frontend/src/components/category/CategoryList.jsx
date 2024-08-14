import { useEffect, useState } from "react";
import Api from "../../api/Api";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [productCategory, setProductCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(11).fill(null);

  const getProducts = async () => {
    setLoading(true);
    const responseData = await fetch(Api.product_category.url, {
      method: Api.product_category.method,
      credentials: "include",
    });
    const data = await responseData.json();
    setLoading(false);
    setProductCategory(data.data);
  };
  console.log(productCategory);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container p-4 mx-auto">
      <div className="flex items-center justify-between gap-4 overflow-x-scroll scrollbar-hide">
        {loading
          ? categoryLoading.map((category, index) => {
              return (
                <div
                  key={index}
                  className="flex items-center justify-center w-20 h-20 p-2 overflow-hidden btn btn-circle skeleton"
                ></div>
              );
            })
          : productCategory.map((product, index) => {
              return (
                <div key={index} className="cursor-pointer ">
                  <Link
                    to={"product-category/" + product?.category}
                    className="flex items-center justify-center w-20 h-20 p-2 overflow-hidden btn btn-circle bg-slate-200"
                  >
                    <img
                      src={product?.productImage[0]}
                      alt=""
                      className="object-scale-down h-full mx-auto transition-all rounded mix-blend-multiply hover:scale-105"
                    />
                  </Link>
                  <p className="text-center capitalize">{product?.category}</p>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;
