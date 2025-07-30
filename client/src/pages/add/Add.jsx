import React, { useReducer, useState } from "react";
import "./Add.scss";
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
    <div className="add">
      <div className="container">
        <h1>Add New Gig</h1>
        {error && <div className="error">{error}</div>}
        <div className="sections">
          <div className="info">
            <label>Title*</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
              required
            />

            <label>Category*</label>
            <select
              name="category"
              onChange={handleChange}
              value={state.category || ""}
              required
            >
              <option value="">Select a category</option>
              <option value="design">Design</option>
              <option value="web">Web Development</option>
              <option value="animation">Animation</option>
              <option value="music">Music</option>
            </select>

            <div className="images">
              <div className="imagesInputs">
                <label>Cover Image*</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                  required
                />
                <label>Additional Images</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>

            <label>Description*</label>
            <textarea
              name="desc"
              placeholder="Brief descriptions to introduce your service to customers"
              onChange={handleChange}
              value={state.desc || ""}
              required
            ></textarea>
          </div>

          <div className="details">
            <label>Service Title*</label>
            <input
              type="text"
              name="shortTitle"
              placeholder="e.g. One-page web design"
              onChange={handleChange}
              required
            />

            <label>Short Description*</label>
            <textarea
              name="shortDesc"
              onChange={handleChange}
              placeholder="Short description of your service"
              required
            ></textarea>

            <label>Delivery Time (days)*</label>
            <input
              type="number"
              name="deliveryTime"
              onChange={handleChange}
              min="1"
              required
            />

            <label>Revision Number*</label>
            <input
              type="number"
              name="revisionNumber"
              onChange={handleChange}
              min="0"
              required
            />

            <label>Add Features</label>
            <form className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit">Add</button>
            </form>

            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f}
                    <span>X</span>
                  </button>
                </div>
              ))}
            </div>

            <label>Price ($)*</label>
            <input
              type="number"
              onChange={handleChange}
              name="price"
              min="1"
              required
            />

            <button
              className="create-button"
              onClick={handleSubmit}
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Creating..." : "Create Gig"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
