import requests from "./AxiosInterceptors";

const SettingServices = {
  globalSettings: async () => {
    return requests.get("/global/settings");
  },
  addToNewsLetter: async (body) => {
    return requests.post("/global/newsletter", body);
  },
  updateUserSettings: async (body) => {
    return requests.post("/updateusersetting", body);
  },
};

export default SettingServices;
