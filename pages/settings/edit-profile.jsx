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
import ProfileImage from "~/components/ProfileImage";
import DropdownTreeSelect from "react-dropdown-tree-select";
import UserLayOut from "~/components/user/userLayOut";
import "react-dropdown-tree-select/dist/styles.css";
import { withStyles } from "@material-ui/core/styles";
import { BsPlusSquareFill } from "react-icons/bs";
import SettingsLayOut from "~/components/user/settingsLayOut";
import useSettingSubmit from "~/Hooks/useSettinSubmit";
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
import { AiFillCamera } from "react-icons/ai";

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
const EditProfile = (props) => {
  const { state } = useContext(UserContext);
  const { country, setCountry, province, setProvince, refresh } =
    useContext(GlobalContext);

  const { userProfile } = state;
  const { data: countries } = useAsync(CountryServices.getCountries, refresh);
  const { data: emplacement, loading: loadingEmplace } = useAsync(
    CathegorieService.getEmplacement,
    refresh
  );

  const { updateProfile, loading } = useSettingSubmit();

  const validation1 = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userProfile?.full_name || "",
      email: userProfile?.email || "",
      phone: userProfile?.phone || "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Ce champs est requis"),
      email: Yup.string().required("Ce champs est requis"),
      phone: Yup.string().required("Ce champs est requis"),
    }),
    onSubmit: (values, { resetForm }) => {
      updateProfile(values);
    },
  });

  React.useEffect(() => {
    setCountry(countries.find((item) => item.code === "CD") || null);
    setProvince(userProfile?.ville || null);
  }, [countries]);

  return (
    <SettingsLayOut title={"Modifier le profile"}>
      <div className="">
        <Card className="bg-white cardUser">
          <div className="card-header">
            <span>Détails personnels</span>
          </div>
          <div className="mx-auto col-12 col-md-6 col-lg-6">
            {/* profile image */}
            <ProfileImage
              image={
                userProfile?.provider
                  ? userProfile?.profil
                  : process.env.NEXT_PUBLIC_ASSET_URL +
                    "users/" +
                    userProfile?.profil
              }
            />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                validation1.handleSubmit();
                return false;
              }}
            >
              <div className="mt-1">
                <div className="mt-1">
                  <TextField
                    id="filled-basic"
                    style={{ width: "100%" }}
                    label="Nom complet"
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
                    error={validation1.touched.name && validation1.errors.name}
                  />
                </div>
                <div className="mt-1">
                  <TextField
                    id="filled-basic"
                    style={{ width: "100%" }}
                    label="Email"
                    variant="filled"
                    name="email"
                    inputProps={{ style: { fontSize: 16 } }}
                    InputLabelProps={{ style: { fontSize: 16 } }}
                    onChange={validation1.handleChange}
                    onBlur={validation1.handleBlur}
                    value={validation1.values.email || ""}
                    invalid={
                      validation1.touched.email && validation1.errors.email
                        ? true
                        : false
                    }
                    error={
                      validation1.touched.email && validation1.errors.email
                    }
                  />
                </div>
                <div className="mt-1">
                  <TextField
                    id="filled-basic"
                    style={{ width: "100%" }}
                    label="Téléphone"
                    variant="filled"
                    name="phone"
                    inputProps={{ style: { fontSize: 16 } }}
                    InputLabelProps={{ style: { fontSize: 16 } }}
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
                <div className="mt-1">
                  <Autocomplete
                    popupIcon={<FiChevronRight size={20} color="light" />}
                    size="large"
                    id="country-select-demo"
                    sx={{ width: "100%" }}
                    options={countries}
                    autoHighlight
                    value={country}
                    disabled
                    style={{ height: 60 }}
                    onChange={(e, value) => setCountry(value)}
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
                        label="Pays"
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
                <div className="mt-1">
                  <Autocomplete
                    popupIcon={<FiChevronRight size={20} color="light" />}
                    size="large"
                    id="country-select-demo"
                    sx={{ width: "100%" }}
                    options={emplacement}
                    autoHighlight
                    disabled={loadingEmplace}
                    value={province}
                    style={{ height: 60 }}
                    onChange={(e, value) => setProvince(value)}
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
                        label="Ville"
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
                <div className="mt-1">
                  <button
                    type="submit"
                    style={{ borderRadius: 10, backgroundColor: "#44cef5" }}
                    className="p-3 rounded-0 border d-flex w-100 text-white justify-content-center align-items-center"
                  >
                    {loading && (
                      <Spinner aria-label="hidden" type="grow" size="md">
                        {""}
                      </Spinner>
                    )}
                    <span>Enregistrer</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </SettingsLayOut>
  );
};

export default EditProfile;
