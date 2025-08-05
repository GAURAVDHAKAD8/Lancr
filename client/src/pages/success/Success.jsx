import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await newRequest.put("/orders", { payment_intent });
        setTimeout(() => {
          navigate("/orders");
        }, 5000);
      } catch (error) {
        console.log(error);
      }
    };
    makeRequest();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full text-center border border-gray-700">
        <div className="mb-6">
          <svg
            className="w-16 h-16 mx-auto text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">
          Payment Successful!
        </h2>
        <p className="text-gray-300 mb-6">
          Thank you for your purchase. Your payment has been processed
          successfully.
        </p>
        <div className="text-gray-400 text-sm">
          <p>You will be redirected to your orders page in 5 seconds...</p>
          <div className="mt-4 w-full bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-green-600 h-2.5 rounded-full animate-pulse"
              style={{ width: "100%" }}
            ></div>
          </div>
          <p className="mt-4">Please do not close this page.</p>
        </div>
      </div>
    </div>
  );
};

export default Success;
