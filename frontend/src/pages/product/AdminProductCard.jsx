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
    <div className="rounded ">
      <div className="">
        <img
          src={data?.productImage}
          alt=""
          width={120}
          height={120}
          className="mx-auto w-fit"
        />
        <h1 className="flex items-center justify-between m-2">
          {data?.productName}{" "}
          <span
            className="bg-green-600 rounded-full cursor-pointer w-fit btn btn-sm btn-outline"
            onClick={handleEditClick}
          >
            <MdModeEditOutline />
          </span>
        </h1>
        <p className=" text-primary">{DisplayCurrency(data?.sellingPrice)}</p>
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
