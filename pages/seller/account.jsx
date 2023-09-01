import React, { useState, useContext } from "react";
import ALink from "~/components/features/alink";
import { BiUser } from "react-icons/bi";
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Label,
  Input,
  Select,
  Button,
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
import { UserContext } from "~/context/UserContext";
import { Regions } from "~/utils/Countries";
import ValidateModal from "~/components/features/modals/validate-modal";
import CountryServices from "~/services/CountryServices";
import useLoginSubmit from "~/Hooks/useLoginSubmit";
import Uploader from "~/components/Uploader";
import Countdown from "react-countdown";
import { Modal } from "antd";
// import { Input, Select } from "antd";
import {
  BsFillEnvelopeFill,
  BsFillTelephoneFill,
  BsFillLockFill,
} from "react-icons/bs";
import * as Yup from "yup";
import classnames from "classnames";
import useAsync from "~/Hooks/useAsync";
const account = (props) => {
  const { state } = useContext(UserContext);
  const { userInfo } = state;
  const { data: countries, loading: loadingCountries } = useAsync(
    CountryServices.getCountries
  );

  const [data, setData] = useState(null);

  const formSubmit = React.useRef(null);
  const {
    onSubmitRegister,
    loading,
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
    displayEmail, setDisplayEmail,
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
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      full_name: "",
      email: "",
      code: "",
      country: countries.find((item) => item.code === "CD")?.id,
      password: "",
      checked: false,
    },

    validationSchema: Yup.object({
      full_name: Yup.string().required("Ce champs est requis"),
      email: Yup.string()
        .email("Veuillez entrer un email valide")
        .required("Ce champs est requis"),
      checked: Yup.boolean().oneOf([true], "Veuillez vérifier l'accord"),
      password: Yup.string().required("Ce champs est requis"),
    }),
    onSubmit: (values) => {
      if (activeTabwiz < 2) {
        onSubmitRegister(values);
        setData(values);
        setDisplayEmail(values.email);

        //toggleTabwiz(activeTabwiz + 1);
      } else {
        console.log(values);
      }
    },
  });

  const validation1 = useFormik({
    enableReinitialize: true,

    initialValues: {
      name: "",
      email: "",
      phone: "",
      country: countries.find((item) => item.code === "CD")?.id,
      ville: countries
        .find((item) => item.code === "CD")
        ?.ville?.find((item) => item.name === "Goma")?.id,
      checked: false,
      idnat: "",
      rccm: "",
      impot: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Ce champs est requis"),
      email: Yup.string().email("Veuillez entrer un email valide"),
      phone: Yup.string().required("Ce champs est requis"),
      impot: Yup.string().required("Ce champs est requis"),
      rccm: Yup.string().required("Ce champs est requis"),
    }),
    onSubmit: (values) => {
      onSumbitEntreprise(values)
    },
  });
  return (
    <>
      <div className="main">
        <MetaDocument title="Création du compte business" />
        <div className="container mt-10">
          <div className="col-lg-12">
            <Card>
              <CardBody>
                <div id="progrss-wizard" className="twitter-bs-wizard">
                  <ul className="twitter-bs-wizard-nav nav-justified nav nav-pills">
                    <NavItem
                      className={classnames({
                        active: activeTabwiz === 1,
                      })}
                    >
                      <NavLink
                        className={classnames({
                          active: activeTabwiz === 1,
                        })}
                      >
                        <span style={{
                          color:activeTabwiz === 1 && "#fff"
                        }} className="step-number">01</span>
                        <span
                          role="button"
                          className="step-title"
                          style={{ paddingLeft: "10px" }}
                        >
                          Informations de l'utilisateur
                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem
                      className={classnames({
                        active: activeTabwiz === 2,
                      })}
                    >
                      <NavLink
                        className={classnames({
                          active: activeTabwiz === 2,
                        })}
                      >
                        <span  style={{
                          color:activeTabwiz === 2 && "#fff"
                        }} className="step-number">02</span>
                        <span
                          role="button"
                          className="step-title"
                          style={{ paddingLeft: "10px" }}
                        >
                          Informations de l'entreprise
                        </span>
                      </NavLink>
                    </NavItem>
                    <NavItem
                      className={classnames({
                        active: activeTabwiz === 3,
                      })}
                    >
                      <NavLink
                        className={classnames({
                          active: activeTabwiz === 3,
                        })}
                      >
                        <span  style={{
                          color:activeTabwiz === 3 && "#fff"
                        }} className="step-number">03</span>
                        <span
                          role="button"
                          className="step-title"
                          style={{ paddingLeft: "10px" }}
                        >
                          Confirmation
                        </span>
                      </NavLink>
                    </NavItem>
                  </ul>
                  <TabContent
                    activeTab={activeTabwiz}
                    className="twitter-bs-wizard-tab-content"
                  >
                    <TabPane tabId={1}>
                      <Form
                        className="form-horizontal"
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                      >
                        <div className="mx-auto col-10 col-md-8 col-lg-6">
                          <p>
                            <b>Créer un compte</b>
                          </p>

                          <div className="form-group mt-1">
                            <Label for="exampleSelect">Pays *</Label>
                            <Input
                              disabled={loadingCountries}
                              style={{ borderRadius: 3 }}
                              className="form-control"
                              type="select"
                              name="country"
                              readOnly
                              id="exampleSelect"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.country}
                              invalid={
                                validation.touched.country &&
                                validation.errors.country
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
                            {validation.touched.country &&
                            validation.errors.country ? (
                              <small className="text-danger">
                                {validation.errors.country}
                              </small>
                            ) : null}
                          </div>
                          <div className="form-group mt-1">
                            <Label for="exampleSelect">Nom complet *</Label>
                            <Input
                              size="large"
                              status={
                                validation.touched.full_name &&
                                validation.errors.full_name &&
                                "error"
                              }
                              placeholder="Nom complet"
                              name="full_name"
                              prefix={<BiUser />}
                              style={{ borderRadius: 3 }}
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.full_name}
                              invalid={
                                validation.touched.full_name &&
                                validation.errors.full_name
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.full_name &&
                            validation.errors.full_name ? (
                              <small className="text-danger">
                                {validation.errors.full_name}
                              </small>
                            ) : null}
                          </div>
                          <div className="form-group mt-1">
                            <Label for="exampleSelect">Email *</Label>
                            <Input
                              size="large"
                              status={
                                validation.touched.email &&
                                validation.errors.email &&
                                "error"
                              }
                              placeholder="Email"
                              name="email"
                              prefix={<BsFillEnvelopeFill />}
                              style={{ borderRadius: 3 }}
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.email}
                              invalid={
                                validation.touched.email &&
                                validation.errors.email
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.email &&
                            validation.errors.email ? (
                              <small className="text-danger">
                                {validation.errors.email}
                              </small>
                            ) : null}
                          </div>
                          <div className="form-group mt-1">
                            <Label for="exampleSelect">Mot de passe *</Label>
                            <Input
                              size="large"
                              status={
                                validation.touched.password &&
                                validation.errors.password &&
                                "error"
                              }
                              placeholder="Mot de passe"
                              name="password"
                              type="password"
                              prefix={<BsFillLockFill />}
                              style={{ borderRadius: 3 }}
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.password}
                              invalid={
                                validation.touched.password &&
                                validation.errors.password
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.password &&
                            validation.errors.password ? (
                              <small className="text-danger">
                                {validation.errors.password}
                              </small>
                            ) : null}
                          </div>
                          <div
                            class="form-check"
                            style={{ alignItems: "center" }}
                          >
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="flexCheckDefault"
                              name="checked"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.checked}
                            />
                            <label
                              role="button"
                              class="form-check-label"
                              for="flexCheckDefault"
                            >
                              J'accepter <a href="#">le contrat d'adhésion</a>
                            </label>
                          </div>
                          {validation.touched.checked &&
                          validation.errors.checked ? (
                            <small className="text-danger">
                              {validation.errors.checked}
                            </small>
                          ) : null}
                          {loading ? (
                            <button
                              disabled
                              type="button"
                              className="btn btn-primary w-100"
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
                              style={{ borderRadius: 2, marginTop: 5 }}
                              className="btn btn-primary w-100"
                              type="submit"
                            >
                              Continuer
                            </button>
                          )}
                        </div>
                        <div className="pager wizard twitter-bs-wizard-pager-link"></div>
                      </Form>
                    </TabPane>
                    <TabPane tabId={2}>
                      <div>
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation1.handleSubmit();
                            return false;
                          }}
                        >
                          <div className="mx-auto col-10 col-md-8 col-lg-6">
                            <p>
                              <b>Créer un compte entreprise</b>
                            </p>
                            <p>
                              Entrez les informations ci-dessous pour créer
                              votre entreprise sur Nunua
                            </p>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="form-group mt-1">
                                  <Label for="exampleSelect">Pays *</Label>
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
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="form-group mt-1">
                                  <Label for="exampleSelect">Ville *</Label>
                                  <Input
                                    disabled={loadingCountries}
                                    style={{ borderRadius: 3 }}
                                    className="form-control"
                                    type="select"
                                    name="ville"
                                    readOnly
                                    id="exampleSelect"
                                    onChange={validation1.handleChange}
                                    onBlur={validation1.handleBlur}
                                    value={validation1.values.ville}
                                    invalid={
                                      validation1.touched.ville &&
                                      validation1.errors.ville
                                        ? true
                                        : false
                                    }
                                  >
                                    {countries
                                      ?.find((item) => item.code === "CD")
                                      ?.ville?.filter(
                                        (item) => item.name === "Goma"
                                      )
                                      ?.map((item) => (
                                        <option value={item.id} defaultValue>
                                          {item.name}
                                        </option>
                                      ))}
                                  </Input>
                                  {validation1.touched.ville &&
                                  validation1.errors.ville ? (
                                    <small className="text-danger">
                                      {validation1.errors.ville}
                                    </small>
                                  ) : null}
                                </div>
                              </div>
                            </div>

                            <div className="form-group mt-1">
                              <Label for="exampleSelect">
                                Nom de l'entreprise *
                              </Label>
                              <Input
                                size="large"
                                status={
                                  validation1.touched.name &&
                                  validation1.errors.name &&
                                  "error"
                                }
                                placeholder="Nom de l'entreprise"
                                name="name"
                                prefix={<BiUser />}
                                style={{ borderRadius: 3 }}
                                onChange={validation1.handleChange}
                                onBlur={validation1.handleBlur}
                                value={validation1.values.name}
                                invalid={
                                  validation1.touched.name &&
                                  validation1.errors.name
                                    ? true
                                    : false
                                }
                              />
                              {validation1.touched.name &&
                              validation1.errors.name ? (
                                <small className="text-danger">
                                  {validation1.errors.name}
                                </small>
                              ) : null}
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="form-group mt-1">
                                  <Label for="exampleSelect">
                                    Téléphone de l'entreprise *
                                  </Label>
                                  <Input
                                    size="large"
                                    status={
                                      validation1.touched.phone &&
                                      validation1.errors.phone &&
                                      "error"
                                    }
                                    placeholder="Téléphone de l'entreprise"
                                    name="phone"
                                    prefix={<BiUser />}
                                    style={{ borderRadius: 3 }}
                                    onChange={validation1.handleChange}
                                    onBlur={validation1.handleBlur}
                                    value={validation1.values.phone}
                                    invalid={
                                      validation1.touched.phone &&
                                      validation1.errors.phone
                                        ? true
                                        : false
                                    }
                                  />
                                  {validation1.touched.phone &&
                                  validation1.errors.phone ? (
                                    <small className="text-danger">
                                      {validation1.errors.phone}
                                    </small>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-lg-6 ol-md-6">
                                <div className="form-group mt-1">
                                  <Label for="exampleSelect">
                                    Email de l'entreprise *
                                  </Label>
                                  <Input
                                    size="large"
                                    status={
                                      validation1.touched.email &&
                                      validation1.errors.email &&
                                      "error"
                                    }
                                    placeholder="Email de l'entreprise (facultatif)"
                                    name="email"
                                    prefix={<BiUser />}
                                    style={{ borderRadius: 3 }}
                                    onChange={validation1.handleChange}
                                    onBlur={validation1.handleBlur}
                                    value={validation1.values.email}
                                    invalid={
                                      validation1.touched.email &&
                                      validation1.errors.email
                                        ? true
                                        : false
                                    }
                                  />
                                  {validation1.touched.email &&
                                  validation1.errors.email ? (
                                    <small className="text-danger">
                                      {validation1.errors.email}
                                    </small>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="form-group mt-1">
                                  <Label for="exampleSelect">
                                    Rccm/Patente *
                                  </Label>
                                  <Input
                                    size="large"
                                    status={
                                      validation1.touched.rccm &&
                                      validation1.errors.rccm &&
                                      "error"
                                    }
                                    placeholder="Nom de l'entreprise"
                                    name="rccm"
                                    prefix={<BiUser />}
                                    style={{ borderRadius: 3 }}
                                    onChange={validation1.handleChange}
                                    onBlur={validation1.handleBlur}
                                    value={validation1.values.rccm}
                                    invalid={
                                      validation1.touched.rccm &&
                                      validation1.errors.rccm
                                        ? true
                                        : false
                                    }
                                  />
                                  {validation1.touched.rccm &&
                                  validation1.errors.rccm ? (
                                    <small className="text-danger">
                                      {validation1.errors.rccm}
                                    </small>
                                  ) : null}
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="form-group mt-1">
                                  <Label for="exampleSelect">
                                    Identification nationale (facultatif) *
                                  </Label>
                                  <Input
                                    size="large"
                                    status={
                                      validation1.touched.idnat &&
                                      validation1.errors.idnat &&
                                      "error"
                                    }
                                    placeholder="Identification nationale"
                                    name="idnat"
                                    prefix={<BiUser />}
                                    style={{ borderRadius: 3 }}
                                    onChange={validation1.handleChange}
                                    onBlur={validation1.handleBlur}
                                    value={validation1.values.idnat}
                                    invalid={
                                      validation1.touched.idnat &&
                                      validation1.errors.idnat
                                        ? true
                                        : false
                                    }
                                  />
                                  {validation1.touched.idnat &&
                                  validation1.errors.idnat ? (
                                    <small className="text-danger">
                                      {validation1.errors.idnat}
                                    </small>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                            <div className="form-group mt-1">
                              <Label for="exampleSelect">
                                Numéro d'impôt *
                              </Label>
                              <Input
                                size="large"
                                status={
                                  validation1.touched.impot &&
                                  validation1.errors.impot &&
                                  "error"
                                }
                                placeholder="Numéro d'impôt"
                                name="impot"
                                prefix={<BiUser />}
                                style={{ borderRadius: 3 }}
                                onChange={validation1.handleChange}
                                onBlur={validation1.handleBlur}
                                value={validation1.values.impot}
                                invalid={
                                  validation1.touched.impot &&
                                  validation1.errors.impot
                                    ? true
                                    : false
                                }
                              />
                              {validation1.touched.impot &&
                              validation1.errors.impot ? (
                                <small className="text-danger">
                                  {validation1.errors.impot}
                                </small>
                              ) : null}
                            </div>
                            <div className="row">
                              <div className="col-lg-4 col-md-4">
                                <div className="form-group mt-1">
                                  <Label for="exampleSelect">
                                    Logo (facultatif) *
                                  </Label>
                                  <Uploader
                                    onChange={setLogo}
                                    label={"Télécharger un logo"}
                                    mode={"basic"}
                                    name={"logo"}
                                    accept={"image/*"}
                                  />
                          
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-4">
                                <div className="form-group mt-1">
                                  <Label for="exampleSelect">
                                    Rccm/Patente *
                                  </Label>
                                  <Uploader
                                    onChange={setRccm}
                                    label={"Télécharger un document"}
                                    mode={"basic"}
                                    name={"rccm_doc"}
                                    accept={"*"}
                                  />
                          
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-4">
                                <div className="form-group mt-1">
                                  <Label for="exampleSelect">
                                    Numéro d'impôt *
                                  </Label>
                                  <Uploader
                                    onChange={setImpot}
                                    label={"Télécharger un document"}
                                    mode={"basic"}
                                    name={"impot_doc"}
                                  />

                                
                                </div>
                              </div>
                            </div>

                            {loading ? (
                              <button
                                disabled
                                type="button"
                                className="btn btn-primary w-100"
                              >
                                <Spinner
                                  aria-label="hidden"
                                  type="grow"
                                  size="md"
                                >
                                  {""}
                                </Spinner>
                                {"   "}
                                <span>Création en cours...</span>
                              </button>
                            ) : (
                              <button
                                style={{ borderRadius: 2, marginTop: 5 }}
                                className="btn btn-primary w-100"
                                type="submit"
                              >
                                Créer l'entreprise
                              </button>
                            )}
                          </div>
                        </Form>
                      </div>
                    </TabPane>
                    <TabPane tabId={3}>
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-sm-6">
                            <div className="icon-box icon-box-circle text-center">
                                <span className="icon-box-icon">
                                    <i className="icon-check"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">La création de l'entreprise a reussie avec succès</h3>

                                    <p>
                                      Votre entreprise a été crééer avec succès, nous vous avons envoyé un email contenant le contrat d'utilisation de NUNUA.
                                      Après l'avoir lu, veuillez nous contacter.
                                      <br/>NB: Votre entreprise ne sera opérationnelle qu'après sa validation
                                    </p>
                                </div>
                            </div>
                        </div>
                        </div>
                    </TabPane>
                  </TabContent>
                  
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default account;
