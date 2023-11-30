import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_publish_key);

const Payment = () => {
  const params = useParams();
  const [payment, setPayment] = useState(0);
  const [loading, setLoding] = useState(true)
  const subscriptionPlan = params.id;
  useEffect(() => {
    if (subscriptionPlan === "1") {
      setPayment(2);
      setLoding(false)
    } else if (subscriptionPlan === "2") {
      setPayment(14.99);
      setLoding(false)
    } else if (subscriptionPlan === "3") {
      setPayment(16.99);
      setLoding(false)
    }
  }, [loading]);
  if(loading){
    return
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm subscriptionPlan={subscriptionPlan} payment={payment} />
    </Elements>
  );
};

export default Payment;
