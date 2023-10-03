import React from "react";
import { Button, TextField } from "@mui/material";
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';

import "./SignIn.css";

const Signin = () => {
    return (
        <div className="signin">
            <div className="form">
                <div className="text-wrapper">EasyDining</div>
                <div className="login">
                    <div className="div">Login</div>
                    {/* <RadioGroup row>
                        <FormControlLabel value="customer" control={<Radio />} label="Customer" />
                        <FormControlLabel value="restaurant" control={<Radio />} label="Restaurant" />
                    </RadioGroup> */}
                    <TextField
                        variant="outlined"
                        label="Email/Phone"
                        style={{
                            left: "44px",
                            position: "absolute",
                            top: "187px",
                            width: "600px"
                        }}
                    />
                    <TextField
                        variant="outlined"
                        label="Password"
                        style={{
                            left: "44px",
                            position: "absolute",
                            top: "270px",
                            width: "600px"
                        }}
                        type="password"
                    />
                    <p className="don-t-have-an">
                        <span className="span">Don’t have an account?</span>
                        <span className="text-wrapper-2"> Signup</span>
                    </p>
                    <img
                        className="line"
                        alt="Line"
                        src="https://c.animaapp.com/IYhXl8Mz/img/line-2.svg"
                    />
                    <img
                        className="img"
                        alt="Line"
                        src="https://c.animaapp.com/IYhXl8Mz/img/line-2.svg"
                    />

                    <Button
                        variant="outlined"
                        className="span overlap"
                        style={{ textTransform: "capitalize" }}
                    >
                        For&nbsp; <span className="text-wrapper-2">Business</span>
                    </Button>

                    <Button
                        variant="outlined"
                        className="span overlap-group"
                        style={{ textTransform: "capitalize" }}
                    >
                        For&nbsp; <span className="text-wrapper-2">Customer</span>
                    </Button>
                </div>
            </div>
            <div className="image">
                <img
                    className="element"
                    alt="Element"
                    src="https://c.animaapp.com/IYhXl8Mz/img/18841205-6023618-background-removed-1.png"
                />
            </div>
        </div>
    );
};

export default Signin;
