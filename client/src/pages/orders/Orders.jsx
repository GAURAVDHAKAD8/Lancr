import React from "react";
import { useNavigate } from "react-router-dom";
import "./Orders.scss";
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

    // Prevent messaging yourself
    if (otherUserId === currentUser._id) {
      return alert("You cannot message yourself");
    }

    try {
      // Try to find existing conversation
      const conversationId = currentUser.isSeller
        ? `${currentUser._id}${otherUserId}`
        : `${otherUserId}${currentUser._id}`;

      const res = await newRequest.get(
        `/conversations/single/${conversationId}`
      );
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response?.status === 404) {
        // Create new conversation if none exists
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
    <div className="orders">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Error!"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Orders</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Contact</th>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 ? (
                data.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <img className="image" src={order.img} alt="" />
                    </td>
                    <td>{order.title}</td>
                    <td>${order.price}</td>
                    <td>
                      <img
                        className="message"
                        src="/img/message.png"
                        alt=""
                        onClick={() => handleContact(order)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
