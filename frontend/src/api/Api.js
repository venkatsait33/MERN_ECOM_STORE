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
  current_user: {
    url: `${backendDomainURL}/api/user-details`,
    method: "get",
  },
  logout: {
    url: `${backendDomainURL}/api/logout`,
    method: "get",
  },
};

export default Api;
