import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  CircularProgress,
} from "@mui/material";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const MakePayment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [cardholderName, setCardholderName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        name: cardholderName,
      },
    });

    if (error) {
      console.error(error);
      setLoading(false);
    } else {
      console.log("Payment successful!", paymentMethod);
      alert("Payment Successful!");
      setLoading(false);
    }
  };

  return (
    
    <Box
      sx={{
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ padding: 3, maxWidth: 500, margin: "auto" }}>
        <Typography variant="h4" align="left" gutterBottom>
          Make Payment
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                placeholder="Name on Card"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 5,
                  },
                }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: 5,
                  mb: 2,
                  minHeight: "30px",
                }}
              >
                <CardElement
                  options={{ hidePostalCode: true,
                    style: {
                      base: {
                        fontSize: "20px",
                        color: "#424770",
                        "::placeholder": {
                          color: "#aab7c4",
                        },
                      },
                      invalid: {
                        color: "#9e2146",
                      },
                   }}
                }
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Payment Method</FormLabel>
                <RadioGroup row defaultValue="credit">
                  <FormControlLabel
                    value="credit"
                    control={<Radio />}
                    label="Credit Card"
                  />
                  <FormControlLabel
                    value="debit"
                    control={<Radio />}
                    label="Debit Card"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={!stripe || loading}
              >
                {loading ? <CircularProgress size={24} /> : "Pay Now"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
};

export default MakePayment;