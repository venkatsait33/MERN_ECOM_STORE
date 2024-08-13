const backendDomainURL = "http://localhost:8080";

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
};

export default Api;
