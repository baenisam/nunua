import React from "react";
import { Spinner } from "reactstrap";

const Button = ({ loading, label, type }) => {
  return loading ? (
    <button disabled type="button" className="btn btn-primary btn-round w-100 py-3">
      <Spinner aria-label="hidden" type="grow" size="md">
        {""}
      </Spinner>
      {"   "}
      <span>Patientez...</span>
    </button>
  ) : (
    <button
      disabled={loading}
      type={type}
      className="btn btn-primary btn-round w-100 py-3"
    >
      <span>{label}</span>
      <i className="icon-long-arrow-right"></i>
    </button>
  );
};

export default Button;
