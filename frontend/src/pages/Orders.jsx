import { useEffect, useState } from "react";
import Api from "../api/Api";
import moment from "moment";
import DisplayCurrency from "../helpers/DisplayCurrency";

const Orders = () => {
  const [data, setData] = useState([]);

  const orderData = async () => {
    const response = await fetch(Api.orderList.url, {
      method: Api.orderList.method,
      credentials: "include", // include cookies in the request
    });
    const responseData = await response.json();
    setData(responseData.data);
    console.log(responseData.data);
  };
  useEffect(() => {
    orderData();
  }, []);
  return (
    <div>
      {!data[0] && <p>No orders Available</p>}
      <div>
        {data?.map((item, index) => {
          return (
            <div key={index} className="container w-full p-2">
              <p className="text-lg font-bold">
                {moment(item.createdAt).format("LL")}
              </p>
              <div className="flex flex-col m-2 border rounded md:flex-row">
                <div className="flex flex-col  items-center gap-2 p-2 w-[80%] ">
                  {item?.productDetails.map((orderItem, index) => {
                    return (
                      <div
                        key={index}
                        className="flex items-center w-full gap-2"
                      >
                        <img
                          src={orderItem?.image[0]}
                          alt={orderItem.name}
                          className="object-scale-down w-24 h-24"
                        />
                        <div>
                          <p>{orderItem.name}</p>
                          <p>Quantity: {orderItem.quantity}</p>
                          <p>Price: {DisplayCurrency(orderItem.price)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex flex-col justify-center gap-2 p-2 border-t-2 md:border-hidden">
                  <h1 className="text-center text-secondary ">
                    Order Billing Details
                  </h1>
                  <p className="text-xl text-bold">Payment Details</p>
                  <div className="flex justify-between gap-2">
                    <p>payment-Id:</p>
                    <p className=" text-primary">
                      {item?.paymentDetails.paymentId}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>payment Type:</p>
                    <p className=" text-primary">
                      {item?.paymentDetails.payment_method_type[0]}
                    </p>
                  </div>
                  <div className="flex items-center justify-between ">
                    <p>Payment status:</p>
                    <p className=" text-primary">
                      {item?.paymentDetails.payment_status}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="text-xl text-bold">Shipping Details</p>
                    {item.shipping_options.map((shipping, index) => {
                      return (
                        <div
                          className="flex items-center justify-between"
                          key={index}
                        >
                          <p>Shipping Amount:</p>
                          <p className=" text-primary">
                            {DisplayCurrency(shipping.shipping_amount)}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between border-t-2 ">
                    <p>Total Amount:</p>
                    <p className="text-xl text-primary">
                      {DisplayCurrency(item?.totalAmount)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
