import Api from "../api/Api";
import { toast } from "react-toastify";

const AddToCart = async (e, id) => {
    e?.stopPropagation(), e?.preventDefault();   

  const responseData = await fetch(Api.addToCartProduct.url, {
    method: Api.addToCartProduct.method,
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId: id }),
  });

  const data = await responseData.json();
  if (data.success) {
    toast.success(data.message);
  }
  if (data.error) {
    toast.error(data.message);
  }
  return data;
};

export default AddToCart;
