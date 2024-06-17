import { useState, useEffect } from "react"
import axios from 'axios'

const GetdataFromposts = () => {

  const [data, setData] = useState([])

  const fetchDataFromposts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchDataFromposts();
  }, []);

  return (
    <>
      <ul>
        {data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  )
}
export default GetdataFromposts