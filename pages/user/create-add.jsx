import React, { useState, useContext } from "react";
import ALink from "~/components/features/alink";
import { BiUser } from "react-icons/bi";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  FormGroup,
  Label,
  Input,
  Row,
  Spinner,
  FormFeedback,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TabContent,
  TabPane,
  Progress,
  NavLink,
  NavItem,
} from "reactstrap";
import { useFormik } from "formik";
import MetaDocument from "~/components/Meta";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import useAnnonceSubmit from "~/Hooks/useAnnonceSubmit";
import { UserContext } from "~/context/UserContext";
import MenuItem from "@mui/material/MenuItem";
import DropdownTreeSelect from "react-dropdown-tree-select";
import UserLayOut from "~/components/user/userLayOut";
import "react-dropdown-tree-select/dist/styles.css";
import { withStyles } from "@material-ui/core/styles";
import { BsPlusSquareFill } from "react-icons/bs";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TreeSelect, { BranchNode, defaultInput } from "mui-tree-select";
import FormLabel from "@mui/material/FormLabel";
import { FaMapMarkerAlt } from "react-icons/fa";
import ProtectedLayout from "~/components/user/ProtectedLayout";
import { Regions } from "~/utils/Countries";
import MainModal from "~/components/features/modals/MainModal";
import { styled } from "@mui/material/styles";
import ValidateModal from "~/components/features/modals/validate-modal";
import CountryServices from "~/services/CountryServices";
import useLoginSubmit from "~/Hooks/useLoginSubmit";
import { FiChevronRight } from "react-icons/fi";
import { BiSolidTimeFive, BiWalletAlt, BiSolidPencil } from "react-icons/bi";
import Button from "~/components/Button";
import FormControl from "@mui/material/FormControl";
import UploadImage from "~/components/UploadImage";
import { CiDeliveryTruck } from "react-icons/ci";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import TextField from "@mui/material/TextField";
import GlobalContext from "~/context/GlobalContext";
import Autocomplete from "@mui/material/Autocomplete";
import CathegorieService from "~/services/CategorieServices";
import Box from "@mui/material/Box";

