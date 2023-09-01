import React from "react";
import {
  Form,
  Label,
  Input,
  Button,
  Spinner,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Countdown from "react-countdown";
import { Modal } from "antd";
import * as Yup from "yup";
import classnames from "classnames";
import { useFormik } from "formik";
const ValidateModal = ({
  modal,
  toggle,
  onValidate,
  resendEmail,
  loading,
  loadingResend,
  email,
}) => {
  const validation1 = useFormik({
    enableReinitialize: true,

    initialValues: {
      code: "",
    },

    validationSchema: Yup.object({
      code: Yup.string().required("Ce champs est requis"),
    }),
    onSubmit: (values) => {
      onValidate(values);
    },
  });

  const renderer = ({ seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return loadingResend ? (
        <Button disabled className="w-100" color="primary">
          <Spinner aria-label="hidden" type="grow" size="md">
            {""}
          </Spinner>
          {"   "}
          <span>Patientez...</span>
        </Button>
      ) : (
        <Button onClick={resendEmail} className="w-100" color="primary">
          Renvoyer le code
        </Button>
      );
    } else {
      // Render a countdown
      return (
        <Button className="w-100" disabled color="primary">
          Renvoyer le code ({seconds} s)
        </Button>
      );
    }
  };
  return (
    <Modal
      wrapClassName="rounded-0"
      zIndex={1}
      footer={null}
      maskClosable
      bodyStyle={{ borderRadius: 0 }}
      centered
      cancelButtonProps={() => <></>}
      open={modal}
      onCancel={toggle}
    >
      <div className="bg-white" style={{ zIndex: 999 }}>
        <ModalHeader>Vérifiez votre adresse email</ModalHeader>
        <Form
          className="form-horizontal"
          onSubmit={(e) => {
            e.preventDefault();
            validation1.handleSubmit();
            return false;
          }}
        >
          <ModalBody className="p-4">
          <div className="mt-2 mb-2">
              <small style={{ fontSize: 12 }}>
                Vérifiez votre boite email, nous vous avons envoyé un code de
                validation de votre compte
              </small>
            </div>
            <div className="form-group">
              <Label>
                Email <span className="text-danger">*</span>
              </Label>
              <Input
                value={email}
                readOnly
                type="email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <Label>
                Code de validation <span className="text-danger">*</span>
              </Label>
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <Input
                    style={{ borderRadius: 3 }}
                    className="form-control"
                    type="text"
                    name="code"
                    placeholder="Entrez le code de validation ici"
                    id="exampleSelect"
                    onChange={validation1.handleChange}
                    onBlur={validation1.handleBlur}
                    value={validation1.values.code}
                    invalid={
                      validation1.touched.code && validation1.errors.code
                        ? true
                        : false
                    }
                  />
                  {validation1.touched.code && validation1.errors.code ? (
                    <small className="text-danger">
                      {validation1.errors.code}
                    </small>
                  ) : null}
                </div>
                <div className="col-lg-6 col-md-6">
                  {/* <Countdown
                    dis
                    date={Date.now() + 60000}
                    renderer={renderer}
                  /> */}
                  {loadingResend ? (
                    <Button disabled={true} className="w-100" color="primary">
                      En cours...
                    </Button>
                  ) : (
                    <Button
                      disabled={loadingResend}
                      onClick={resendEmail}
                      className="w-100"
                      color="primary"
                    >
                      Renvoyer le code
                    </Button>
                  )}
                </div>
              </div>
            </div>
          
          </ModalBody>
          <ModalFooter>
            {loading ? (
              <button disabled type="button" className="btn btn-primary w-100">
                <Spinner aria-label="hidden" type="grow" size="md">
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
                Valider le compte
              </button>
            )}
          </ModalFooter>
        </Form>
      </div>
    </Modal>
  );
};

export default ValidateModal;
