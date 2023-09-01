import React, { useContext } from "react";
import {
  Card,
  Spinner,
} from "reactstrap";
import { useFormik } from "formik";
import { UserContext } from "~/context/UserContext";
import SettingsLayOut from "~/components/user/settingsLayOut";
import useSettingSubmit from "~/Hooks/useSettinSubmit";
import TextField from "@mui/material/TextField";
import * as Yup from "yup";

const EditCompany = (props) => {
  const { state } = useContext(UserContext);
  const { userProfile } = state;
  const { updateUserSettings, loading} = useSettingSubmit();
  const validation1 = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: userProfile?.settingsuser?.email || "",
      description: userProfile?.settingsuser?.about || "",
      phone: userProfile?.settingsuser?.phone || ""
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Ce champs est requis"),
      phone: Yup.string().required("Ce champs est requis"),
    }),
    onSubmit: (values, { resetForm }) => {
      updateUserSettings(values);
    },
  });



  return (
    <SettingsLayOut title={"Modifier l'entreprise"}>
      <div className="">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validation1.handleSubmit();
            return false;
          }}
        >
          <Card className="bg-white cardUser h-100">
          <div className="card-header">
              <span>Informations de l'entreprise</span>
            </div>
            <div className="mx-auto col-12 col-md-6 col-lg-6">
          
              <div className="mt-1">
                <div className="mt-1">
                  <TextField
                    id="filled-basic"
                    style={{ width: "100%" }}
                    label="Nom de l'entreprise"
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
                    label="Description de l'entreprise"
                    variant="filled"
                    name="description"
                    multiline
                      rows={6}
                    inputProps={{ style: { fontSize: 16 } }}
                    InputLabelProps={{ style: { fontSize: 16 } }}
                    onChange={validation1.handleChange}
                    onBlur={validation1.handleBlur}
                    value={validation1.values.description || ""}
                    invalid={
                      validation1.touched.description && validation1.errors.description
                        ? true
                        : false
                    }
                    error={
                      validation1.touched.description && validation1.errors.description
                    }
                  />
                </div>
                <div className="mt-1">
                  <TextField
                    id="filled-basic"
                    style={{ width: "100%" }}
                    label="Phone de l'entreprise"
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
            </div>
          </Card>
        </form>
      </div>
    </SettingsLayOut>
  );
};

export default EditCompany;
