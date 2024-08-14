import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import DisplayCurrency from "../../helpers/DisplayCurrency";

const AdminProductCard = ({ data, onEdit, onClose, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);
  const handleEditClick = () => {
    setEditProduct(true);
    onEdit(data); // Notify the parent about the product being edited
  };
  return (
    <div className="shadow-xl card card-compact bg-base-100">
      <div className="w-40 ">
        <div className="flex items-center justify-center w-32 h-32">
          <img
            src={data?.productImage[0]}
            alt=""
            className="object-fill h-full mx-auto"
          />
        </div>
        <h1 className=" text-ellipsis line-clamp-2">{data?.productName} </h1>
        <div className="flex items-center justify-between m-2">
          <p className=" text-primary">{DisplayCurrency(data?.sellingPrice)}</p>
          <p>
            {" "}
            <span
              className="bg-green-600 rounded-full cursor-pointer w-fit btn btn-sm btn-outline"
              onClick={handleEditClick}
            >
              <MdModeEditOutline />
            </span>
          </p>
        </div>
      </div>
      <div>
        {editProduct && (
          <AdminEditProduct
            product={data}
            onClose={() => {
              setEditProduct(false), onClose();
            }}
            fetchData={fetchData}
          />
        )}
      </div>
    </div>
  );
};

export default AdminProductCard;
