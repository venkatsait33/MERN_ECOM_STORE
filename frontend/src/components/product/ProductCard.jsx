import React from 'react'

const ProductCard = () => {
  return (
    <div>
      {" "}
      <div className="flex gap-2 ">
        <img src={product.productImage} className="w-32 h-32" alt="" />
        <div>
          <h1 className="capitalize ">{product.productName}</h1>
          <h1 className="capitalize ">{product.brandName}</h1>
          <h1 className="capitalize ">{product.category}</h1>
          <div className="flex items-center justify-between">
            <h1 className="line-through "> {product.price}</h1>
            <h1 className="text-xl font-bold text-primary">
              {" "}
              {product.sellingPrice}
            </h1>
          </div>

          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductCard