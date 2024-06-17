import React, { useState } from "react";
import axios from "axios";

const AddPostInposts = () => {
  const [data, setData] = useState({});
  // State to store the form data
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to submit the form data using Axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/posts", formData);
      console.log("Post created:", response.data);
      setData(response.data)
    } catch (error) {
      console.error("Error creating post:", error);
    }
    setFormData({
      title: "",
      body: "",
    })
  };

  return (
    <>
      <p>{data.title}</p>
      <p>{data.body}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
        </label>
        <br />
        <label>
          Body:
          <textarea name="body" value={formData.body} onChange={handleChange}></textarea>
        </label>
        <br />
        <button type="submit">Add Post</button>
      </form>
    </>
  );
};

export default AddPostInposts;