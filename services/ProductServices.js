import requests from "./AxiosInterceptors";
import axios from "axios";
const ProductServices = {
  getProducts: async () => {
    return requests.get("/listproduit");
  },
  getAnnonces:async () => {
    return requests.get("/annonce/listAnnonc");
  },
  getTopSellers: async () => {
    return requests.get("/ListTop");
  },
  oneProduct: async (id) => {
    return requests.get("/DetailProduct/"+id);
  },
  oneDetail: async (id) => {
    return requests.get("/DetailAnnonce/"+id);
  },
  postgategories: async (body) => {
    return requests.post("/createcat", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  byCategory(category, query){
    return requests.get(`/produits/by${category ? `?category=${category}`: query ? `?query=${query}`:''}`)
  },
  addSubCategory: async (body) => {
    return requests.post("/createsouscat", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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

export default ProductServices;
