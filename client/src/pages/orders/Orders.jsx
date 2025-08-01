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
    <div className="flex justify-center text-[#555]">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Error!"
      ) : (
        <div className="w-[1100px] py-[150px]">
          <div className="flex justify-between">
            <h1>Orders</h1>
          </div>
          <table className="w-full">
            <thead>
              <tr className="h-[50px]">
                <th className="text-left">Image</th>
                <th className="text-left">Title</th>
                <th className="text-left">Price</th>
                <th className="text-left">Contact</th>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 ? (
                data.map((order) => (
                  <tr key={order._id} className="h-[50px] even:bg-[#1dbf730f]">
                    <td>
                      <img
                        className="w-[50px] h-[25px] object-cover"
                        src={order.img}
                        alt=""
                      />
                    </td>
                    <td>{order.title}</td>
                    <td>${order.price}</td>
                    <td>
                      <img
                        className="w-[25px] cursor-pointer"
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
