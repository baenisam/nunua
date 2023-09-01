import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UserContext } from "~/context/UserContext";
import { notifyError, notifySuccess } from "~/utils/toast";
import CustomerServices from "~/services/CustomerServices";
import GlobalContext from "~/context/GlobalContext";
import SettingServices from "~/services/SettingServices";
import CathegorieService from "~/services/CategorieServices";
const useAnnonceSubmit = (setShowModal) => {
  const router = useRouter();
  const { redirect, id } = router.query;
  const { dispatch, state } = useContext(UserContext);
  const {
    sousCategory,
    setSousCategory,
    category,
    setCategory,
    region,
    setRefresh,
    setRegion,
    province,
    provinceDel,
    regionDel,
    setRegionDel,
    setProvinceDel,
    images,
    setImages,
    selectedDelivery,
    setSelectedDelivery,
    isFeeDevlivery,
    setProvince,
  } = useContext(GlobalContext);
  const { registerInfo, userInfo } = state;
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(null);

  const saveAnnonce = (values) => {
    if (!sousCategory) {
      notifyError("Veuillez séléctionner une sous catégorie");
      return;
    }
    if (!region) {
      notifyError("Veuillez séléctionner une region");
      return;
    }
    if (images?.length < 1) {
      notifyError("Veuillez séléctionner au moins 1 image pour votre annonce");
      return;
    }
    if (selectedDelivery?.length === 0) {
      notifyError("Veuillez séléctionner au moins un lieu de livraison");
      return;
    }
    const data = new FormData();
    data.append("name", values.name);
    data.append("description", values.description);
    data.append("price", values.price);
    data.append("phone", values.phone);
    data.append("id_category", sousCategory?.id);
    data.append("emplacementid", region?.id);
    data.append("condition", "used");
    for (let i = 0; i < selectedDelivery.length; i++) {
        data.append("deleveryid[]", selectedDelivery[i].id);
    }
    for (let i = 0; i < images.length; i++) {
      if (images[i].originFileObj) {
        data.append("images[]", images[i].originFileObj);
      }
    }


    setLoading(true);
    CathegorieService.createAnnonce(data)
      .then((res) => {
        setProvince(null);
        setCategory(null);
        setSousCategory(null);
        setSelectedDelivery([]);
        setImages([]);
        setRegion(null);
        setLoading(false);
        setRefresh();
        notifySuccess(res.data.message);
        router.push('/user/my-adds')
        //resetForm()
      })
      .catch((err) => {
        console.log(err);
        notifyError(err ? err.response.data.message : err.message);
        setLoading(false);
      });
  };
  const updateAnnonce = (values) => {
    if (!sousCategory) {
      notifyError("Veuillez séléctionner une sous catégorie");
      return;
    }
    if (!region) {
      notifyError("Veuillez séléctionner une region");
      return;
    }
    if (images?.length < 1) {
      notifyError("Veuillez séléctionner au moins 1 image pour votre annonce");
      return;
    }
    if (selectedDelivery?.length === 0) {
      notifyError("Veuillez séléctionner au moins un lieu de livraison");
      return;
    }
    const data = new FormData();
    data.append("name", values.name);
    data.append("description", values.description);
    data.append("price", values.price);
    data.append("phone", values.phone);
    data.append("id_category", sousCategory?.id);
    data.append("emplacementid", region?.id);
    data.append("condition", "used");
    for (let i = 0; i < selectedDelivery.length; i++) {
        data.append("deleveryid[]", selectedDelivery[i].id);
    }
    for (let i = 0; i < images.length; i++) {
      if (images[i].originFileObj) {
        data.append("images[]", images[i].originFileObj);
      }
    }

  //   for (var pair of data.entries()) {
  //     console.log(pair[0]+ ', ' + pair[1]); 
  // }

    setLoading(true);
    CathegorieService.updateAnnonce(data, id)
      .then((res) => {
        setProvince(null);
        setCategory(null);
        setSousCategory(null);
        setSelectedDelivery([]);
        setImages([]);
        setRegion(null);
        setLoading(false);
        setRefresh();
        notifySuccess(res.data.message);
        router.push('/user/my-adds')
        //resetForm()
      })
      .catch((err) => {
        console.log(err);
        //notifyError(err ? err.response.data.message : err.message);
        setLoading(false);
      });
  };
  const saveDelivery = (values) => {
    if (!provinceDel) {
      notifyError("Veuillez séléctionner une province");
      return;
    }
    if (!regionDel) {
      notifyError("Veuillez séléctionner une region");
      return;
    }
    const data = {
      emplacementid: regionDel?.id,
      min: values.minDay,
      max: values.maxday,
      name: values.name,
      deliver: isFeeDevlivery === "OUI" ? 1 : 0,
      price_min: isFeeDevlivery === "OUI" ? values.minPrice : null,
      price_max: isFeeDevlivery === "OUI" ? values.maxPrice : null,
    };
    setLoading(true);
    if(isEdit){
      CathegorieService.updateUserDeliver(data, isEdit?.id)
      .then((res) => {
        setShowModal(false)
        setRefresh();
        setProvinceDel(null);
        setRegionDel(null);
        setLoading(false);
        notifySuccess(res.data.message);
      
        //resetForm()
      })
      .catch((err) => {
        console.log(err);
        notifyError(err ? err.response?.data?.message : err.message);
        setLoading(false);
      });
    } else {
      CathegorieService.createUserDelivery(data)
      .then((res) => {
        setShowModal(false)
        setRefresh();
        setProvinceDel(null);
        setRegionDel(null);
        setLoading(false);
        notifySuccess(res.data.message);
      
        //resetForm()
      })
      .catch((err) => {
        console.log(err);
        notifyError(err ? err.response.data.message : err.message);
        setLoading(false);
      });
    }
 
  };

  return {
    saveAnnonce,
    loading,
    saveDelivery,
    updateAnnonce,
    isEdit, setIsEdit
  };
};

export default useAnnonceSubmit;
