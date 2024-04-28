import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import "./ChildProfile.css";

// поможи бо буду плакати з цим дуже

export const ChildInputForm = () => {
    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    return (
        <div className="input-container">
            <div className="input-wrapper">
                <span className="text-above-input">First Name</span>
                <TextField
                    label=""
                    variant="outlined"
                    size="small"
                    name="firstName"
                    value={inputs.firstName}
                    onChange={handleChange}
                />
            </div>
            {/* Додайте ще 10 подібних блоків для інших інпутів */}
        </div>
    );
};

