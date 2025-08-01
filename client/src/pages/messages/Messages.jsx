import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="flex justify-center">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <div className="w-[1100px] py-[150px]">
          <div className="flex justify-between">
            <h1>Messages</h1>
          </div>
          <table className="w-full">
            <tr>
              <th className="text-left">
                {currentUser.isSeller ? "Buyer" : "Seller"}
              </th>
              <th className="text-left">Last Message</th>
              <th className="text-left">Date</th>
              <th className="text-left">Action</th>
            </tr>
            {data.map((c) => (
              <tr
                className={`h-[100px] ${
                  ((currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)) &&
                  "bg-[#1dbf730f]"
                }`}
                key={c.id}
              >
                <td className="p-[10px] font-[500]">
                  {currentUser.isSeller ? c.buyerId : c.sellerId}
                </td>
                <td className="p-[10px] text-gray-500">
                  <Link to={`/message/${c.id}`} className="link">
                    {c?.lastMessage?.substring(0, 100)}...
                  </Link>
                </td>
                <td className="p-[10px] text-gray-500">
                  {moment(c.updatedAt).fromNow()}
                </td>
                <td className="p-[10px]">
                  {((currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)) && (
                    <button
                      onClick={() => handleRead(c.id)}
                      className="bg-[#1dbf73] text-white p-[10px] border-none cursor-pointer"
                    >
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
