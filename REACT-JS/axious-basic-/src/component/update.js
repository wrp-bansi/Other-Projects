import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdatePost = () => {
  const id = 1; // Replace with the actual post ID
  const [data, setData] = useState({});
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const fetchDataFromposts = async () => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setData(response.data);
      setFormData({
        title: response.data.title,
        body: response.data.body,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataFromposts();
  }, []);

  // Function to handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to submit the form data using Axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, formData);
      console.log("Post updated:", response.data);
      setData(response.data)
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <>
      <p>{data.id}</p>
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
        <button type="submit">Update Post</button>
      </form>
    </>
  );
};

export default UpdatePost;
