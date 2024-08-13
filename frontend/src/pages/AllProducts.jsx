import { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import Api from "../api/Api";
import AdminProductCard from "../components/product/AdminProductCard";

const AllProducts = () => {
  const [showProductUpload, setShowProductUpload] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); //

  const fetchProducts = async () => {
    const responseData = await fetch(Api.products.url, {
      method: Api.products.method,
      credentials: "include",
    });
    const data = await responseData.json();
    setAllProducts(data?.data || []);
  };

  // Handle product edit
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
  };

  // Handle closing the edit view
  const handleCloseEdit = () => {
    setSelectedProduct(null);
    fetchProducts(); // Optionally, refresh the product list after editing
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <div className="flex items-center justify-between px-4 py-2 bg-primary">
        <h2 className="text-lg font-semibold">all products</h2>
        <button
          className="btn btn-sm btn-outline md:btn"
          onClick={() => setShowProductUpload(true)}
        >
          Upload Product
        </button>
      </div>

      {/*Product List */}
      <div className="flex items-center py-4 overflow-y-scroll">
        {selectedProduct ? (
          <div
            key={selectedProduct._id}
            className="w-full gap-2 p-2 shadow-xl card card-compact bg-base-100"
          >
            <AdminProductCard
              data={selectedProduct}
              onEdit={handleEditProduct}
              onClose={handleCloseEdit}
              fetchData={fetchProducts}
            />
          </div>
        ) : (
          allProducts?.map((product) => (
            <div
              key={product._id}
              className="w-full gap-2 p-2 shadow-xl card card-compact bg-base-100"
            >
              <AdminProductCard
                data={product}
                onEdit={handleEditProduct}
                fetchData={fetchProducts}
              />
            </div>
          ))
        )}
      </div>
      {/*upload Product */}
      <div>
        {showProductUpload && (
          <UploadProduct onClose={() => setShowProductUpload(false)} />
        )}
      </div>
    </div>
  );
};

export default AllProducts;
