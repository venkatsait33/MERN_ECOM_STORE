import { useState } from "react";
import UploadProduct from "../components/UploadProduct";

const AllProducts = () => {
  const [showProductUpload, setShowProductUpload] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between w-full px-4 py-2 bg-primary">
        <h2 className="text-lg font-semibold">all products</h2>
        <button
          className="btn btn-sm btn-outline md:btn"
          onClick={() => setShowProductUpload(true)}
        >
          Upload Product
        </button>
      </div>
      {/*upload Product */}
      <div className="w-full">
        {showProductUpload && (
          <UploadProduct onClose={() => setShowProductUpload(false)} />
        )}
      </div>
    </div>
  );
};

export default AllProducts;
