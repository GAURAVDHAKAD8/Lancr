import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => newRequest.get(`/messages/${id}`).then((res) => res.data),
    refetchInterval: 5000, // Checks server every 2 seconds
  });

  const mutation = useMutation({
    mutationFn: (message) => {
      return newRequest.post(`/messages`, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["messages"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      conversationId: id,
      desc: e.target[0].value,
    });
    e.target[0].value = "";
  };

  return (
    <div className="flex justify-center">
      <div className="w-[1000px] my-[150px]">
        <span className="font-[300] text-[14px] text-[#555]">
          <Link to="/messages">Messages</Link> {">"} John Doe{" >"}
        </span>
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <div className="my-[30px] py-[50px] flex flex-col gap-[20px] h-[500px] overflow-scroll">
            {data.map((m) => (
              <div
                className={`flex gap-[20px] max-w-[600px] text-[18px] ${
                  m.userId === currentUser._id
                    ? "flex-row-reverse self-end"
                    : ""
                }`}
                key={m._id}
              >
                <img
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                  className="w-[30px] h-[30px] rounded-[50%] object-cover"
                />
                <p
                  className={`max-w-[500px] p-[20px] ${
                    m.userId === currentUser._id
                      ? "bg-[royalblue] text-[#FFFFFF] text-[13px]  rounded-[20px_0px_20px_20px]"
                      : "bg-[rgb(244,241,241)] text-gray-500 font-[300] text-[13px]  rounded-[0px_20px_20px_20px]"
                  }`}
                >
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        )}
        <hr className="h-0 border-[0.5px] border-[rgb(232,230,230)] mb-[20px]" />
        <form
          className="flex items-center justify-between"
          onSubmit={handleSubmit}
        >
          <textarea
            type="text"
            placeholder="write a message"
            className="w-[80%] h-[100px] p-[10px] border border-[lightgray] rounded-[10px]"
          />
          <button
            type="submit"
            className="bg-[#1dbf73] p-[20px] text-white font-[500] border-none rounded-[10px] cursor-pointer w-[100px]"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;
