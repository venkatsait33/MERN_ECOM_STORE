const backendDomainURL = import.meta.env.VITE_BACKEND_URL;

const Api = {
  signUp: {
    url: `${backendDomainURL}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomainURL}/api/signin`,
    method: "post",
  },
  logout: {
    url: `${backendDomainURL}/api/logout`,
    method: "get",
  },
  current_user: {
    url: `${backendDomainURL}/api/user-details`,
    method: "get",
  },
  all_users: {
    url: `${backendDomainURL}/api/all-users`,
    method: "get",
  },
  update_users: {
    url: `${backendDomainURL}/api/update-user`,
    method: "post",
  },
  upload_product: {
    url: `${backendDomainURL}/api/upload-product`,
    method: "post",
  },
  products: {
    url: `${backendDomainURL}/api/all-products`,
    method: "get",
  },
  update_product: {
    url: `${backendDomainURL}/api/update-product`,
    method: "post",
  },
  product_category: {
    url: `${backendDomainURL}/api/get-category`,
    method: "get",
  },
  category_wise_products: {
    url: `${backendDomainURL}/api/category-product`,
    method: "post",
  },
  product_details: {
    url: `${backendDomainURL}/api/product-details`,
    method: "post",
  },
  addToCartProduct: {
    url: `${backendDomainURL}/api/add-to-cart`,
    method: "post",
  },
  countOfCartProducts: {
    url: `${backendDomainURL}/api/countAddedToCartProduct`,
    method: "get",
  },
  viewCartProducts: {
    url: `${backendDomainURL}/api/view-cart-product`,
    method: "get",
  },
  updateCart: {
    url: `${backendDomainURL}/api/update-cart`,
    method: "post",
  },
  deleteCart: {
    url: `${backendDomainURL}/api/delete-cart`,
    method: "post",
  },
  searchProduct: {
    url: `${backendDomainURL}/api/search`,
    method: "get",
  },
  filterProducts: {
    url: `${backendDomainURL}/api/filter-products`,
    method: "post",
  },
  payment: {
    url: `${backendDomainURL}/api/checkout`,
    method: "post",
  },
  orderList: {
    url: `${backendDomainURL}/api/order-list`,
    method: "get",
  },
};

export default Api;
