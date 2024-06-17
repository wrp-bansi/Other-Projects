import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../featchers/userDeatailSlice";


function UserUpdate() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { id } = useParams();
  const [update, setUpdate] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });


  const users = useSelector((state) => state.app.users);

  useEffect(() => {
    console.log("ID:", id);
    if (id) {
      const singleUser = users.find((e) => e.id === parseInt(id));
      console.log("Single User:", singleUser);

      if (singleUser) {
        setUpdate(singleUser);
      } else {

        console.log(`User with ID ${id} not found`);
      }
    }
  }, [id, users]);

  const handleInputChange = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };
  console.log("Updated User Data:", update);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(update))
    navigate("/read")
    console.log("users...", update)
    alert("updated user")
  };

  return (
    <>
      <h2 className="my-2">Update the data</h2>
      {update && (<form className="w-50 mx-auto my-5" onSubmit={handleUpdate}>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            name="firstName"
            value={update.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={update.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Age
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputage"
            name="age"
            value={update.age}
            onChange={handleInputChange}
          />
        </div>
        <>
          <div className="mb-3">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="flexRadioDefault1"
              value="male"
              checked={update.gender === "male"}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Male
            </label>

          </div>
          <div className="mb-3">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="flexRadioDefault2"
              value="female"
              checked={update.gender === "female"}
              onChange={handleInputChange}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Female
            </label>
          </div>
        </>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>)}
    </>
  );
}

export default UserUpdate;
