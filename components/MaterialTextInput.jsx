import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
const MaterialTextInput = () => {
  const CssTextField = withStyles({
    root: {
      "& label.Mui-focused": {
        color: "#000",
      },
      "& .MuiInput-underline:after": {
        borderColor: "#000",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#000",
        },
        "&:hover fieldset": {
          borderColor: "#000",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#000",
        },
      },
    },
  })(TextField);
  return (
    <div>
      <CssTextField />
    </div>
  );
};

export default MaterialTextInput;
