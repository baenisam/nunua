import requests from "./AxiosInterceptors";

const MarqueServices = {
  allMarque: async () => {
    return requests.get("/marque");
  },
  createMarque: async (body) => {
    return requests.post("/createmarque", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateMarque: async (body) => {
    return requests.post("/updatemarque", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default MarqueServices;
