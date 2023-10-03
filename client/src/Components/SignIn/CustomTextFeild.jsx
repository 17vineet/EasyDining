import React from 'react'
import styled from '@emotion/styled';
import { TextField } from '@mui/material';

const CssTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black"
      },
      "&:hover fieldset": {
        borderColor: "#1976D2"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#1976D2"
      },
      "& fieldset>legend": {
        fontSize: "1.25em" //or whatever works for you
      }
    },
    input: {
      fontSize: "2rem"
    },
    label: {
      fontSize: "1.5rem"
    }
});

const CustomTextFeild = () => {
  return (
    <CssTextField
        variant="outlined"
        inputProps={{
          style: {
            height: "55px",
            fontSize: "2rem"
          }
        }}
    />
  )
}

export default CustomTextFeild