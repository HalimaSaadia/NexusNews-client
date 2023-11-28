import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_publish_key);

const Payment = () => {
  const params = useParams()
const subscriptionPlan = params.id;
console.log(subscriptionPlan);
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm subscriptionPlan={subscriptionPlan}/>
    </Elements>
  );
};

export default Payment;
