import React, { useEffect, useState } from 'react';
import './Pay.scss'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest.js"
import {useParams} from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/Checkout.jsx";


const stripePromise = loadStripe(
  "pk_test_51Q29N2RpnCUBNNTMTrg92KiXBYM8xWj8hXUhhRSYGoXwBJTvvF4X2PH0VQmSbQLJ4OVJlds445hyFF5FxHiBh9Fy00Jpfm4WzC"
);

const  Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.error("Payment intent error:", err);
      }
    };
    makeRequest();
  }, [id]);

  return (
    <div className="pay">
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: "stripe",
            },
          }}
        >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Pay;