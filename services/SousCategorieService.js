import requests from "./AxiosInterceptors";

const SousCategoriesService = {
  getsouscategorie: async () => {
    return requests.get("/allsouscat");
  },
  //   postgategories: async () => {
  //     return requests.post("/createcat");
  //   },
};

export default SousCategoriesService;
