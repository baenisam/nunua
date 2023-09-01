import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UserContext } from "~/context/UserContext";
import { notifyError, notifySuccess } from "~/utils/toast";
import CustomerServices from "~/services/CustomerServices";
import Swal from "sweetalert2";
import GlobalContext from "~/context/GlobalContext";
const useLoginSubmit = ({ setModalOpen, inputs }) => {
  const router = useRouter();
  const { redirect } = router.query;
  const { dispatch, state } = useContext(UserContext);
  const { registerInfo, userInfo } = state;
  const { redirection, otpCode,field, setOtpCode,setDisplayEmail, open, setOpen, modal, setModal } =
    useContext(GlobalContext);
  const [activeTab, setactiveTab] = useState(userInfo?.token ? 2 : 1);
  const [activeTabwiz, setoggleTabwiz] = useState(userInfo?.token ? 2 : 1);
  const [passedSteps, setPassedSteps] = useState([1]);
  const [passedStepswiz, setpassedStepswiz] = useState([1]);
  const [loading, setLoading] = useState(false);
  const [loadingResend, setLoadingResend] = useState(false);
  const [rccm, setRccm] = useState(null);
  const [impot, setImpot] = useState(null);
  const [logo, setLogo] = useState(null);
  
 

  function toggleTabwiz(tab) {
    if (activeTabwiz !== tab) {
      var modifiedSteps = [...passedStepswiz, tab];
      if (tab >= 1 && tab <= 4) {
        setoggleTabwiz(tab);
        setpassedStepswiz(modifiedSteps);
      }
    }
  }

  const cookieTimeOut = 365;
  const submitHandler = ({
    country,
    email,
    registerEmail,
    verifyEmail,
    password,
    code,
  }) => {
    setLoading(true);

    if (email && password) {
      CustomerServices.loginCustomer({
        email: email,
        pswd: password,
      })
        .then((res) => {
          if (res.status === 200) {
            dispatch({ type: "USER_LOGIN", payload: res.data });
            dispatch({ type: "USER_PROFILE", payload: res.data.data });
            Cookies.set("nunua_sessions", JSON.stringify(res.data), {
              expires: cookieTimeOut,
            });
            Cookies.set("userProfile", JSON.stringify(res.data.data), {
              expires: cookieTimeOut,
            });
            notifySuccess(res.data.message);
            setOpen(false);
            router.push(redirection || "/user/dashboard");
            setLoading(false);
          } else if (res.status === 201) {
            setLoading(false);
            notifyError(res.data.message);
          } else {
            setLoading(false);
            notifyError(res.data.message);
          }
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setLoading(false);
        });
    }
    // if (country && email && password) {
    //   axios({
    //     method: "post",
    //     url: process.env.NEXT_PUBLIC_API_BASE_URL + "/user/signup",
    //     data: {
    //       country: country,
    //       email: email,
    //       password: password,
    //     },
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //       "Accept-Language":lang
    //     },
    //   })
    //     .then((res) => {
    //       setLoading(false);
    //       dispatch({ type: "REGISTER_INFO", payload: res.data });
    //       Cookies.set("registerInfo", JSON.stringify(res.data), {
    //         expires: cookieTimeOut,
    //       });
    //       router.push("/user/validate");

    //       setModalOpen(false);
    //       notifySuccess(res.data.message);
    //     })
    //     .catch((err) => {
    //       notifyError(err ? err.response.data.message : err.message);
    //       setLoading(false);
    //     });

    //   // CustomerServices.signUpUser({
    //   //   country: country,
    //   //   email: email,
    //   //   password: password,
    //   // })
    //   //   .then((res) => {
    //   //     if (res.status) {
    //   //       dispatch({ type: "REGISTER_INFO", payload: res });
    //   //       Cookies.set("registerInfo", JSON.stringify(res), {
    //   //         expires: cookieTimeOut,
    //   //       });
    //   //       router.push("/user/validate");

    //   //       setModalOpen(false);
    //   //       notifySuccess(res.message);
    //   //     } else {
    //   //       notifyError(res.data.message);
    //   //     }
    //   //     setLoading(false);
    //   //   })
    //   //   .catch((err) => {
    //   //     setLoading(false);
    //   //     // notifyError(err ? err.response.data.message : err.message);
    //   //     console.log(err);
    //   //   });
    // }
    // if (code) {
    //   CustomerServices.verifyEmailAddress(registerInfo.data.email, code)
    //     .then((res) => {
    //       Cookies.remove("registerInfo");
    //       dispatch({ type: "USER_LOGIN", payload: res.data });
    //       Cookies.set("userInfo", JSON.stringify(res.data), {
    //         expires: cookieTimeOut,
    //       });
    //       router.push(redirect || "/");
    //       setLoading(false);
    //       setModalOpen(false);
    //       notifySuccess(res.data.message);
    //     })
    //     .catch((err) => {
    //       setLoading(false);
    //       // notifyError(err ? err.response.data.message : err.message);
    //       console.log(err);
    //     });
    // }
    // if (verifyEmail) {
    //   CustomerServices.forgetPassword({ verifyEmail })
    //     .then((res) => {
    //       setLoading(false);
    //       notifySuccess(res.message);
    //       setValue("verifyEmail");
    //     })
    //     .catch((err) => {
    //       setLoading(false);
    //       notifyError(err ? err.response.data.message : err.message);
    //     });
    // }
  };
  const handleProviderAuth = (email, fullname, image) => {
    CustomerServices.loginProvider({
      email: email,
      fullname: fullname,
      image: image,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch({ type: "USER_LOGIN", payload: res.data });
          dispatch({ type: "USER_PROFILE", payload: res.data.data });
          Cookies.set("nunua_sessions", JSON.stringify(res.data), {
            expires: cookieTimeOut,
          });
          Cookies.set("userProfile", JSON.stringify(res.data.data), {
            expires: cookieTimeOut,
          });
          notifySuccess(res.data.message);
          setOpen(false);
          router.push(redirection || "/user/dashboard");
          setLoading(false);
        } else if (res.status === 201) {
          setLoading(false);
          notifyError(res.data.message);
        } else {
          setLoading(false);
          notifyError(res.data.message);
        }
      })
      .catch((err) => {
        //console.log(err)
        notifyError(err ? err.response.data.message : err.message);
        setLoading(false);
      });
  };
  const onSubmitRegister = (data, email) => {
    setLoading(true);
    if (data.code) {
      console.log(field)
      if(otpCode != data.code){
        setLoading(false);
        notifyError("Code de validation incorrect " + otpCode + " " + data.code)
        return 
      }
      
      CustomerServices.registerCustomer({
        pays: field.country,
        email: field.email,
        pswd: field.password,
        full_name: field.full_name,
        otp: data.code,
      })
        .then((response) => {
          dispatch({ type: "USER_LOGIN", payload: response.data });
          dispatch({ type: "USER_PROFILE", payload: response.data.data });
          Cookies.set("nunua_sessions", JSON.stringify(response.data), {
            expires: cookieTimeOut,
          });
          Cookies.set("userProfile", JSON.stringify(response.data.data), {
            expires: cookieTimeOut,
          });
          notifySuccess(response.data.message);
          setModal(false);
          setLoading(false);
          router.push(redirection || "/user/dashboard");
          // if (activeTabwiz < 2) {
          //   toggleTabwiz(activeTabwiz + 1);
          // }
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setLoading(false);
        });
    } else {
      
      CustomerServices.registerCustomer({
        pays: data.country,
        email: data.email,
        pswd: data.password,
        full_name: data.full_name,
      })
        .then((response) => {
          setDisplayEmail(data.email)
          notifySuccess(response.data.message);
          setOtpCode(response.data.code_validation);
          setOpen(false);
          setModal(!modal);
          setLoading(false);
        })
        .catch((err) => {
          notifyError(err ? err.response.data.message : err.message);
          setLoading(false);
        });
    }
  };
  const resendEmail = (email) => {
    setLoadingResend(true);
    CustomerServices.askOtp({ email: email })
      .then((response) => {
        notifySuccess(response.data.message);
        setOtpCode(response.data.code_validation);
        setLoadingResend(false);
      })
      .catch((err) => {
        notifyError(err ? err.response.data.message : err.message);
        setLoadingResend(false);
      });
  };
  const register = (data) => {
    CustomerServices.registerCustomer({
      pays: field.country,
      email: field.email,
      pswd: field.password,
      full_name: field.full_name,
      otp: otpCode,
    })
      .then((response) => {
        notifySuccess(response.data.message);
        if (activeTabwiz < 2) {
          toggleTabwiz(activeTabwiz + 1);
        }
      })
      .catch((err) => {
        notifyError(err ? err.response.data.message : err.message);
      });
  };
  const handleLogOut = () => {
    Swal.fire({
      title: "Déconnexion",
      text: "Voulez-vous vraient vous déconnecter de cet appareil ?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Non",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui",
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch({ type: "USER_LOGOUT" });
        Cookies.remove("nunua_sessions");
        Cookies.remove("userProfile");
        Cookies.remove("couponInfo");
        router.push("/");
      }
    });
  };

  const onSumbitEntreprise = (data) => {
    if (!rccm) {
      notifyError("Veuillez télécharger le document RCCM ou PATENTE");
      return;
    }
    if (!impot) {
      notifyError("Veuillez télécharger le document N° IMPOT");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("idnat", data.idnat);
    formData.append("rccm", data.rccm);
    formData.append("num_impot", data.impot);
    formData.append("pays", data.country);
    formData.append("ville", data.ville);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("impot_doc", impot);
    formData.append("rccm_doc", rccm);
    if (logo) {
      formData.append("logo", logo);
    }
    CustomerServices.businessAccount(formData)
      .then((response) => {
        notifySuccess(response.data.message);
        setLoading(false);
        toggleTabwiz(activeTabwiz + 1);
      })
      .catch((err) => {
        setLoading(false);
        notifyError(err ? err.response.data.message : err.message);
      });
  };

  return {
    submitHandler,
    loading,
    handleLogOut,
    resendEmail,
    loadingResend,
    register,
    onSubmitRegister,
    handleProviderAuth,
    toggleTabwiz,
    activeTabwiz,
    onSumbitEntreprise,
    setoggleTabwiz,
    passedStepswiz,
    logo,
    setLogo,
    setpassedStepswiz,
    passedSteps,
    setPassedSteps,
    rccm,
    setRccm,
    impot,
    setImpot,
    activeTab,
    setactiveTab,
    router,
  };
};

export default useLoginSubmit;
