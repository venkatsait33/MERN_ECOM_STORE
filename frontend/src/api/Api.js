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
};

export default Api;
