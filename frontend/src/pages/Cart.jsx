import React, { useContext, useEffect, useState } from "react";
import Api from "../api/Api";
import UserContext from "../context/UserContext";
import DisplayCurrency from "../helpers/DisplayCurrency";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(UserContext);
  const loadingData = new Array(context.cartProductCount).fill(null);

  const fetchData = async () => {
    setLoading(true);
    const responseData = await fetch(Api.viewCartProducts.url, {
      method: Api.viewCartProducts.method,
      credentials: "include",
    });
    const response = await responseData.json();
    setLoading(false);
    setData(response.data);
  };

  const handleIncrement = async (id, qty) => {
    const productData = await fetch(Api.updateCart.url, {
      method: Api.updateCart.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id, quantity: qty + 1 }), // Assuming the quantity is 1 for simplicity
    });
    const productResponse = await productData.json();
    if (productResponse.success) {
      fetchData();
    }
    console.log(productResponse);
  };
  const handleDecrement = async (id, qty) => {
    if (qty >= 2) {
      const productData = await fetch(Api.updateCart.url, {
        method: Api.updateCart.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id, quantity: qty - 1 }), // Assuming the quantity is 1 for simplicity
      });
      const productResponse = await productData.json();
      if (productResponse.success) {
        fetchData();
      }
      console.log(productResponse);
    }
  };

  const deleteProduct = async (id) => {
    const productData = await fetch(Api.deleteCart.url, {
      method: Api.deleteCart.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    });
    const responseData = await productData.json();
    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
    console.log(responseData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);
  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );

  return (
    <div className="container mx-auto">
      <div>{data?.length === 0 && !loading && <div>Cart is Empty</div>}</div>

      <div className="gap-2 p-4 md:flex md:justify-between">
        {/* View Product */}
        <div className="w-full max-w-4xl ">
          {loading
            ? loadingData.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-full h-32 my-1 border rounded border-slate-200 skeleton"
                  ></div>
                );
              })
            : data?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-full my-1 border rounded border-slate-200 "
                  >
                    <div className="flex items-center gap-2 ">
                      <div className="flex items-center justify-center h-full">
                        <img
                          src={item?.productId.productImage[0]}
                          alt={item?.productId.productName}
                          className="object-scale-down w-36 h-36 bg-base-300"
                        />
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col gap-1">
                          <h1 className="text-xl text-ellipsis line-clamp-3">
                            {item?.productId.productName}
                          </h1>
                          <h1 className="text-sm">
                            {item?.productId.category}
                          </h1>
                          <div className="flex items-center gap-2 p-1">
                            <button
                              className="text-xl btn btn-sm btn-error"
                              onClick={() =>
                                handleDecrement(item?._id, item?.quantity)
                              }
                            >
                              -
                            </button>
                            <span>{item?.quantity}</span>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() =>
                                handleIncrement(item?._id, item?.quantity)
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="p-2">
                          <div className="flex items-center justify-end gap-2 p-1 ">
                            <span
                              className="cursor-pointer btn btn-circle btn-sm btn-error "
                              onClick={() => deleteProduct(item?._id)}
                            >
                              <MdDelete />
                            </span>
                          </div>
                          <div className="flex items-center gap-3 p-1 sm:flex-col">
                            <h2 className="md:text-lg text-secondary">
                              {DisplayCurrency(item?.productId.sellingPrice)}
                            </h2>
                            <h2 className="text-sm line-through">
                              {DisplayCurrency(item?.productId.price)}
                            </h2>
                          </div>
                          <div className="btn btn-outline btn-sm md:btn-md">
                            TotalPrice:&nbsp;
                            {DisplayCurrency(
                              item?.productId.sellingPrice * item?.quantity
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
        <div className=" max-[520px]:w-full lg:w-full xl:w-[33%] h-40 mt-5 lg:mt-0 bg-base-200 border border-slate-200 rounded ">
          {loading ? (
            <div>total</div>
          ) : (
            <div className="flex flex-col items-center h-36">
              <div className="flex flex-col justify-between w-full gap-3 max-[520px]:p-4 p-2" >
                <h2 className="w-full text-xl text-center uppercase bg-primary">
                  Summary
                </h2>

                <div className="flex items-center justify-between">
                  <p>Quantity: </p>
                  <h2>{totalQty}</h2>
                </div>
                <div className="flex justify-between">
                  <p>Total Price:</p>
                  <h2>{DisplayCurrency(totalPrice)}</h2>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* product Total */}
    </div>
  );
};

export default Cart;
