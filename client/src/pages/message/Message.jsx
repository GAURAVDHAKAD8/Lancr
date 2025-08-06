import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import { socket } from "../../utils/socket";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const messagesEndRef = useRef(null);

  // Fetch messages
  const { isLoading, error, data } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => newRequest.get(`/messages/${id}`).then((res) => res.data),
  });

useEffect(() => {
  socket.connect();
  socket.emit("joinConversation", id);

  // Handle receiving new messages
  const handleNewMessage = (newMessage) => {
    queryClient.setQueryData(["messages", id], (oldData) => {
      return [...(oldData || []), newMessage];
    });
  };

  socket.on("receiveMessage", handleNewMessage);

  return () => {
    socket.off("receiveMessage", handleNewMessage);
    socket.disconnect();
  };
}, [id, queryClient]);

// Modify your existing mutation to emit socket event
const mutation = useMutation({
  mutationFn: (message) => newRequest.post(`/messages`, message),
  onSuccess: (savedMessage) => {
    // Add temporary createdAt for immediate display
    const messageWithTimestamp = {
      ...savedMessage,
      createdAt: new Date().toISOString(), // Add current timestamp
    };

    queryClient.setQueryData(["messages", id], (oldData) => {
      return [...(oldData || []), messageWithTimestamp];
    });
  },
});

const handleSubmit = (e) => {
  e.preventDefault();
  const message = e.target.elements.message.value; // Directly access the textarea value
  
  if (message && message.trim()) { // Check for both null/undefined and empty string
    mutation.mutate({
      conversationId: id,
      desc: message.trim(), // Trim the message before sending
    });
    e.target.reset();
  }
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-[170px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            to="/messages"
            className="text-purple-400 hover:text-purple-300 transition-colors duration-200 font-medium"
          >
            ← Back to Messages
          </Link>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Chat header */}
          <div className="bg-gray-700 px-6 py-4 border-b border-gray-600">
            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Conversation
            </h2>
          </div>

          {/* Messages area */}
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
            <div className="p-6 h-[500px] overflow-y-auto custom-scrollbar">
              <div className="space-y-4">
                {data.map((m) => (
                  <div
                    className={`flex gap-3 ${
                      m.userId === currentUser._id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                    key={m._id}
                  >
                    {m.userId !== currentUser._id && (
                      <img
                        src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                      />
                    )}
                    <div
                      className={`max-w-xs sm:max-w-md md:max-w-lg rounded-2xl px-4 py-3 ${
                        m.userId === currentUser._id
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-none"
                          : "bg-gray-700 text-gray-300 rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm">{m.desc}</p>
                      <p
                        className={`text-xs mt-1 ${
                          m.userId === currentUser._id
                            ? "text-purple-200"
                            : "text-gray-500"
                        }`}
                      >
                        {m.createdAt
                          ? new Date(m.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Just now"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Message input */}
          <div className="border-t border-gray-700 p-4 bg-gray-800">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <textarea
                name="message" // Add this name attribute
                type="text"
                placeholder="Type your message..."
                className="flex-1 bg-gray-700 text-gray-300 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows="2"
              />
              <button
                type="submit"
                className="self-end bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-all shadow hover:shadow-lg disabled:opacity-50"
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 mx-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  "Send"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Custom scrollbar styling */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(165, 180, 252, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(165, 180, 252, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Message;
