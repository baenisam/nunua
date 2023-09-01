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
import useSettingSubmit from "~/Hooks/useSettinSubmit";
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
import { BiSolidTimeFive, BiWalletAlt, BiSolidPencil } from "react-icons/bi";
import Button from "~/components/Button";
import FormControl from "@mui/material/FormControl";
import UploadImage from "~/components/UploadImage";
import { CiDeliveryTruck } from "react-icons/ci";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import TextField from "@mui/material/TextField";
import GlobalContext from "~/context/GlobalContext";
import CathegorieService from "~/services/CategorieServices";

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
const EditPassword = (props) => {

  const { updatePassword, loading } = useSettingSubmit();



  const validation1 = useFormik({
    enableReinitialize: true,
    initialValues: {
      old: "",
      new: "",
      confirm: "",
    },

    validationSchema: Yup.object({
      old: Yup.string().required("Ce champs est requis"),
      new: Yup.string().required("Ce champs est requis"),
      confirm: Yup.string().required("Ce champs est requis"),
    }),
    onSubmit: (values, { resetForm }) => {
      updatePassword(values);
    },
  });

 

  return (
    <SettingsLayOut title={"Changement du mot de passe"}>
      <div className="">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validation1.handleSubmit();
            return false;
          }}
        >
          <Card className="bg-white">
            <div className="card-header">
              <span>Changement du mot de passe</span>
            </div>
            <div className="mx-auto col-12 col-md-6 col-lg-6">
              <div className="mt-1">
                <TextField
                  id="filled-basic"
                  style={{ width: "100%" }}
                  label="Ancien mot de passe"
                  variant="filled"
                  
                  type="password"
                  name="old"
                  inputProps={{ style: { fontSize: 16 } }}
                  InputLabelProps={{ style: { fontSize: 16 } }}
                  onChange={validation1.handleChange}
                  onBlur={validation1.handleBlur}
                  value={validation1.values.old || ""}
                  invalid={
                    validation1.touched.old && validation1.errors.old
                      ? true
                      : false
                  }
                  error={
                    validation1.touched.old && validation1.errors.old
                  }
                />
               
              </div>
              <div className="mt-1">
                <TextField
                  id="filled-basic"
                  style={{ width: "100%" }}
                  label="Nouveau mot de passe"
                  variant="filled"
                  type="password"
                  name="new"
                  inputProps={{ style: { fontSize: 16 } }}
                  InputLabelProps={{ style: { fontSize: 16 } }}
                  onChange={validation1.handleChange}
                  onBlur={validation1.handleBlur}
                  value={validation1.values.new || ""}
                  invalid={
                    validation1.touched.new && validation1.errors.new
                      ? true
                      : false
                  }
                  error={
                    validation1.touched.new && validation1.errors.new
                  }
                />
              </div>
              <div className="mt-1">
                <TextField
                  id="filled-basic"
                  style={{ width: "100%" }}
                  label="Confirmer le mot de passe"
                  variant="filled"
                  type="password"
                  name="confirm"
                  inputProps={{ style: { fontSize: 16 } }}
                  InputLabelProps={{ style: { fontSize: 16 } }}
                  onChange={validation1.handleChange}
                  onBlur={validation1.handleBlur}
                  value={validation1.values.confirm || ""}
                  invalid={
                    validation1.touched.confirm && validation1.errors.confirm
                      ? true
                      : false
                  }
                  error={
                    validation1.touched.confirm && validation1.errors.confirm
                  }
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
          </Card>
        </form>
      </div>
    </SettingsLayOut>
  );
};

export default EditPassword;
