import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UserContext } from "~/context/UserContext";
import { notifyError, notifySuccess } from "~/utils/toast";
import GlobalContext from "~/context/GlobalContext";
import CustomerServices from "~/services/CustomerServices";
import SettingServices from "~/services/SettingServices";
const useSettingSubmit = () => {
  const router = useRouter();
  const { redirect } = router.query;
  const { dispatch, state } = useContext(UserContext);
  const { country, province, images, setImages } = useContext(GlobalContext);
  const { registerInfo, userInfo } = state;
  const [loading, setLoading] = useState(false);

  const joinNewsLetter = (email) => {
    setLoading(true);
    SettingServices.addToNewsLetter({
      email: email,
    })
      .then((response) => {
        setLoading(false);
        notifySuccess(response.data.message);
      })
      .catch((err) => {
        notifyError(err ? err.response.data.message : err.message);
        setLoading(false);
      });
  };

  const updateUserSettings = (data) => {
    setLoading(true);
    SettingServices.updateUserSettings({
      name: data.name,
      phone: data.phone || null,
      about: data.description || null,
    })
      .then((response) => {
        dispatch({ type: "USER_PROFILE", payload: response.data.data });
        Cookies.set("userProfile", JSON.stringify(response.data.data), {
          expires: 365,
        });
        setLoading(false);
        notifySuccess(response.data.message);
      })
      .catch((err) => {
        notifyError(err ? err.response.data.message : err.message);
        setLoading(false);
      });
  };
  const updatePassword = (data) => {
    // setLoading(true);
    // SettingServices.updateUserSettings({
    //   name: data.name,
    //   phone: data.phone || null,
    //   about: data.description || null,
    // })
    //   .then((response) => {
    //     dispatch({ type: "USER_PROFILE", payload: response.data.data });
    //     Cookies.set("userProfile", JSON.stringify(response.data.data), {
    //       expires: 365,
    //     });
    //     setLoading(false);
    //     notifySuccess(response.data.message);
    //   })
    //   .catch((err) => {
    //     notifyError(err ? err.response.data.message : err.message);
    //     setLoading(false);
    //   });
  };
  const updateProfile = (data) => {
    setLoading(true);
    CustomerServices.updateProfile({
      full_name: data.name,
      email: data.email,
      phone: data.phone,
      pays: country?.id,
      ville: province?.id,
    })
      .then((response) => {
        dispatch({ type: "USER_PROFILE", payload: response.data.data });
        Cookies.set("userProfile", JSON.stringify(response.data.data), {
          expires: 365,
        });
        setLoading(false);
        notifySuccess(response.data.message);
      })
      .catch((err) => {
        notifyError(err ? err.response.data.message : err.message);
        setLoading(false);
      });
  };

  const updateImage = (image) => {
    setLoading(true);
    const data = new FormData();
    data.append("image", image);
    CustomerServices.changeProfileImage(data)
      .then((response) => {
        dispatch({ type: "USER_PROFILE", payload: response.data.data });
        Cookies.set("userProfile", JSON.stringify(response.data.data), {
          expires: 365,
        });
        setLoading(false);
        notifySuccess(response.data.message);
      })
      .catch((err) => {
        notifyError(err ? err.response.data.message : err.message);
        setLoading(false);
      });
  };

  return {
    joinNewsLetter,
    loading,
    updateUserSettings,
    updateProfile,
    updatePassword,
    updateImage
  };
};

export default useSettingSubmit;
