import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useEffect } from "react";


const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    

    useEffect(()=>{
        axios.post("http://localhost:5000/payment",{price: 400})
        .then(res => {
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })

    },[])

    const handleSubmit = async(e) => {
        e.preventDefault()

        if(!stripe || !elements){
            return console.log("No stripe, no element");
        }
        const card = elements.getElement(CardElement)
        if(card === null){
            return
        }
        const {error, paymentMethod} =await stripe.createPaymentMethod({
            type: "card",
            card
        })
        if(error){
            console.log('[error]',error);
        }else{
            console.log("[paymentMethod]",paymentMethod);
        }
    }
  
    return (
        <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    );
};

export default CheckoutForm;