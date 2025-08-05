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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-[180px] px-4 sm:px-6 lg:px-8">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-64">
          <div className="bg-red-900/20 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
            Error loading messages!
          </div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Messages
            </h1>
          </div>

          <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700">
                  <tr className="border-b border-gray-600">
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                      {currentUser.isSeller ? "Buyer" : "Seller"}
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                      Last Message
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {data.map((c) => (
                    <tr
                      key={c.id}
                      className={`hover:bg-gray-700/50 transition-colors duration-150 ${
                        ((currentUser.isSeller && !c.readBySeller) ||
                          (!currentUser.isSeller && !c.readByBuyer)) &&
                        "bg-purple-900/10"
                      }`}
                    >
                      <td className="px-6 py-4 font-medium text-gray-300">
                        {currentUser.isSeller ? c.buyerId : c.sellerId}
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/message/${c.id}`}
                          className="text-gray-400 hover:text-purple-400 transition-colors duration-200"
                        >
                          <div className="max-w-xs truncate">
                            {c?.lastMessage?.substring(0, 100)}...
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {moment(c.updatedAt).fromNow()}
                      </td>
                      <td className="px-6 py-4">
                        {((currentUser.isSeller && !c.readBySeller) ||
                          (!currentUser.isSeller && !c.readByBuyer)) && (
                          <button
                            onClick={() => handleRead(c.id)}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all shadow hover:shadow-lg"
                          >
                            Mark as Read
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {data.length === 0 && (
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-12 text-center mt-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-600 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p className="text-xl text-gray-300">No messages yet</p>
              <p className="text-gray-500 mt-2">
                Your conversations will appear here
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Messages;
