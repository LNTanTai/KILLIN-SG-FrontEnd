import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const PaymentForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Name: ", name);
        console.log("Email: ", email);
        console.log("Payment Method: ", paymentMethod);
        // Send form data to backend
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                required
                label="Name"
                variant="outlined"
                value={name}
                onChange={handleNameChange}
            />
            <TextField
                required
                label="Email"
                variant="outlined"
                value={email}
                onChange={handleEmailChange}
            />
            <FormControl margin="normal" required>
                <InputLabel>Payment Method</InputLabel>
                <Select
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                    displayEmpty
                >
                    <MenuItem value="" disabled>
                        Chọn phương thức thanh toán
                    </MenuItem>
                    <MenuItem value="creditCard">Credit Card</MenuItem>
                    <MenuItem value="paypal">PayPal</MenuItem>
                    <MenuItem value="bankTransfer">Bank Transfer</MenuItem>
                </Select>
            </FormControl>
            <Button type="submit" variant="contained">
                Submit
            </Button>
        </form>
    );
};

export default PaymentForm;
