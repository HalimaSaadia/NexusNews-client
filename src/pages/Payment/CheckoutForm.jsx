import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext, useEffect } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";
import { Box, Button, CardActionArea, Paper } from "@mui/material";
import useUserState from "../../Hooks/useIsAdmin";

const CheckoutForm = ({ subscriptionPlan }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const {premiumTakenRefetch} = useUserState()

  const option = {
    style: {
      base: {
        iconColor: "#5e503f",
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  useEffect(() => {
    axios
      .post("http://localhost:5000/payment", {
        price: subscriptionPlan,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Wait...");
    if (!stripe || !elements) {
      return console.log("No stripe, no element");
    }
    const card = elements.getElement(CardNumberElement);
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      Swal.fire({
        icon: "error",
        confirmButtonColor: "#5e503f",
        title: error.message,
      });
      toast.remove(toastId);
    } else {
      console.log(
        "[paymentMethod]",
        paymentMethod.created,
        "premiumTaken Time"
      );
      axiosSecure
        .patch(`/subscription/${subscriptionPlan}`, { user: user?.email })
        .then((res) => {
          Swal.fire({
            icon: "success",
            confirmButtonColor: "#5e503f",
            title: "Thanks For Your Subscription",
          });
          toast.remove(toastId);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            confirmButtonColor: "#5e503f",
            title: err.message,
          });
          toast.remove(toastId);
        });
    }
  };

  return (
   <Box sx={{height:'90vh', display:'flex',justifyContent:'center', alignItems:'center'}}>
     <Paper elevation={3} sx={{padding:5, width:500}}>
      <form onSubmit={handleSubmit}>
        {/* <CardElement
        options={{
          style: {
            base: {
              iconColor: "#5e503f",
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
              
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      /> */}
        <Box sx={{ borderBottom: "2px solid #aab7c4", padding: "10px 2px" }}>
          <CardNumberElement options={option} />
        </Box>
        <Box sx={{ borderBottom: "2px solid #aab7c4", padding: "10px 2px" }}>
          <CardCvcElement options={option} />
        </Box>
        <Box
          sx={{ borderBottom: "2px solid #aab7c4", padding: "10px 2px", mb: 2 }}
        >
          <CardExpiryElement options={option} />
        </Box>

        <Button
          onClick={premiumTakenRefetch}
          variant="contained"
          color="secondary"
          type="submit"
          disabled={!stripe}
        >
          Pay {subscriptionPlan === "1" && "$2"}
          {subscriptionPlan === "2" && "$14.99"}
          {subscriptionPlan === "2" && "$16.99"}
        </Button>
      </form>
    </Paper>
   </Box>
  );
};

export default CheckoutForm;
