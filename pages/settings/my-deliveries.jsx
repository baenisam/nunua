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
import LoadingOverlay from "react-loading-overlay";
import DropdownTreeSelect from "react-dropdown-tree-select";
import UserLayOut from "~/components/user/userLayOut";
import "react-dropdown-tree-select/dist/styles.css";
import { withStyles } from "@material-ui/core/styles";
import { BsPlusSquareFill } from "react-icons/bs";
import SettingsLayOut from "~/components/user/settingsLayOut";
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
import { BiSolidTimeFive, BiWalletAlt, BiSolidPencil, BiSolidTrashAlt } from "react-icons/bi";
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
const MyDelivery = (props) => {
  const { state } = useContext(UserContext);
  const {
    sousCategory,
    setSousCategory,
    category,
    setCategory,
    images,
    setImages,
    region,
    setRegion,
    province,
    provinceDel,
    setProvinceDel,
    regionDel,
    setRegionDel,
    selectedDelivery,
    isFeeDevlivery,
    setIsFeeDelivery,
    handleDelete,
    setSelectedDelivery,
    setProvince,
    isLoading,
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
  const { data: listLivraison, loading: loadingLivraison } = useAsync(
    CathegorieService.getDeliveryAddresses,
    refresh
  );

  console.log(listLivraison);
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

  const [isCreate, setIsCreate] = useState(false);

  const [step, setStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [age, setAge] = React.useState("");
  const [isFee, setIsFee] = useState(false);
  const { saveAnnonce, loading, saveDelivery, isEdit, setIsEdit } =
    useAnnonceSubmit(setShowModal);

  const handleUpdate = (item) => {
    setProvinceDel(item?.emplacement?.city);
    setRegionDel(item?.emplacement);
    setIsFeeDelivery(item.deliver === 1 ? "OUI" : "NON");
    setIsFee(item.deliver === 1 ? true : false);
    setIsEdit(item);
    //setProvince()
    setShowModal(!showModal);
  };
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
            name: isEdit?.name || "",
            minDay: isEdit?.min || "",
            maxday: isEdit?.max || "",
            minPrice: isEdit?.price_min || "",
            maxPrice: isEdit?.price_max || "",
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
            name: isEdit?.name || "",
            minDay: isEdit?.min || "",
            maxday: isEdit?.max || "",
            minPrice: isEdit?.price_min || "",
            maxPrice: isEdit?.price_max || "",
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
      name: userInfo?.data?.full_name || "",
      email: userInfo?.data?.email || "",
      phone: userInfo?.data?.phone || "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Ce champs est requis"),
      email: Yup.string().required("Ce champs est requis"),
      phone: Yup.string().required("Ce champs est requis"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
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

  const closeModal = () => {
    setIsEdit(false);
    setIsFeeDelivery(null);
    setIsFee(false);
    setProvince(null);
    setRegion(null);
    setShowModal(!showModal);
  };

  return (
    <SettingsLayOut title={"Mes livraisons"}>
      <LoadingOverlay
        styles={{
          overlay: (base) => ({
            ...base,
            borderRadius: "5px",
            height:'100%',
            opacity: 0.2,
          }),
          spinner: (base) => ({
            ...base,
            color: "#44cef5",
          }),
        }}
        active={loadingLivraison || isLoading}
        spinner
      >
 
        <div className="">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              validation1.handleSubmit();
              return false;
            }}
          >
             {!loadingLivraison ?
            <Card className="bg-white">
                  <div className="card-header">
              <span>Mes lieux de livraison</span>
            </div>
              <div className="mx-auto col-12 col-md-12 col-lg-12">
                <div className="row">
                  {listLivraison?.length > 0
                    ? listLivraison?.map((item) => (
                        <div
                          role="button"
                          style={{ borderRadius: 0, cursor: "pointer" }}
                          className="p-4 mb-1 rounded-2xl border d-flex w-100 justify-content-between align-items-start"
                        >
                        
                          <div className="ml-0">
                            <div className="d-flex justify-content-start align-items-center">
                              <CiDeliveryTruck size={20} color="#000" />
                              <span className="ml-2">{item.name}</span>
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                              <FaMapMarkerAlt size={20} color="#000" />
                              <span className="ml-2">
                                {item.emplacement?.name}
                              </span>
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
                          <div>
                          <button className="text-success" onClick={() => handleUpdate(item)}>
                            <BiSolidPencil size={20}/>
                          </button>
                           <button className="text-danger" onClick={() => handleDelete(item?.id)}>
                            <BiSolidTrashAlt size={20}/>
                          </button>
                          </div>
                        </div>
                      ))
                    : null}
                 
                  <button
                    onClick={() => setShowModal(!showModal)}
                    style={{ borderRadius: 10 }}
                    className="p-4 mt-2 rounded-2xl border d-flex w-100 justify-content-start align-items-center"
                  >
                    <BsPlusSquareFill size={40} color={"#44cef5"} />
                    <span className="ml-4">Ajouter un lieu de livraison</span>
                  </button>
                </div>
              </div>
            </Card>: <div style={{width:'100%', height:600}}/>}
          </form>
          <MainModal open={showModal} closeModal={closeModal}>
            <div className="d-flex justify-content-start align-items-center mb-2">
              <CiDeliveryTruck size={30} color="#000" />
              <span className="ml-4" style={{ fontSize: 20 }}>
                {isEdit
                  ? "Modifier une option de livraison"
                  : "Ajouter une option de livraison"}
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
                  disabled={loadingEmplace}
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
                  disabled={!provinceDel}
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
      </LoadingOverlay>
    </SettingsLayOut>
  );
};

export default MyDelivery;
