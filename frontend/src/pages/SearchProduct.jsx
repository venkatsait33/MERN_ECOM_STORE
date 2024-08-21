import { Link, useLocation } from "react-router-dom";
import Api from "../api/Api";
import { useEffect, useState } from "react";
import DisplayCurrency from "../helpers/DisplayCurrency";

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchProduct = async () => {
    setLoading(true);
    const response = await fetch(Api.searchProduct.url + query.search);
    const responseData = await response.json();
    setLoading(false);
    setData(responseData.data);
  };
  console.log(data);

  useEffect(() => {
    fetchSearchProduct();
  }, [query]);

  return (
    <div className="container p-2 mx-auto">
          <p>Search Results :{data?.length}</p>
          {
              data.length === 0 && !loading && (
                  <div className="p-4 text-lg text-center bg-base-300"><p>No Data Found</p></div>
              )
          }
      <div className="sm:grid sm:grid-cols-2  max-[520px]:flex max-[520px]:flex-col max-[520px]:justify-center max-[520px]:item-center gap-2 p-2 w-100 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-auto ">
        {loading ? (
          <div>Loading...</div>
        ) : (
          data.map((product, index) => {
            return (
              <Link
                to={"/product/" + product?._id}
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
                    <button className="btn btn-secondary btn-sm">
                      Add To Cart
                    </button>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SearchProduct;
