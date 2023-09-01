import React from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { notifyError, notifySuccess } from "~/utils/toast";
import useAsync from "~/Hooks/useAsync";
import SettingServices from "~/services/SettingServices";
import CathegorieService from "~/services/CategorieServices";
const GlobalContext = React.createContext();

export const ContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [category, setCategory] = React.useState(null);
  const [brand, setBrand] = React.useState(null);
  const [unit, setUnit] = React.useState(null);
  const [checksuite, setSwuite] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState(null);
  const [refresh, setRefresh] = React.useReducer((x) => x + 1, 0);
  const [isUpdate, setIsUpdate] = React.useState(false);
  const [isCombination, setIsCombination] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [logo, setLogo] = React.useState([]);
  const [banner, setBanner] = React.useState([]);
  const [redirection, setRedirection] = React.useState(null);
  const [field, setField] = React.useState(null);
  const [paymentMethod, setPaymentMethod] = React.useState(null);
  const [otpCode, setOtpCode] = React.useState(null);
  const [modal, setModal] = React.useState(false);
  const [sousCategory, setSousCategory] = React.useState(null);
  const [province, setProvince] = React.useState(null);
  const [region, setRegion] = React.useState(null);
  const [provinceDel, setProvinceDel] = React.useState(null);
  const [regionDel, setRegionDel] = React.useState(null);
  const [country, setCountry] = React.useState(null);
  const [isConnected, setIsConnected] = React.useState(true);
  const [isFeeDevlivery, setIsFeeDelivery] = React.useState("");
  const [selectedDelivery, setSelectedDelivery] = React.useState([]);
  const [displayEmail, setDisplayEmail] = React.useState("");
  const router = useRouter();

  const toggleCombination = () => setIsCombination(!isCombination);
  const { data: globalSettings, loading } = useAsync(
    SettingServices.globalSettings
  );

  const handleUpdate = (data) => {
    setIsUpdate(true);
    setSelectedId(data);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setImages([]);
    setIsUpdate(false);
    setSelectedId(null);
    setModalIsOpen(false);
  };

  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  const handleDelete = (data) => {
    setSelectedId(data);
    Swal.fire({
      title: "Suppression",
      text: "Voulez-vous vraient supprimer cet élément ?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Non",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        try {
          if (router.pathname === "/user/my-adds") {
            const res = await CathegorieService.deleteAnnonce(data);
            if (res.status === 200) {
              setRefresh();
              notifySuccess(res.data.message);
              setIsLoading(false);
            } else {
              notifySuccess(res.data.message);
              setIsLoading(false);
            }
          }
          if (router.pathname === "/settings/my-deliveries") {
            const res = await CathegorieService.deleteDelivery(data);
            if (res.status === 200) {
              setRefresh();
              notifySuccess(res.data.message);
              setIsLoading(false);
            } else {
              notifySuccess(res.data.message);
              setIsLoading(false);
            }
          }
        } catch (err) {
          setIsLoading(false);
          console.log(err);
        }

        //Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        handleUpdate,
        closeModal,
        setIsLoading,
        toggleModal,
        setModalIsOpen,
        modalIsOpen,
        setIsUpdate,
        isUpdate,
        images,
        refresh,
        toggleCombination,
        isCombination,
        logo,
        setLogo,
        banner,
        category,
        setCategory,
        userInfo,
        setShow,
        redirection,
        handleDelete,
        setRedirection,
        paymentMethod,
        province,
        setProvince,
        field,
        setField,
        region,
        setRegion,
        selectedDelivery,
        setSelectedDelivery,
        setPaymentMethod,
        sousCategory,
        setSousCategory,
        show,
        setUserInfo,
        otpCode,
        setOtpCode,
        country,
        isConnected, setIsConnected,
        setCountry,
        brand,
        open,
        setOpen,
        setBrand,
        isFeeDevlivery,
        setIsFeeDelivery,
        checksuite,
        setSwuite,
        unit,
        regionDel,
        modal,
        setModal,
        setRegionDel,
        displayEmail,
        setDisplayEmail,
        provinceDel,
        setProvinceDel,
        setUnit,
        setBanner,
        globalSettings,
        setRefresh,
        setImages,
        selectedId,
        setSelectedId,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
