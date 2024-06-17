import React, { useState, useEffect } from "react";
import axios from "axios";

const DeleteData = () => {
  // State to store the fetched data
  const [data, setData] = useState([]);

  // Function to fetch data using Axios
  const fetchDataFromposts = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to delete a post using Axios
  const deletePost = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      console.log("Post deleted:", id);
      setData(data.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };



  // Call fetchData on component mount
  useEffect(() => {
    fetchDataFromposts();
  }, []);

  return (
    <div>
      <h2>Posts:</h2>
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            {post.title}{" "}
            <button onClick={() => deletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteData;