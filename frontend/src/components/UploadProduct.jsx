import { useState } from "react";
import { IoClose } from "react-icons/io5";
import InputForm from "./InputForm";
import ProductCategory from "./ProductCategorys";
import { FaCloudUploadAlt } from "react-icons/fa";
import UploadImage from "../helpers/UploadImage";
import DisplayFullImage from "./DisplayFullImage";
import { CgClose } from "react-icons/cg";

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
  const [fullImage, setFullImage] = useState("");

  const [openFullScreenImage, setOpelFullScreenImage] = useState(false);

  const handleOnChange = () => {};

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    const uploadImage = await UploadImage(file);
    setData({
      ...data,
      productImage: [...data.productImage, uploadImage.url],
    });
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center w-full h-full bg-primary ">
      <div className=" p-4 bg-base-200 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex items-center justify-between pb-3">
          <h2 className="text-lg font-bold">Upload Product</h2>
          <div
            className="ml-auto text-2xl cursor-pointer w-fit hover:text-red-600"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>

        <form className="grid h-full gap-2 p-4 pb-5 overflow-y-scroll">
          <label htmlFor="productName">Product Name :</label>
          <input
            type="text"
            id="productName"
            placeholder="enter product name"
            name="productName"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2 border rounded bg-slate-100"
            required
          />

          <label htmlFor="brandName" className="mt-3">
            Brand Name :
          </label>
          <input
            type="text"
            id="brandName"
            placeholder="enter brand name"
            value={data.brandName}
            name="brandName"
            onChange={handleOnChange}
            className="p-2 border rounded bg-slate-100"
            required
          />

          <label htmlFor="category" className="mt-3">
            Category :
          </label>
          <select
            required
            value={data.category}
            name="category"
            onChange={handleOnChange}
            className="p-2 border rounded bg-slate-100"
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

          <label htmlFor="productImage" className="mt-3">
            Product Image :
          </label>
          <label htmlFor="uploadImageInput">
            <div className="flex items-center justify-center w-full h-32 p-2 border rounded cursor-pointer bg-slate-100">
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
                        className="border cursor-pointer bg-slate-100"
                        onClick={() => {
                          setOpelFullScreenImage(true);
                          setFullImage(el);
                        }}
                      />
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

          <label htmlFor="price" className="mt-3">
            Price :
          </label>
          <input
            type="number"
            id="price"
            placeholder="enter price"
            value={data.price}
            name="price"
            onChange={handleOnChange}
            className="p-2 border rounded bg-slate-100"
            required
          />

          <label htmlFor="sellingPrice" className="mt-3">
            Selling Price :
          </label>
          <input
            type="number"
            id="sellingPrice"
            placeholder="enter selling price"
            value={data.sellingPrice}
            name="sellingPrice"
            onChange={handleOnChange}
            className="p-2 border rounded bg-slate-100"
            required
          />

          <label htmlFor="description" className="mt-3">
            Description :
          </label>
          <textarea
            className="p-1 border resize-none h-28 bg-slate-100"
            placeholder="enter product description"
            rows={3}
            onChange={handleOnChange}
            name="description"
            value={data.description}
          ></textarea>

          <button className="px-3 py-2 mb-10 text-white bg-red-600 hover:bg-red-700">
            Upload Product
          </button>
        </form>
      </div>

      {/***display image full screen */}
      {openFullScreenImage && (
        <DisplayFullImage
          onClose={() => setOpelFullScreenImage(false)}
          imgUrl={fullImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;
