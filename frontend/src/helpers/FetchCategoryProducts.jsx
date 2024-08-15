import React from "react";
import Api from "../api/Api";

const FetchCategoryProducts = async (category) => {
  const responseData = await fetch(Api.category_wise_products.url, {
    method: Api.category_wise_products.method,
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ category: category }),
  });

    const dataResponse = await responseData.json();
    console.log(dataResponse);
    

  return dataResponse;
};

export default FetchCategoryProducts;
