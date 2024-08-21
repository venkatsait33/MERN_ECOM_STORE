import { useEffect, useState } from "react";
import Api from "../api/Api";

const Orders = () => {
  const [data, setData] = useState([]);

  const orderData = async () => {
    const response = await fetch(Api.orderList.url, {
      method: Api.orderList.method,
      credentials: "include", // include cookies in the request
    });
    const responseData = await response.json();
    console.log(responseData);
  };
  useEffect(() => {
    orderData();
  }, []);
  return <div>Orders</div>;
};

export default Orders;
