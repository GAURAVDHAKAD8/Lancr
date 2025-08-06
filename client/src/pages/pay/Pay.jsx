import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest.js";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/Checkout.jsx";

const stripePromise = loadStripe(
  "pk_test_51Q29N2RpnCUBNNTMTrg92KiXBYM8xWj8hXUhhRSYGoXwBJTvvF4X2PH0VQmSbQLJ4OVJlds445hyFF5FxHiBh9Fy00Jpfm4WzC"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        setLoading(true);
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);

        const orderRes = await newRequest.get(`/orders/${id}`);
        setOrderDetails(orderRes.data);
      } catch (err) {
        console.error("Payment intent error:", err);
      } finally {
        setLoading(false);
      }
    };
    makeRequest();
  }, [id]);

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#4f46e5", // Indigo-600
      colorBackground: "#ffffff", // White background
      colorText: "#111827", // Gray-900 text
      colorTextSecondary: "#4b5563", // Gray-600
      colorTextPlaceholder: "#9ca3af", // Gray-400
      colorDanger: "#dc2626", // Red-600
      colorBorder: "#e5e7eb", // Gray-200
      borderRadius: "8px",
      fontFamily: "Inter, sans-serif",
      spacingUnit: "4px",
    },
    rules: {
      ".Input": {
        backgroundColor: "#f9fafb", // Gray-50
        border: "1px solid var(--colorBorder)",
        color: "var(--colorText)",
        padding: "12px",
        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      },
      ".Input:focus": {
        borderColor: "var(--colorPrimary)",
        boxShadow: "0 0 0 1px var(--colorPrimary)",
      },
      ".Input::placeholder": {
        color: "var(--colorTextPlaceholder)",
      },
      ".Label": {
        color: "var(--colorTextSecondary)",
        fontWeight: "500",
        marginBottom: "6px",
      },
      ".Tab": {
        borderColor: "var(--colorBorder)",
        backgroundColor: "#ffffff",
      },
      ".Tab:hover": {
        backgroundColor: "#f3f4f6", // Gray-100
      },
      ".Tab--selected": {
        backgroundColor: "var(--colorPrimary)",
        borderColor: "var(--colorPrimary)",
        color: "#ffffff",
      },
      ".PayButton": {
        backgroundColor: "var(--colorPrimary) !important",
        color: "#ffffff !important",
        border: "none !important",
        padding: "12px 24px !important",
        fontWeight: "600 !important",
        borderRadius: "8px !important",
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) !important",
        transition: "all 0.2s ease !important",
      },
      ".PayButton:hover": {
        backgroundColor: "#4338ca !important", // Indigo-700
        transform: "translateY(-1px) !important",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important",
      },
      ".PayButton:active": {
        backgroundColor: "#3730a3 !important", // Indigo-800
        transform: "translateY(0) !important",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Complete Your Payment
          </h1>
          <p className="mt-2 text-gray-600">
            Secure checkout powered by Stripe
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          {loading ? (
            <div className="p-8 flex flex-col items-center justify-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              <p className="text-gray-500">Loading payment details...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-0">
              {/* Order Summary */}
              <div className="md:col-span-1 bg-gray-50 p-6 border-b md:border-b-0 md:border-r border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Order Summary
                </h2>

                {orderDetails && (
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="text-gray-900 font-medium">
                        {orderDetails.gig?.title || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="text-gray-900 font-medium">
                        ${orderDetails.price?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Fee:</span>
                      <span className="text-gray-900 font-medium">
                        ${(orderDetails.price * 0.1).toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 my-3"></div>
                    <div className="flex justify-between">
                      <span className="text-gray-900 font-semibold">
                        Total:
                      </span>
                      <span className="text-xl font-bold text-indigo-600">
                        ${(orderDetails.price * 1.1).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <svg
                      className="w-5 h-5 text-indigo-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      ></path>
                    </svg>
                    <span className="text-sm">
                      Secure 256-bit SSL encryption
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div className="md:col-span-2 p-6">
                {clientSecret && (
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance,
                    }}
                  >
                    <CheckoutForm />
                  </Elements>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>
            Need help?{" "}
            <a href="#" className="text-indigo-600 hover:text-indigo-500">
              Contact our support team
            </a>
          </p>
          <p className="mt-1">
            © {new Date().getFullYear()} Lancr. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pay;
