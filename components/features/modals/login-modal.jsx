import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "~/context/UserContext";
import Modal from "react-modal";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { useSelector } from "react-redux";
import useLoginSubmit from "~/Hooks/useLoginSubmit";
import { HiOutlineMail } from "react-icons/hi";
import { AiFillLock } from "react-icons/ai";
import Link from "next/link";
import TextInput from "~/components/TextInput";
import FacebookLogin from "@greatsumini/react-facebook-login";
import TextField from "@mui/material/TextField";
import GlobalContext from "~/context/GlobalContext";
import { BiUser } from "react-icons/bi";
import ValidateModal from "./validate-modal";
import { notifySuccess } from "~/utils/toast";
import { Spinner, Input, FormFeedback, Label } from "reactstrap";
import CountryServices from "~/services/CountryServices";
import * as Yup from "yup";
import { useFormik } from "formik";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { Dropdown, Text, Grid, User } from "@nextui-org/react";
import { Avatar } from "antd";
import ReactFlagsSelect from "react-flags-select";
import ALink from "~/components/features/alink";
import jwt_decode from "jwt-decode";
import useAsync from "~/Hooks/useAsync";
const customStyles = {
  overlay: {
    backgroundColor: "rgba(77,77,77,0.6)",
    zIndex: "9000",
  },
};

Modal.setAppElement("body");

