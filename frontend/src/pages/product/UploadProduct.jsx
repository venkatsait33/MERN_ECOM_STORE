import { useState } from "react";
import ProductCategory from "../../components/ProductCategorys";
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadImage from "../../helpers/UploadImage";
import { CgClose } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import InputForm from "../../components/InputForm";
import Api from "../../api/Api";
import { toast } from "react-toastify";

const UploadProduct = ({ onClose }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    price: "",
    description: "",
    sellingPrice: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    const uploadImage = await UploadImage(file);
    setData({
      ...data,
      productImage: [...data.productImage, uploadImage.url],
    });
  };

  const handleDeleteProductImage = async (index) => {
    console.log("index", index);
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData({
      ...data,
      productImage: [...newProductImage],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const responseData = await fetch(Api.upload_product.url, {
      method: Api.upload_product.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const apiData = await responseData.json();
    console.log(apiData);

    if (apiData.success) {
      toast.success(apiData?.message);
      onClose();
    }
    if (apiData.error) {
      toast.error(apiData?.message);
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center w-full h-full rounded ">
      <div className=" p-4 bg-base-200 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex items-center justify-between pb-3">
          <h2 className="text-lg font-bold">Upload Product</h2>
          <div
            className="btn btn-sm btn-circle btn-secondary"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form
          className="grid h-full gap-2 p-4 pb-5 overflow-y-scroll"
          onSubmit={handleSubmit}
        >
          <InputForm
            label="productName"
            type="text"
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
          />
          <InputForm
            label="brandName"
            type="text"
            name="brandName"
            value={data.brandName}
            onChange={handleOnChange}
          />
          <div className="flex justify-between">
            <label htmlFor="category" className="mt-3">
              Category :
            </label>
            <select
              required
              value={data.category}
              name="category"
              onChange={handleOnChange}
              className="w-full max-w-xs select select-bordered"
            >
              <option value={""}>Select Category</option>
              {ProductCategory.map((el, index) => {
                return (
                  <option value={el.value} key={el.value + index}>
                    {el.label}
                  </option>
                );
              })}
            </select>
          </div>

          <label htmlFor="productImage" className="mt-3">
            Product Image :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="flex items-center justify-center w-full h-32 p-2 border rounded cursor-pointer ">
              <div className="flex flex-col items-center justify-center gap-2 text-slate-500">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUploadImage}
                />
              </div>
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2">
                {data.productImage.map((el, index) => {
                  return (
                    <div className="relative group" key={index}>
                      <img
                        src={el}
                        alt={el}
                        width={80}
                        height={80}
                        className="border cursor-pointe"
                      />
                      <div
                        className="absolute bottom-0 right-0 p-1 bg-red-600 rounded-full cursor-pointer"
                        onClick={() => handleDeleteProductImage(index)}
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-red-600">
                *Please upload product image
              </p>
            )}
          </div>

          <InputForm
            label="price"
            type="number"
            name="price"
            value={data.price}
            onChange={handleOnChange}
          />

          <InputForm
            label="sellingPrice"
            type="number"
            name="sellingPrice"
            value={data.sellingPrice}
            onChange={handleOnChange}
          />

          <label htmlFor="description" className="mt-3">
            Description :
          </label>
          <textarea
            className="h-24 textarea textarea-bordered"
            placeholder="Enter product description"
            onChange={handleOnChange}
            name="description"
            value={data.description}
          ></textarea>

          <button className="mb-10 btn btn-primary ">Upload Product</button>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
