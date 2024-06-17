import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../featchers/userDeatailSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [users, setUsers] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getUserData = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value })

  }
  const handleSumbit = (e) => {
    e.preventDefault();
    console.log("users...", users)
    dispatch(createUser(users))
    navigate("/read")
    alert("created user")
  }

  return (
    <>
      <h2 className="my-2">Fill the data</h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleSumbit}>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            name="firstName"
            onChange={getUserData}
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
            onChange={getUserData}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            age
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputage"
            name="age"
            onChange={getUserData}
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
              onChange={getUserData}
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
              defaultChecked=""
              value="female"
              onChange={getUserData}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Female
            </label>
          </div>
        </>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

    </>
  )
}
export default CreateUser