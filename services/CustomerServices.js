import requests from "./AxiosInterceptors";
const CustomerServices = {
  loginCustomer: async (body) => {
    return requests.post("/login", body);
  },
  loginProvider: async (body) => {
    return requests.post("/provider/auth", body);
  },
  registerCustomer: async (body) => {
    return requests.post("/create_account", body);
  },
  askOtp: async (body) => {
    return requests.post("/ask_otp", body);
  },
  recoverPassword: async (body) => {
    return requests.post("/codeValidation", body);
  },
  customerOrder: async () => {
    return requests.get("/order");
  },
  businessAccount: async (body) => {
    return requests.post("/entreprise", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  changeProfileImage: async (body) => {
    return requests.post("/user/image", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateProfile: async (body) => {
    return requests.post("/updateProfil", body);
  },
};

export default CustomerServices;
