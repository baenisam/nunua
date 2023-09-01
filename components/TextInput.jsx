import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { Input, FormFeedback } from "reactstrap";
const TextInput = ({
  placeholder,
  name,
  type,
  error,
  invalid,
  icon,
  onChange,
  onFocus,
  id,
  value,
  onBlur,
}) => {
  return (
    <div className="form-group">
      <div
        className="form-control d-flex justify-content-center align-items-center"
        style={{ borderRadius: 4, borderWidth:error? .5 : .5, borderColor:error && 'red' }}
      >
        {icon}
        <Input
          type={type}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          name={name}
          id={id}
          value={value}
          placeholder={placeholder}
          style={{
            borderWidth: 0,
            width: "100%",
            outline: 0,
            backgroundColor: "transparent",
            borderColor:'transparent'
          }}
        />
      </div>
      {error ? <FormFeedback type="invalid">{error}</FormFeedback> : null}
    </div>
  );
};

export default TextInput;
