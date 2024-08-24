import { useLocation, useNavigate } from "react-router-dom";
import ProductCategory from "../ProductCategorys";
import { useEffect, useState } from "react";
import VerticalProductCard from "../cards/VerticalProductCard";
import Api from "../../api/Api";
import VerticalCard from "../cards/VericalCard";

const ProductCategoryList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListArray = urlSearch.getAll("category");
  const urlCategoryListObject = {};
  urlCategoryListArray.forEach((el) => (urlCategoryListObject[el] = true));

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  const fetchData = async () => {
    const response = await fetch(Api.filterProducts.url, {
      method: Api.filterProducts.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category: filterCategoryList }),
    });
    const responseData = await response.json();
    setData(responseData?.data || []);
  };

  console.log(data);

  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;

    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);
    setFilterCategoryList(arrayOfCategory);

    // formate for url change when change on the checkbox
    const urlFormate = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }

      return `category=${el}&&`;
    });

    navigate("/product-category?" + urlFormate.join(""));
    ///product-category?category=printers&&category=mobiles
  }, [selectCategory]);

  const handleSortBy = (e) => {
    const { value } = e.target;
    setSortBy(value);
    if (value === "asc") {
      setData((prev) => prev.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }
    if (value === "dsc") {
      setData((prev) => prev.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };

  useEffect(() => {}, [sortBy]);
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-[200px,1fr] gap-3 ">
        {/* left Side */}
        <div className=" p-2 min-h-[calc(100vh-120px)] shadow border space-y-2 overflow-y-scroll scrollbar-hide   ">
          {/** sort by price */}
          <div>
            <h3 className="pb-1 text-base font-medium uppercase border-b border-slate-200">
              Sort by
            </h3>
            <form action="" className="flex flex-col gap-2 text-base ">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sortBY"
                  value={"asc"}
                  checked={sortBy === "asc"}
                  onChange={handleSortBy}
                />
                <label htmlFor="">Price Low to High</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sortBy"
                  value={"dsc"}
                  checked={sortBy === "dsc"}
                  onChange={handleSortBy}
                />
                <label htmlFor="">Price High to low</label>
              </div>
            </form>
          </div>
          {/** sort by category */}
          <div>
            <h3 className="pb-1 text-base font-medium uppercase border-b border-slate-200">
              category
            </h3>
            <form action="" className="flex flex-col gap-2 text-base ">
              <div className="flex flex-col justify-between">
                {ProductCategory?.map((el, index) => {
                  return (
                    <div
                      value={el?.value}
                      className="flex items-center gap-2"
                      key={el?.value + index}
                    >
                      <input
                        type="checkbox"
                        name="category"
                        id={el?.value}
                        value={el?.label}
                        checked={selectCategory[el?.value]}
                        onChange={handleSelectCategory}
                      />
                      <label htmlFor={el?.value}>{el?.label}</label>
                    </div>
                  );
                })}
              </div>
            </form>
          </div>
        </div>
        {/* Right Side */}
        <div className="w-full space-y-2">
          <p>Results:{data?.length}</p>
          <div className="min-h-[calc(100vh-120px)] overflow-y-scroll bg-base-200 max-h-[calc(100vh-120px)] scrollbar-hide">
            {data.length !== 0 && !loading && (
              <VerticalCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryList;