import * as Yup from "yup";
import useAsync from "~/Hooks/useAsync";
const styless = {
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    width: 300,
    margin: 100,
  },
  //style for font size
  resize: {
    fontSize: 50,
  },
};
const CreateAnnounce = (props) => {
  const { state } = useContext(UserContext);
  const {
    sousCategory,
    setSousCategory,
    category,
    setCategory,
    images,
    setImages,
    region,
    provinceDel,
    setProvinceDel,
    regionDel,
    setRegionDel,
    setRegion,
    province,
    selectedDelivery,
    isFeeDevlivery,
    setIsFeeDelivery,
    setSelectedDelivery,
    setProvince,
    refresh,
  } = useContext(GlobalContext);

  const { userInfo } = state;
  const { data: countries, loading: loadingCountries } = useAsync(
    CountryServices.getCountries,
    refresh
  );

  const { data: categories, loading: loadingCategory } = useAsync(
    CathegorieService.getcategorie,
    refresh
  );

  const { data: emplacement, loading: loadingEmplace } = useAsync(
    CathegorieService.getEmplacement,
    refresh
  );
  const { data: listLivraison } = useAsync(
    CathegorieService.getDeliveryAddresses,
    refresh
  );

  console.log(listLivraison)
  const [selectedItems, setSelectedItems] = useState([]);
  const onChangeSelected = (item) => {
    const array = [...selectedItems];
    const finded = selectedItems.find(({ id }) => id === item.id);
    if (!finded) {
      array.push(item);
      setSelectedItems(array);
    } else {
      let newArray = array.filter(({ id }) => id !== item.id);
      setSelectedItems(newArray);
    }
  };

  const [data, setData] = useState(null);
  const [villes, setVilles] = useState([]);

  const [displayEmail, setDisplayEmail] = useState("");
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [age, setAge] = React.useState("");
  const [isFee, setIsFee] = useState(false);
  const { saveAnnonce, loading, saveDelivery } = useAnnonceSubmit(setShowModal);

  const handleChange = (event) => {
    if (event.target.value === "OUI") {
      setIsFee(true);
    } else {
      setIsFee(false);
    }
    setIsFeeDelivery(event.target.value);
  };
  const formSubmit = React.useRef(null);
  const {
    onSubmitRegister,
    register,
    resendEmail,
    modal,
    setModal,
    loadingResend,
    toggleTabwiz,
    activeTabwiz,
    setoggleTabwiz,
    passedStepswiz,
    setpassedStepswiz,
    passedSteps,
    rccm,
    setRccm,
    impot,
    setImpot,
    logo,
    setLogo,
    setPassedSteps,
    activeTab,
    onSumbitEntreprise,
    setactiveTab,
  } = useLoginSubmit({ inputs: data });
  const { className } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    formSubmit.current.click();
  };
  const toggle = () => setModal(!modal);
  const validation =
    isFeeDevlivery === "OUI"
      ? useFormik({
          enableReinitialize: true,
          initialValues: {
            name: "",
            minDay: "",
            maxday: "",
            minPrice: "",
            maxPrice: "",
          },
          validationSchema: Yup.object({
            name: Yup.string().required("Ce champs est requis"),
            minDay: Yup.string().required("Ce champs est requis"),
            maxday: Yup.string().required("Ce champs est requis"),
            minPrice: Yup.string().required("Ce champs est requis"),
            maxPrice: Yup.string().required("Ce champs est requis"),
          }),
          onSubmit: (values) => {
            saveDelivery(values);
          },
        })
      : useFormik({
          enableReinitialize: true,
          initialValues: {
            name: "",
            minDay: "",
            maxday: "",
            minPrice: "",
            maxPrice: "",
          },
          validationSchema: Yup.object({
            name: Yup.string().required("Ce champs est requis"),
            minDay: Yup.string().required("Ce champs est requis"),
            maxday: Yup.string().required("Ce champs est requis"),
            // minPrice: Yup.string().required("Ce champs est requis"),
            // maxPrice: Yup.string().required("Ce champs est requis"),
          }),
          onSubmit: (values) => {
            saveDelivery(values);
          },
        });

  const validation1 = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      description: "",
      price: "",
      phone: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Ce champs est requis"),
      description: Yup.string().required("Ce champs est requis"),
      price: Yup.string().required("Ce champs est requis"),
      phone: Yup.string().required("Ce champs est requis"),
    }),
    onSubmit: (values, { resetForm }) => {
      saveAnnonce(values);
    },
  });

  const Label = styled("label")`
    padding: 0 0 4px;
    line-height: 1.5;
    display: block;
  `;

  const onProvinceChange = (e, value) => {
    setSelectedProvince(value);
  };

  return (
    <UserLayOut title={"Publier une annonce"}>
        <div className="">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              validation1.handleSubmit();
              return false;
            }}
          >
            <Card className="bg-white">
              <div className="mx-auto col-12 col-md-12 col-lg-12">
                <div className="row mt-1">
                  <label className="col-lg-12 col-md-12">
                    Catégories de l'annonce
                  </label>
                  <div className="col-md-6 col-lg-6">
                    <Autocomplete
                      popupIcon={<FiChevronRight size={20} color="light" />}
                      size="large"
                      id="country-select-demo"
                      sx={{ width: "100%" }}
                      options={categories}
                      disabled={loadingCategory}
                      autoHighlight
                      style={{ height: 60 }}
                      value={category}
                      onChange={(e, value) => setCategory(value)}
                      getOptionLabel={(option) => option.name}
                      renderOption={(props, option) => (
                        <Box
                          component="button"
                          disabled={option?.children?.length === 0}
                          style={{ width: "100%" }}
                          {...props}
                        >
                          <img
                            loading="lazy"
                            style={{
                              borderRadius: 50,
                              width: 30,
                              height: 30,
                              marginRight: 5,
                            }}
                            src={
                              process.env.NEXT_PUBLIC_ASSET_URL +
                              "category/" +
                              option.image
                            }
                            srcSet={
                              process.env.NEXT_PUBLIC_ASSET_URL +
                              "category/" +
                              option.image
                            }
                            alt=""
                          />
                          {option.name}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          id="filled-basic"
                          style={{ width: "100%" }}
                          label="Catégorie"
                          className="w-100"
                          variant="filled"
                          {...params}
                          InputLabelProps={{ style: { fontSize: 16 } }}
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password",
                            style: {
                              height: 35,
                              fontSize: 16,
                              padding: "0px 10px",
                            }, // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="col-md-6 col-lg-6">
                    <Autocomplete
                      popupIcon={<FiChevronRight size={20} color="light" />}
                      size="large"
                      id="country-select-demo"
                      sx={{ width: "100%" }}
                      options={category?.children || []}
                      autoHighlight
                      value={sousCategory}
                      disabled={!category}
                      onChange={(e, value) => setSousCategory(value)}
                      style={{ height: 60 }}
                      getOptionLabel={(option) => option.name}
                      renderOption={(props, option) => (
                        <Box
                          component="button"
                          style={{ width: "100%" }}
                          {...props}
                        >
                          {option.name}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          id="filled-basic"
                          style={{ width: "100%" }}
                          label="Sous-catégorie"
                          variant="filled"
                          {...params}
                          InputLabelProps={{ style: { fontSize: 16 } }}
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password",
                            style: {
                              height: 35,
                              fontSize: 16,
                              padding: "0px 10px",
                            }, // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  </div>
                  <label className="col-lg-12 col-md-12 mt-1">
                    Emplacement
                  </label>
                  <div className="col-md-6 col-lg-6">
                    <Autocomplete
                      popupIcon={<FiChevronRight size={20} color="light" />}
                      size="large"
                      id="country-select-demo"
                      sx={{ width: "100%" }}
                      options={emplacement}
                      autoHighlight
                      value={province}
                      disabled={loadingEmplace}
                      style={{ height: 60 }}
                      onChange={(e, value) => setProvince(value)}
                      getOptionLabel={(option) => option.name}
                      renderOption={(props, option) => (
                        <Box
                          component="button"
                          disabled={option?.emplacement?.length === 0}
                          style={{ width: "100%" }}
                          {...props}
                        >
                          {option.name}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          id="filled-basic"
                          style={{ width: "100%" }}
                          label="Province"
                          variant="filled"
                          {...params}
                          InputLabelProps={{ style: { fontSize: 16 } }}
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password",
                            style: {
                              height: 35,
                              fontSize: 16,
                              padding: "0px 10px",
                            }, // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  </div>
                  <div className="col-md-6 col-lg-6">
                    <Autocomplete
                      popupIcon={<FiChevronRight size={20} color="light" />}
                      size="large"
                      id="country-select-demo"
                      sx={{ width: "100%" }}
                      disabled={!province}
                      options={province?.emplacement || []}
                      autoHighlight
                      style={{ height: 60 }}
                      value={region}
                      onChange={(e, value) => setRegion(value)}
                      getOptionLabel={(option) => option.name}
                      renderOption={(props, option) => (
                        <Box
                          component="button"
                          style={{ width: "100%" }}
                          {...props}
                        >
                          {option.name}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          id="filled-basic"
                          style={{ width: "100%" }}
                          label="Region"
                          variant="filled"
                          {...params}
                          InputLabelProps={{ style: { fontSize: 16 } }}
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "new-password",
                            style: {
                              height: 35,
                              fontSize: 16,
                              padding: "0px 10px",
                            }, // disable autocomplete and autofill
                          }}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="row mt-1">
                  <label className="col-lg-12 col-md-12">
                    Autres informations de l'annonce
                  </label>
                  <div className="col-md-12 col-lg-12">
                    <TextField
                      id="filled-basic"
                      style={{ width: "100%" }}
                      label="Titre de l'annonce (Ex: Téléphone samsung Galaxy S22)"
                      variant="filled"
                      name="name"
                      inputProps={{ style: { fontSize: 16 } }}
                      InputLabelProps={{ style: { fontSize: 16 } }}
                      onChange={validation1.handleChange}
                      onBlur={validation1.handleBlur}
                      value={validation1.values.name || ""}
                      invalid={
                        validation1.touched.name && validation1.errors.name
                          ? true
                          : false
                      }
                      error={
                        validation1.touched.name && validation1.errors.name
                      }
                    />
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="col-md-12 col-lg-12">
                    <TextField
                      id="filled-basic"
                      style={{ width: "100%" }}
                      label="Description de l'annonce"
                      variant="filled"
                      multiline
                      rows={6}
                      inputProps={{ style: { fontSize: 16 } }}
                      InputLabelProps={{ style: { fontSize: 16 } }}
                      name="description"
                      onChange={validation1.handleChange}
                      onBlur={validation1.handleBlur}
                      value={validation1.values.description || ""}
                      invalid={
                        validation1.touched.description &&
                        validation1.errors.description
                          ? true
                          : false
                      }
                      error={
                        validation1.touched.description &&
                        validation1.errors.description
                      }
                    />
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="col-md-12 col-lg-12">
                    <TextField
                      id="filled-basic"
                      style={{ width: "100%" }}
                      label="Prix en Dollar (Ex:10)"
                      variant="filled"
                      inputProps={{ style: { fontSize: 16 } }}
                      InputLabelProps={{ style: { fontSize: 16 } }}
                      name="price"
                      onChange={validation1.handleChange}
                      onBlur={validation1.handleBlur}
                      value={validation1.values.price || ""}
                      invalid={
                        validation1.touched.price && validation1.errors.price
                          ? true
                          : false
                      }
                      error={
                        validation1.touched.price && validation1.errors.price
                      }
                    />
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="col-md-6 col-lg-6">
                    <TextField
                      id="filled-basic"
                      style={{ width: "100%" }}
                      label="Votre numéro de téléphone (243999999999)"
                      variant="filled"
                      
                      inputProps={{ style: { fontSize: 16 } }}
                      InputLabelProps={{ style: { fontSize: 16 } }}
                      name="phone"
                      onChange={validation1.handleChange}
                      onBlur={validation1.handleBlur}
                      value={validation1.values.phone || ""}
                      invalid={
                        validation1.touched.phone && validation1.errors.phone
                          ? true
                          : false
                      }
                      error={
                        validation1.touched.phone && validation1.errors.phone
                      }
                    />
                  </div>
                  <div className="col-md-6 col-lg-6">
                    <TextField
                      id="filled-basic"
                      style={{ width: "100%" }}
                      variant="filled"
                      label="Votre nom"
                      //value={userInfo?.data?.full_name}
                      defaultValue={userInfo?.data?.full_name}
                      disabled
                      inputProps={{ style: { fontSize: 16 } }}
                      InputLabelProps={{ style: { fontSize: 16 } }}
                    />
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="col-lg-12 col-md-12 mt-2">
                    <Label className="font-bold text-bold">
                      Photos de l'annonce
                    </Label>
                    <p>
                      <strong className="font-bold">
                        Ajoutez au moins 1 photo pour cette annonce
                      </strong>
                      <br />
                      Première image est l'image du titre. Vous pouvez modifier
                      l'ordre des photos : il vous suffit de saisir vos photos
                      et de les faire glisser
                    </p>
                    <UploadImage
                      image={images}
                      setImages={setImages}
                      limite={4}
                    />
                  </div>
                </div>
              </div>
            </Card>
            <Card className="bg-white pt-3 mt-2 pb-5 mb-5">
              <div className="mx-auto col-12 col-md-5 col-lg-5">
                <div className="d-flex justify-content-start align-items-center mb-4">
                  <CiDeliveryTruck size={30} color="#000" />
                  <span className="ml-2">
                    <strong>Livraison</strong>
                  </span>
                </div>
                {isCreate ? (
                  <div className="row">
                    {listLivraison?.length > 0
                      ? listLivraison?.map((item) => (
                          <label
                            role="button"
                            style={{ borderRadius: 0, cursor: "pointer" }}
                            className="p-4 mb-1 rounded-2xl border d-flex w-100 justify-content-start align-items-start"
                          >
                            <input
                              type="checkbox"
                              checked={selectedItems.some(e => e.id === item.id) || selectedDelivery.some(e => e.id === item.id)}
                              onChange={() => onChangeSelected(item)}
                            />
                            <div className="ml-4">
                              <div className="d-flex justify-content-start align-items-center">
                                <CiDeliveryTruck size={20} color="#000" />
                                <span className="ml-2">{item.name}</span>
                              </div>
                              <div className="d-flex justify-content-start align-items-center">
                                <FaMapMarkerAlt size={20} color="#000" />
                                <span className="ml-2">{item.emplacement?.name}</span>
                              </div>
                              <div className="d-flex justify-content-start align-items-center">
                                <BiSolidTimeFive size={20} color="#000" />
                                <span className="ml-2">
                                  {item.min} Jour {item.min > 1 && "s"}
                                </span>
                              </div>
                              <div className="d-flex justify-content-start align-items-center">
                                <BiWalletAlt size={20} color="#000" />
                                <span className="ml-2">
                                  {!item.price_min
                                    ? "Livraison gratuite"
                                    : item.price_min + " $"}
                                </span>
                              </div>
                            </div>
                          </label>
                        ))
                      : null}

                    <button
                      onClick={() => setShowModal(!showModal)}
                      type="button"
                      style={{ borderRadius: 10 }}
                      className="p-4 mt-2 rounded-2xl border d-flex w-100 justify-content-start align-items-center"
                    >
                      <BsPlusSquareFill size={40} color={"#44cef5"} />
                      <span className="ml-4">Ajouter un lieu de livraison</span>
                    </button>
                    {listLivraison?.length > 0 && (
                      <>
                        <button
                          onClick={() => {
                            setSelectedDelivery(selectedItems);
                            setIsCreate(false);
                          }}
                          type="button"
                          style={{ borderRadius: 10 }}
                          className="p-4 mt-2 rounded-2xl bg-primary text-white text-center d-block w-100 justify-content-start align-items-center"
                        >
                          <span className="ml-4">
                            Séléctionner {selectedItems?.length} option
                            {selectedItems?.length > 1 && "s"}
                          </span>
                        </button>

                        <button
                        type="button"
                          onClick={() => setIsCreate(!isCreate)}
                          style={{ borderRadius: 10, textAlign: "center" }}
                          className="p-4 rounded-2xl text-center  d-block relative w-100 justify-content-start align-items-center"
                        >
                          <span className="text-danger text-center">
                            Annuler
                          </span>
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="row">
                    {selectedDelivery?.length > 0 ? (
                      <div
                        style={{ borderRadius: 10 }}
                        className="p-4 mb-1 rounded-2xl border d-flex w-100 bg-gray justify-content-start align-items-start"
                      >
                        <div className="col-10">
                          {selectedDelivery?.map((item) => (
                            <div className="p-2">
                              <span>
                                <strong>
                                  {item.emplacement?.name},{" "}
                                  {item.min + " - " + item.max} jour
                                </strong>
                              </span>
                              <br />
                              <span>
                                {!item.price_min
                                  ? "Livraison gratuite"
                                  : item.price_min +
                                    " - " +
                                    item.price_max +
                                    " $"}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="col-2 text-end justify-content-right align-items-end d-flex">
                          <button
                            onClick={() => {
                              setIsEdit(true);
                              setIsCreate(true);
                            }}
                            style={{ textAlign: "end" }}
                            className="text-end w-100"
                          >
                            <BiSolidPencil color="#000" size={20} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                      type="button"
                        onClick={() => setIsCreate(!isCreate)}
                        style={{ borderRadius: 10 }}
                        className="p-4 rounded-2xl border d-flex w-100 justify-content-start align-items-center"
                      >
                        <BsPlusSquareFill size={40} color={"#44cef5"} />
                        <span className="ml-4">
                          Ajouter un lieu de livraison
                        </span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </Card>
            <Card className="bg-white pt-3 pb-5 mb-2">
              <div className="mx-auto col-12 col-md-5 col-lg-5">
                <button
                  type="submit"
                  style={{ borderRadius: 10, backgroundColor: "#44cef5" }}
                  className="p-4 rounded-2xl border d-flex w-100 text-white justify-content-center align-items-center"
                >
                  {loading && (
                    <Spinner aria-label="hidden" type="grow" size="md">
                      {""}
                    </Spinner>
                  )}
                  <span className="ml-4">Publier une annonce</span>
                </button>
                <p
                  className="mt-2"
                  style={{ textAlign: "justify", fontSize: 10 }}
                >
                  En cliquant sur Créer une annonce, vous acceptez les
                  <a href="/terms-conditions" target="_blank" style={{ color: "#44cef5" }}>
                    <strong> conditions d'utilisation</strong>
                  </a>{" "}
                  de l'application nunua, confirmez que vous respecterez la
                  politique de confidentialité, et déclarez que cette
                  publication ne contient aucun élément interdit
                </p>
              </div>
            </Card>
          </form>
          <MainModal
            open={showModal}
            closeModal={() => setShowModal(!showModal)}
          >
            <div className="d-flex justify-content-start align-items-center mb-2">
              <CiDeliveryTruck size={30} color="#000" />
              <span className="ml-4" style={{ fontSize: 20 }}>
                Ajouter une option de livraison
              </span>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              <div className="row mt-1">
                <TextField
                  id="filled-basic"
                  style={{ width: "100%" }}
                  label="Nom de la livraison"
                  variant="filled"
                  name="name"
                  inputProps={{ style: { fontSize: 16 } }}
                  InputLabelProps={{ style: { fontSize: 16 } }}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.name || ""}
                  invalid={
                    validation.touched.name && validation.errors.name
                      ? true
                      : false
                  }
                  error={validation.touched.name && validation.errors.name}
                />
              </div>

              <div className="row mt-1">
                <Autocomplete
                  popupIcon={<FiChevronRight size={20} color="light" />}
                  size="large"
                  id="country-select-demo"
                  sx={{ width: "100%" }}
                  options={emplacement}
                  autoHighlight
                  style={{ height: 60 }}
                  onChange={(e, value) => setProvinceDel(value)}
                  value={provinceDel}
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option) => (
                    <Box
                      component="button"
                      disabled={option?.emplacement?.length === 0}
                      style={{ width: "100%" }}
                      {...props}
                    >
                      {option.name}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      id="filled-basic"
                      style={{ width: "100%" }}
                      label="Province"
                      variant="filled"
                      {...params}
                      InputLabelProps={{ style: { fontSize: 16 } }}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password",
                        style: {
                          height: 35,
                          fontSize: 16,
                          padding: "0px 10px",
                        }, // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </div>
              <div className="row mt-1">
                <Autocomplete
                  popupIcon={<FiChevronRight size={20} color="light" />}
                  size="large"
                  id="country-select-demo"
                  sx={{ width: "100%" }}
                  options={provinceDel?.emplacement || []}
                  autoHighlight
                  value={regionDel}
                  onChange={(e, value) => setRegionDel(value)}
                  style={{ height: 60 }}
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option) => (
                    <Box
                      component="button"
                      style={{ width: "100%" }}
                      {...props}
                    >
                      {option.name}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      id="filled-basic"
                      style={{ width: "100%" }}
                      label="Region"
                      variant="filled"
                      {...params}
                      InputLabelProps={{ style: { fontSize: 16 } }}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "new-password",
                        style: {
                          height: 35,
                          fontSize: 16,
                          padding: "0px 10px",
                        }, // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
              </div>
              <div className="row mt-1">
                <p>Combien de jours faut-il pour livrer ?</p>
                <div className="col-6 p-1">
                  <TextField
                    id="filled-basic"
                    style={{ width: "100%" }}
                    label="De"
                    variant="filled"
                    name="minDay"
                    inputProps={{ style: { fontSize: 16 } }}
                    InputLabelProps={{ style: { fontSize: 16 } }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.minDay || ""}
                    invalid={
                      validation.touched.minDay && validation.errors.minDay
                        ? true
                        : false
                    }
                    error={
                      validation.touched.minDay && validation.errors.minDay
                    }
                  />
                </div>

                <div className="col-6 p-1">
                  <TextField
                    id="filled-basic"
                    style={{ width: "100%" }}
                    label="A"
                    variant="filled"
                    name="maxday"
                    inputProps={{ style: { fontSize: 16 } }}
                    InputLabelProps={{ style: { fontSize: 16 } }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.maxday || ""}
                    invalid={
                      validation.touched.maxday && validation.errors.maxday
                        ? true
                        : false
                    }
                    error={
                      validation.touched.maxday && validation.errors.maxday
                    }
                  />
                </div>
              </div>

              <div className="row mt-1" style={{ zIndex: 10000 }}>
                <FormControl variant="filled" style={{ width: "100%" }}>
                  <InputLabel
                    style={{ fontSize: 14 }}
                    id="demo-simple-select-filled-label"
                  >
                    facturez-vous des frais de livraison ?
                  </InputLabel>
                  <Select
                    required
                    inputProps={{ style: { fontSize: 16 } }}
                    InputLabelProps={{ style: { fontSize: 16 } }}
                    style={{ width: "100%", height: 60, fontSize: 14 }}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={isFeeDevlivery}
                    onChange={handleChange}
                  >
                    <MenuItem value={"OUI"} defaultValue>
                      Oui
                    </MenuItem>
                    <MenuItem value={"NON"}>Non</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {isFee && (
                <div className="row mt-1">
                  <p>Combien cela coûte-t-il au client ? (en dollar)</p>
                  <div className="col-6 p-1">
                    <TextField
                      id="filled-basic"
                      style={{ width: "100%" }}
                      label="De"
                      variant="filled"
                      name="minPrice"
                      inputProps={{ style: { fontSize: 16 } }}
                      InputLabelProps={{ style: { fontSize: 16 } }}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.minPrice || ""}
                      invalid={
                        validation.touched.minPrice &&
                        validation.errors.minPrice
                          ? true
                          : false
                      }
                      error={
                        validation.touched.minPrice &&
                        validation.errors.minPrice
                      }
                    />
                  </div>
                  <div className="col-6 p-1">
                    <TextField
                      id="filled-basic"
                      style={{ width: "100%" }}
                      label="A"
                      variant="filled"
                      name="maxPrice"
                      inputProps={{ style: { fontSize: 16 } }}
                      InputLabelProps={{ style: { fontSize: 16 } }}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.maxPrice || ""}
                      invalid={
                        validation.touched.maxPrice &&
                        validation.errors.maxPrice
                          ? true
                          : false
                      }
                      error={
                        validation.touched.maxPrice &&
                        validation.errors.maxPrice
                      }
                    />
                  </div>
                </div>
              )}
              <div className="row mt-2">
                <button
                  disabled={loading}
                  type="submit"
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#44cef5",
                  }}
                  className="p-4 rounded-2xl border d-flex w-100 text-white justify-content-center align-items-center"
                >
                  {loading && (
                    <Spinner aria-label="hidden" type="grow" size="md">
                      {""}
                    </Spinner>
                  )}
                  <span className="ml-4">Enregistrer</span>
                </button>
              </div>
            </form>
          </MainModal>
        </div>
    </UserLayOut>
  );
};

export default CreateAnnounce;
