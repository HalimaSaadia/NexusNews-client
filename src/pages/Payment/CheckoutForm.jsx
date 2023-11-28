import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext, useEffect } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import toast from "react-hot-toast";


const CheckoutForm = ({subscriptionPlan}) => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    const {user} = useContext(AuthContext)
    

    useEffect(()=>{
        axios.post("https://nexus-news-server.vercel.app/payment",{price: subscriptionPlan})
        .then(res => {
            console.log(res.data);
        })
        .catch(err=>{
            console.log(err);
        })

    },[])

    const handleSubmit = async(e) => {
        e.preventDefault()
        const toastId = toast.loading("Wait...")
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
            console.log("[paymentMethod]",paymentMethod.created,"premiumTaken Time");
            axiosSecure.patch(`/subscription/${subscriptionPlan}`,{user:user?.email})
            .then(res=> {
              Swal.fire({
                icon:"success",
                confirmButtonColor:"#5e503f",
                title:"Thanks For Your Subscription",
           
              })
              toast.remove(toastId)
            }).catch(err=> {
              Swal.fire({
                icon:"error",
                confirmButtonColor:"#5e503f",
                title:error.message,
                
              })
              toast.remove(toastId)
            })

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