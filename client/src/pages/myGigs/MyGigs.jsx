import React from "react";
import { Link } from "react-router-dom";
import getCurrentUser from "../../utils/getCurrentUser";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function MyGigs() {
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs", currentUser._id],
    queryFn: () =>
      newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => {
        return res.data;
      }),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this gig?")) {
      mutation.mutate(id);
    }
  };

  if (isLoading) return <div className="loading">Loading your gigs...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="flex justify-center text-[#555]">
      <div className="w-[1100px] py-[150px]">
        <div className="flex justify-between">
          <h1>Gigs</h1>
          {currentUser.isSeller && (
            <Link to="/add">
              <button className="bg-[#1dbf73] text-white font-[500] border-none p-[10px] cursor-pointer">
                Add New Gig
              </button>
            </Link>
          )}
        </div>

        {data?.length === 0 ? (
          <div className="empty">
            <p>You haven't created any gigs yet</p>
            <Link to="/add">
              <button className="bg-[#1dbf73] text-white font-[500] border-none p-[10px] cursor-pointer">
                Create Your First Gig
              </button>
            </Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="h-[50px]">
                <th className="text-left">Image</th>
                <th className="text-left">Title</th>
                <th className="text-left">Price</th>
                <th className="text-left">Sales</th>
                <th className="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((gig) => (
                <tr key={gig._id} className="h-[50px] even:bg-[#1dbf730f]">
                  <td>
                    <img
                      className="w-[50px] h-[25px] object-cover"
                      src={gig.cover}
                      alt={gig.title}
                    />
                  </td>
                  <td>{gig.title}</td>
                  <td>${gig.price}</td>
                  <td>{gig.sales}</td>
                  <td>
                    <img
                      className="w-[20px] cursor-pointer"
                      src="./img/delete.png"
                      alt="Delete"
                      onClick={() => handleDelete(gig._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MyGigs;
