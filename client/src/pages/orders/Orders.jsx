import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest
        .get(`/orders`, { withCredentials: true })
        .then((res) => res.data),
  });

  const handleContact = async (order) => {
    const otherUserId = currentUser.isSeller ? order.buyerId : order.sellerId;

    if (otherUserId === currentUser._id) {
      return alert("You cannot message yourself");
    }

    try {
      const conversationId = currentUser.isSeller
        ? `${currentUser._id}${otherUserId}`
        : `${otherUserId}${currentUser._id}`;

      const res = await newRequest.get(
        `/conversations/single/${conversationId}`
      );
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response?.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: otherUserId,
        });
        navigate(`/message/${res.data.id}`);
      } else {
        alert("Failed to start conversation");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-[180px] px-4 sm:px-6 lg:px-8">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <div className="bg-red-900/20 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
            Error loading orders!
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Your Orders
            </h1>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr className="border-b border-gray-600">
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                      Contact
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {data?.length > 0 ? (
                    data.map((order) => (
                      <tr
                        key={order._id}
                        className="hover:bg-gray-700/50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-16">
                              <img
                                className="h-10 w-16 object-cover rounded-md"
                                src={order.img}
                                alt={order.title}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                          {order.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-purple-400 font-medium">
                          ${order.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleContact(order)}
                            className="p-2 rounded-full bg-gray-700 hover:bg-purple-600/20 hover:text-purple-400 transition-colors duration-200"
                            title="Contact"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-gray-400 hover:text-purple-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-12 text-center text-gray-400"
                      >
                        <div className="flex flex-col items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 text-gray-600 mb-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                          <p className="text-lg">No orders found</p>
                          <p className="text-sm mt-1">
                            Your orders will appear here
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
