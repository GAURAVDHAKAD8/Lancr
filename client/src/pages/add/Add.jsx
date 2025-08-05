import React, { useReducer, useState } from "react";
import {
  gigReducer,
  INITIAL_STATE,
} from "../../components/reducers/gigReducers.js";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    const featureInput = e.target.elements[0];
    if (featureInput.value.trim()) {
      dispatch({
        type: "ADD_FEATURE",
        payload: featureInput.value,
      });
      featureInput.value = "";
    }
  };

  const handleUpload = async () => {
    if (!singleFile) {
      setError("Please select a cover image");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const cover = await upload(singleFile);
      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      setError("File upload failed. Please try again.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post("/gigs", gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
      navigate("/mygigs");
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Failed to create gig");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mutation.isLoading) return;

    // Validate required fields
    const requiredFields = [
      { field: state.title, message: "Title is required" },
      { field: state.desc, message: "Description is required" },
      { field: state.price, message: "Price is required" },
      { field: state.cover, message: "Cover image is required" },
      { field: state.category, message: "Category is required" },
    ];

    for (const { field, message } of requiredFields) {
      if (!field) {
        setError(message);
        return;
      }
    }

    mutation.mutate(state);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-[170px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Add New Gig</h1>
          <p className="mt-2 text-sm text-gray-400">
            Fill in the details to create your new service offering
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/30 text-red-300 rounded-md">
            {error}
          </div>
        )}

        <div className="bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Title*
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. I will do something I'm really good at"
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Category*
                </label>
                <select
                  name="category"
                  onChange={handleChange}
                  value={state.category || ""}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 text-white"
                  required
                >
                  <option value="" className="bg-gray-700">
                    Select a category
                  </option>
                  <option value="design" className="bg-gray-700">
                    Design
                  </option>
                  <option value="web" className="bg-gray-700">
                    Web Development
                  </option>
                  <option value="animation" className="bg-gray-700">
                    Animation
                  </option>
                  <option value="music" className="bg-gray-700">
                    Music
                  </option>
                </select>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Cover Image*
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      onChange={(e) => setSingleFile(e.target.files[0])}
                      className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-900/50 file:text-purple-300 hover:file:bg-purple-900/70"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Additional Images
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                    className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-purple-900/50 file:text-purple-300 hover:file:bg-purple-900/70"
                  />
                </div>

                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full md:w-auto px-6 py-3 bg-purple-700 text-white font-medium rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? "Uploading..." : "Upload Images"}
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description*
                </label>
                <textarea
                  name="desc"
                  placeholder="Brief descriptions to introduce your service to customers"
                  onChange={handleChange}
                  value={state.desc || ""}
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
                  required
                ></textarea>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Service Title*
                </label>
                <input
                  type="text"
                  name="shortTitle"
                  placeholder="e.g. One-page web design"
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Short Description*
                </label>
                <textarea
                  name="shortDesc"
                  onChange={handleChange}
                  placeholder="Short description of your service"
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Delivery Time (days)*
                  </label>
                  <input
                    type="number"
                    name="deliveryTime"
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Revision Number*
                  </label>
                  <input
                    type="number"
                    name="revisionNumber"
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Add Features
                </label>
                <form className="flex gap-2" onSubmit={handleFeature}>
                  <input
                    type="text"
                    placeholder="e.g. page design"
                    className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 text-white placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-3 bg-purple-700 text-white font-medium rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Add
                  </button>
                </form>

                <div className="mt-3 flex flex-wrap gap-2">
                  {state?.features?.map((f) => (
                    <span
                      key={f}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-900/30 text-purple-300"
                    >
                      {f}
                      <button
                        onClick={() =>
                          dispatch({ type: "REMOVE_FEATURE", payload: f })
                        }
                        className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-purple-400 hover:bg-purple-800 hover:text-purple-300"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Price ($)*
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    onChange={handleChange}
                    name="price"
                    min="1"
                    className="block w-full pl-7 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-md focus:ring-purple-500 focus:border-purple-500 text-white"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-400 sm:text-sm">USD</span>
                  </div>
                </div>
              </div>

              <button
                className="w-full px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-700 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={mutation.isLoading}
              >
                {mutation.isLoading ? "Creating..." : "Create Gig"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