function LoginModal({ open, setOpen }) {
  const [displayEmail, setDisplayEmail] = useState("");
  const [data, setData] = useState(null);
  const {
    submitHandler,
    handleLogOut,
    handleProviderAuth,
    onSubmitRegister,
    loading,
    register,
    resendEmail,
    modal,
    setModal,
    loadingResend,
  } = useLoginSubmit({ inputs: data, setModalOpen: setOpen });
  const { data: countries, loading: loadingCountries } = useAsync(
    CountryServices.getCountries
  );
  const {
    dispatch,
    state: { userProfile, userInfo },
  } = useContext(UserContext);

  const {setField} = useContext(GlobalContext)

  const [country, setCountry] = useState("");

  let timer;
  const handleSelect = (country) => {
    console.log(country);
  };
  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer);
    };
  });

  function closeModal() {
    document
      .getElementById("login-modal")
      .classList.remove("ReactModal__Content--after-open");

    if (document.querySelector(".ReactModal__Overlay")) {
      document.querySelector(".ReactModal__Overlay").style.opacity = "0";
    }

    timer = setTimeout(() => {
      setOpen(false);
    }, 350);
  }

  function openModal(e) {
    e.preventDefault();
    setOpen(true);
  }
  const googleResponse = (response) => {
    var decoded = jwt_decode(response.credential);
    console.log(decoded);
  };
  const faceBookResponse = (response) => {
    //var decoded = jwt_decode(response.credential);
    console.log(response);
  };

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      Promise.all([
        fetch(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${codeResponse.access_token}`
        ).then((value) => value.json()),
        fetch("https://ipapi.co/json/").then((value) => value.json()),
      ])
        .then((data) => {
          setOpen(false);
          const userData = { ...data[0], ...data[1] };
          handleProviderAuth(userData.email, userData.name, userData.picture);
          
        })
        .catch((error) => {
          console.log(error);
        });
    },
    useOneTap:true
  });
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Ce champs est requis")
        .email("Adresse email incorrecte"),
      password: Yup.string().required("Ce champs est requis"),
    }),
    onSubmit: (values) => {
      submitHandler(values);
      // notifyError("Erreur de samuel");
      // console.log("values", values);
    },
  });
  const validation1 = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      full_name: "",
      email: "",
      country: countries.find((item) => item.code === "CD")?.id,
      password: "",
      checked: false,
    },

    validationSchema: Yup.object({
      full_name: Yup.string().required("Ce champs est requis"),
      email: Yup.string()
        .email("Veuillez entrer un email valide")
        .required("Ce champs est requis"),
      password: Yup.string().required("Ce champs est requis"),
    }),
    onSubmit: (values) => {
      onSubmitRegister(values);
      setField(values);
      setDisplayEmail(values.email);
    },
  });

  // const { error } = useSelector((state) => ({
  //   error: state.login.error,
  // }));

  return (
    <>
      <div className="login vendre">
        {userInfo?.token ? (
         <ALink href="/user/dashboard" >
              <Avatar
                size="sm"
                style={{
                  marginRight:20
                }}
                src={userProfile?.provider ? userProfile?.profil : process.env.NEXT_PUBLIC_ASSET_URL + "users/"+userProfile?.profil}
              />
         </ALink>
        ) : (
          <a href="#" style={{
            marginRight:20,
            justifyContent:'center',
            alignItems:'center',
            padding:10,
            borderWidth:5,
            borderRadius:100,
            borderColor:'#000'
          }} onClick={openModal}>
            <BiUser size={20} color="gray"/>
          </a>
        )}
        {open ? (
          <Modal
            isOpen={open}
            style={customStyles}
            contentLabel="login Modal"
            className="modal-dialog"
            overlayClassName="d-flex align-items-center justify-content-center"
            id="login-modal"
            onRequestClose={closeModal}
            closeTimeoutMS={10}
          >
            <div className="modal-content" style={{ borderRadius: 20 }}>
              <div className="modal-body">
                <button type="button" className="close" onClick={closeModal}>
                  <span aria-hidden="true">
                    <i className="icon-close"></i>
                  </span>
                </button>
                <div className="form-box">
                  <div className="form-tab">
                    <Tabs selectedTabClassName="show" defaultIndex={0}>
                      <TabList className="nav nav-pills nav-fill">
                        <Tab className="nav-item">
                          <span className="nav-link">Connexion</span>
                        </Tab>

                        <Tab className="nav-item">
                          <span className="nav-link">Inscription</span>
                        </Tab>
                      </TabList>

                      <div className="tab-content">
                        <TabPanel style={{ paddingTop: "2rem" }}>
                          <div>
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                validation.handleSubmit();
                                return false;
                              }}
                            >
                              <div className="text-center mb-3">
                                <img
                                  width={60}
                                  className="mx-auto d-block"
                                  src="/images/facebook dev.png"
                                />
                                <p className="text-black">
                                  Veuillez entrer vos identifiants pour
                                  continuer
                                </p>
                              </div>
                              {/* <div className="form-group">
                                <TextInput/>
                              </div> */}
                              {/* {userInfo && JSON.stringify(userInfo)} */}
                              {/* <div className="form-group mb-2">
                                <Input
                                  error={
                                    validation.touched.email &&
                                    validation.errors.email
                                  }
                          
                                  label="Email"
                                  size="normal"
                                  type="email"
                                  style={{ borderRadius: 30 }}
                                  name="email"
                                  className="form-control"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.email || ""}
                                  defaultValue=""
                                  // helperText={
                                  //   validation.touched.email &&
                                  //   validation.errors.email
                                  // }
                                />
                              </div>
                              <div className="form-group mb-2">
                                <Input
                                  error={
                                    validation.touched.password &&
                                    validation.errors.password
                                  }
                          
                                  label="Mot de passe"
                                  size="normal"
                                  type="password"
                                  style={{ borderRadius: 30 }}
                                  name="password"
                                  className="form-control"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.password || ""}
                                  defaultValue=""
                                  // helperText={
                                  //   validation.touched.password &&
                                  //   validation.errors.password
                                  // }
                                />
                              </div> */}
                              <div className="form-group">
                                <TextInput
                                  style={{ borderRadius: 1 }}
                                  name="email"
                                  placeholder="Email"
                                  type="email"
                                  className="form-control"
                                  icon={
                                    <HiOutlineMail
                                      size={20}
                                      style={{ marginRight: 0 }}
                                    />
                                  }
                                  id="validationCustom02"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.email || ""}
                                  invalid={
                                    validation.touched.email &&
                                    validation.errors.email
                                      ? true
                                      : false
                                  }
                                  error={
                                    validation.touched.email &&
                                    validation.errors.email
                                  }
                                />

                                {validation.touched.email &&
                                validation.errors.email ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.email}
                                  </FormFeedback>
                                ) : null}
                              </div>
                              <div className="form-group">
                                <TextInput
                                  style={{ borderRadius: 2 }}
                                  name="password"
                                  placeholder="Mot de passe"
                                  type="password"
                                  icon={
                                    <AiFillLock
                                      size={20}
                                      style={{ marginRight: 0 }}
                                    />
                                  }
                                  className="form-control"
                                  id="validationCustom02"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.password || ""}
                                  invalid={
                                    validation.touched.password &&
                                    validation.errors.password
                                      ? true
                                      : false
                                  }
                                  error={
                                    validation.touched.password &&
                                    validation.errors.password
                                  }
                                />

                                {validation.touched.password &&
                                validation.errors.password ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.password}
                                  </FormFeedback>
                                ) : null}
                              </div>

                              {/* <div className="form-group">
                                <Input
                                  style={{ borderRadius: 10 }}
                                  name="password"
                                  placeholder="Mot de passe"
                                  type="password"
                                  className="form-control"
                                  id="validationCustom02"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.password || ""}
                                  invalid={
                                    validation.touched.password &&
                                    validation.errors.password
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.password &&
                                validation.errors.password ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.password}
                                  </FormFeedback>
                                ) : null}
                              </div> */}
                              <div
                                style={{
                                  alignItems: "end",
                                  justifyContent: "flex-end",
                                }}
                                className="form-group justify-content-end align-items-right text-right"
                              >
                                {/* <ALink href="#" className="forgot-link">
                                  Mot de passe oublié ?
                                </ALink> */}
                              </div>
                              <div className="form-group">
                                {loading ? (
                                  <button
                                    disabled
                                    type="button"
                                    className="btn btn-primary btn-round w-100"
                                  >
                                    <Spinner
                                      aria-label="hidden"
                                      type="grow"
                                      size="md"
                                    >
                                      {""}
                                    </Spinner>
                                    {"   "}
                                    <span>Connexion...</span>
                                  </button>
                                ) : (
                                  <button
                                    disabled={loading}
                                    type="submit"
                                    className="btn btn-primary btn-round w-100"
                                  >
                                    <span>Se connecter</span>
                                    <i className="icon-long-arrow-right"></i>
                                  </button>
                                )}
                              </div>
                            </form>
                          </div>
                        </TabPanel>

                        <TabPanel>
                          <div>
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                validation1.handleSubmit();
                                return false;
                              }}
                            >
                              <div className="text-center mb-3">
                                <img
                                  width={60}
                                  className="mx-auto d-block"
                                  src="/images/facebook dev.png"
                                />
                                <p className="text-black">
                                  Veuillez fournir ces informations pour
                                  continuer
                                </p>
                              </div>
                              <div className="form-group">
                                <Input
                                  disabled={loadingCountries}
                                  style={{ borderRadius: 3 }}
                                  className="form-control"
                                  type="select"
                                  name="country"
                                  readOnly
                                  id="exampleSelect"
                                  onChange={validation1.handleChange}
                                  onBlur={validation1.handleBlur}
                                  value={validation1.values.country}
                                  invalid={
                                    validation1.touched.country &&
                                    validation1.errors.country
                                      ? true
                                      : false
                                  }
                                >
                                  {countries
                                    ?.filter((item) => item.code === "CD")
                                    .map(({ name, id }) => (
                                      <option value={id} defaultValue>
                                        {name}
                                      </option>
                                    ))}
                                </Input>
                                {validation1.touched.country &&
                                validation1.errors.country ? (
                                  <small className="text-danger">
                                    {validation1.errors.country}
                                  </small>
                                ) : null}
                              </div>
                              <div className="form-group">
                                <TextInput
                                  style={{ borderRadius: 2 }}
                                  name="full_name"
                                  placeholder="Nom complet"
                                  type="text"
                                  icon={
                                    <BiUser
                                      size={20}
                                      style={{ marginRight: 0 }}
                                    />
                                  }
                                  className="form-control"
                                  id="validationCustom02"
                                  onChange={validation1.handleChange}
                                  onBlur={validation1.handleBlur}
                                  value={validation1.values.full_name || ""}
                                  invalid={
                                    validation1.touched.full_name &&
                                    validation1.errors.full_name
                                      ? true
                                      : false
                                  }
                                  error={
                                    validation1.touched.full_name &&
                                    validation1.errors.full_name
                                  }
                                />

                                {validation1.touched.full_name &&
                                validation1.errors.full_name ? (
                                  <FormFeedback type="invalid">
                                    {validation1.errors.full_name}
                                  </FormFeedback>
                                ) : null}
                              </div>
                              <div className="form-group">
                                <TextInput
                                  style={{ borderRadius: 1 }}
                                  name="email"
                                  placeholder="Email"
                                  type="email"
                                  className="form-control"
                                  icon={
                                    <HiOutlineMail
                                      size={20}
                                      style={{ marginRight: 0 }}
                                    />
                                  }
                                  id="validationCustom02"
                                  onChange={validation1.handleChange}
                                  onBlur={validation1.handleBlur}
                                  value={validation1.values.email || ""}
                                  invalid={
                                    validation1.touched.email &&
                                    validation1.errors.email
                                      ? true
                                      : false
                                  }
                                  error={
                                    validation1.touched.email &&
                                    validation1.errors.email
                                  }
                                />

                                {validation1.touched.email &&
                                validation1.errors.email ? (
                                  <FormFeedback type="invalid">
                                    {validation1.errors.email}
                                  </FormFeedback>
                                ) : null}
                              </div>
                              <div className="form-group">
                                <TextInput
                                  style={{ borderRadius: 2 }}
                                  name="password"
                                  placeholder="Mot de passe"
                                  type="password"
                                  icon={
                                    <AiFillLock
                                      size={20}
                                      style={{ marginRight: 0 }}
                                    />
                                  }
                                  className="form-control"
                                  id="validationCustom02"
                                  onChange={validation1.handleChange}
                                  onBlur={validation1.handleBlur}
                                  value={validation1.values.password || ""}
                                  invalid={
                                    validation1.touched.password &&
                                    validation1.errors.password
                                      ? true
                                      : false
                                  }
                                  error={
                                    validation1.touched.password &&
                                    validation1.errors.password
                                  }
                                />

                                {validation1.touched.password &&
                                validation1.errors.password ? (
                                  <FormFeedback type="invalid">
                                    {validation1.errors.password}
                                  </FormFeedback>
                                ) : null}
                              </div>

                              {/* <div className="form-group">
                                <Input
                                  style={{ borderRadius: 10 }}
                                  name="password"
                                  placeholder="Mot de passe"
                                  type="password"
                                  className="form-control"
                                  id="validationCustom02"
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.password || ""}
                                  invalid={
                                    validation.touched.password &&
                                    validation.errors.password
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.password &&
                                validation.errors.password ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.password}
                                  </FormFeedback>
                                ) : null}
                              </div> */}

                              <div className="form-group">
                                {loading ? (
                                  <button
                                    disabled
                                    type="button"
                                    className="btn btn-primary btn-round w-100"
                                  >
                                    <Spinner
                                      aria-label="hidden"
                                      type="grow"
                                      size="md"
                                    >
                                      {""}
                                    </Spinner>
                                    {"   "}
                                    <span>Patientez...</span>
                                  </button>
                                ) : (
                                  <button
                                    disabled={loading}
                                    type="submit"
                                    className="btn btn-primary btn-round w-100"
                                  >
                                    <span>Créer un compte</span>
                                    <i className="icon-long-arrow-right"></i>
                                  </button>
                                )}
                              </div>
                            </form>
                          </div>
                        </TabPanel>
                      </div>
                      <div className="">
                        <p className="text-center">Ou continuez avec</p>
                        <div className="d-flex mt-2 justify-content-between">
                          <button
                            onClick={login}
                            class="btn-provider"
                            style={{ marginRight: -50 }}
                          >
                            <img src="/images/google.png"/>
                            <span>Google</span>
                          </button>
                          {/* <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
  useOneTap
     cookiePolicy={"single_host_origin"}
/> */}
                          {/* <ALink href="#" className="btn btn-login  btn-f">
                            <i className="icon-facebook-f"></i>
                            Login With Facebook
                          </ALink> */}
                          <FacebookLogin
                            style={{ display: "none" }}
                            autoLoad={false}
                            appId="935105434385360"
                            onSuccess={(response) => {
                              console.log("Login Success!", response);
                            }}
                            onFail={(error) => {
                              console.log("Login Failed!", error);
                            }}
                            onProfileSuccess={(response) => {
                              console.log("Get Profile Success!", response);
                            }}
                            fields="first_name, last_name, profile_pic, gender, timezone"
                            render={({ onClick, logout }) => (
                              <button onClick={onClick} class="btn-provider">
                                <img src="/images/facebook.png"/>
                                <span>Facebook</span>
                              </button>
                            )}
                          />
                        </div>
                      </div>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default LoginModal;
