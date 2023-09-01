import requests from "./AxiosInterceptors";

const CountryServices = {
  getCountries: async () => {
    return requests.get("/listCountry");
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

export default CountryServices;
