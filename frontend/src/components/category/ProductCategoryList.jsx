import { useParams } from "react-router-dom";

const ProductCategoryList = () => {
  const params = useParams();
  return (
    <div>
      <h2>{params.categoryName}</h2>
    </div>
  );
};

export default ProductCategoryList;
