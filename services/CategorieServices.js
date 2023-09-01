import requests from "./AxiosInterceptors";
import axios from "axios";
const CathegorieService = {
  getcategorie: async () => {
    return requests.get("/listcat");
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

  getEmplacement: async () => {
    return requests.get("/annonce/listemplacemen");
  },
  getUserAnnonces: async () => {
    return requests.get("/annonce/listAnnonceuser");
  },
  getOneAnnonce: async (id) => {
    return requests.get("/DetailAnnonce/" + id);
  },
  deleteAnnonce: async (id) => {
    return requests.delete("/annonce/delete/" + id);
  },
  getDeliveryAddresses: async () => {
    return requests.get("/annonce/listdeliveryuse");
  },
  createAnnonce: async (body) => {
    return requests.post("/annonce/createan", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateAnnonce: async (body, id) => {
    return requests.post(`/annonce/update/${id}`, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  createUserDelivery: async (body) => {
    return requests.post("/annonce/adddeliver", body);
  },
  updateUserDeliver: async (body, id) => {
    return requests.post("/delivery/update/" + id, body);
  },
  deleteDelivery: async (id) => {
    return requests.delete("/delivery/delete/" + id);
  },
};

export default CathegorieService;
