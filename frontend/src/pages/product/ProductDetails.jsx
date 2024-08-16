import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../api/Api";
import DisplayCurrency from "../../helpers/DisplayCurrency";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import VerticalProductCard from "../../components/cards/VerticalProductCard";
import HorizontalProductCard from "../../components/cards/HorizontalProductCard";

const ProductDetails = () => {
  const paramsId = useParams();
  const [loading, setLoading] = useState(false);
  const productImageList = new Array(4).fill(null);
  const [details, setDetails] = useState({
    productName: "",
    brandName: "",
    category: "",
    price: "",
    sellingPrice: "",
    description: "",
    productImage: [],
  });

  const [activeImage, setActiveImage] = useState("");

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [zoomImage, setZoomImage] = useState(false);
  console.log(zoomImageCoordinate);

  const fetchData = async () => {
    setLoading(true);
    const responseData = await fetch(Api.product_details.url, {
      method: Api.product_details.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: paramsId.id }),
    });
    const dataResponse = await responseData.json();
    setLoading(false);
    setDetails(dataResponse?.data);
    setActiveImage(dataResponse?.data?.productImage[0]);
  };

  console.log(details);

  useEffect(() => {
    fetchData();
  }, []);

  const handleMouseEnterProduct = (imageUrl) => {
    setActiveImage(imageUrl);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      console.log("coordinate", left, top, width, height);

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      setZoomImageCoordinate({
        x,
        y,
      });
    },
    [zoomImageCoordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };

  return (
    <div className="container p-2 mx-auto">
      <div className="">
        <div className="min-h-[200px] flex flex-col lg:flex-row gap-4 ">
          {/** product image */}
          <div className="relative flex flex-col gap-4 sm:items-center lg:flex-row-reverse">
            <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
              <img
                src={activeImage}
                className="object-scale-down w-full h-full mix-blend-multiply"
                onMouseMove={handleZoomImage}
                onMouseLeave={handleLeaveImageZoom}
              />

              {/**product zoom */}
              {zoomImage && (
                <div className="block max-[560px]:hidden  max-md:hidden absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0">
                  <div
                    className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-110"
                    style={{
                      background: `url(${activeImage})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                        zoomImageCoordinate.y * 100
                      }% `,
                    }}
                  ></div>
                </div>
              )}
            </div>

            <div className="h-full">
              {loading ? (
                <div className="flex h-full gap-2 overflow-scroll lg:flex-col scrollbar-hide">
                  {productImageList.map((item, i) => {
                    return (
                      <div key={i}>
                        <div className="w-20 h-20 rounded skeleton"></div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex h-full gap-2 overflow-scroll lg:flex-col scrollbar-hide ">
                  {details?.productImage.map((item, i) => {
                    return (
                      <div key={i}>
                        <div className="w-20 h-20 bg-white rounded">
                          <img
                            src={item}
                            alt=""
                            className="object-scale-down cursor-pointer mix-blend-multiply "
                            onMouseEnter={() => handleMouseEnterProduct(item)}
                            onClick={() => handleMouseEnterProduct(item)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          {/**product Details */}

          <div>
            {loading ? (
              <div className="space-y-2 ">
                <h3 className="w-10 h-3 mb-2 skeleton "></h3>
                <h3 className="w-20 h-3 mb-2 skeleton "></h3>
                <h3 className="w-8 h-3 mb-2 skeleton "></h3>
                <h3 className="w-12 h-3 mb-2 skeleton "></h3>

                <div className="flex items-center gap-2 ">
                  <h3 className="w-10 h-4 mb-2 skeleton "></h3>
                  <h3 className="w-10 h-4 mb-2 skeleton "></h3>
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="h-5 mb-2 w-14 skeleton"></h3>
                  <h3 className="h-5 mb-2 w-14 skeleton "></h3>
                </div>

                <p className="flex flex-col">
                  <h3 className="w-16 h-5 mb-2 skeleton"></h3>
                  <h3 className="w-full h-5 mb-2 skeleton"></h3>
                  <h3 className="w-full h-5 mb-2 skeleton"></h3>
                </p>
              </div>
            ) : (
              <div className="space-y-2 ">
                <h3 className="mb-2 text-md btn btn-sm btn-info">
                  {details?.brandName}
                </h3>
                <h1 className="text-xl ">{details?.productName}</h1>
                <p className="text-xs capitalize ">{details?.category}</p>
                <div className="flex gap-2 text-orange-500">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfAlt />
                </div>
                <div className="flex items-center gap-2 m-2">
                  <h1 className=" text-secondary">
                    {DisplayCurrency(details?.sellingPrice)}
                  </h1>
                  <h1 className="text-sm text-gray-500 line-through">
                    {DisplayCurrency(details.price)}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <button className="btn btn-sm md:btn-md btn-primary min-w-[120px]">
                    Buy
                  </button>
                  <button className="btn btn-sm md:btn-md btn-secondary min-w-[120px]">
                    Add To Cart
                  </button>
                </div>

                <p className="flex flex-col">
                  Description:
                  <span>{details?.description}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {details?.category && (
        <HorizontalProductCard
          category={details?.category}
          heading={"Recommended Products"}
        />
      )}
    </div>
  );
};

export default ProductDetails;
