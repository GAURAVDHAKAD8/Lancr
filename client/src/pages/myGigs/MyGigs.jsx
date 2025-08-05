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

  if (isLoading)
    return (
      <div className="min-h-screen bg-gradient-to-br  from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your gigs...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="bg-red-900/20 border border-red-700 text-red-300 px-6 py-4 rounded-lg max-w-md">
          <p className="font-medium">Error loading gigs:</p>
          <p className="mt-1 text-sm">{error.message}</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-[180px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            My Gigs
          </h1>
          {currentUser.isSeller && (
            <Link
              to="/add"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
            >
              Add New Gig
            </Link>
          )}
        </div>

        {data?.length === 0 ? (
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-12 text-center">
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            <p className="text-xl text-gray-300 mb-6">
              You haven't created any gigs yet
            </p>
            <Link
              to="/add"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-8 rounded-lg inline-block transition-all shadow-lg hover:shadow-xl"
            >
              Create Your First Gig
            </Link>
          </div>
        ) : (
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
                      Sales
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {data?.map((gig) => (
                    <tr
                      key={gig._id}
                      className="hover:bg-gray-700/50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex-shrink-0 h-12 w-16">
                          <img
                            className="h-12 w-16 object-cover rounded-md"
                            src={gig.cover}
                            alt={gig.title}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300 font-medium">
                        {gig.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-purple-400 font-medium">
                        ${gig.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                        {gig.sales}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleDelete(gig._id)}
                          className="p-2 rounded-full bg-gray-700 hover:bg-red-600/20 hover:text-red-400 transition-colors duration-200"
                          title="Delete"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400 hover:text-red-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyGigs;
