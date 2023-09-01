import requests from "./AxiosInterceptors";
import axios from "axios";
const OrderServices = {
  getcategorie: async () => {
    return requests.get("/listcat");
  },
  customerOrders: async () => {
    return requests.get("/order");
  },
  getFeatured: async () => {
    return requests.get("/featured");
  },
  postgategories: async (body) => {
    return requests.post("/createcat", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  createOrder: async (body) => {
    return requests.post("/order", body, {
      "Content-Type": "application/json",
      Accept: "application/json",
    });
  },
  updateCategory: async (body) => {
    return requests.post("/updatecatgory", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateSubCategory: async (body) => {
    return requests.post("/updatesouscatgory", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default OrderServices;
