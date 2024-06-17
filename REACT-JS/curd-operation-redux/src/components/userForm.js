// UserForm.js
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserForm = ({ initialData, onSubmit }) => {
  console.log('Initial Data:', initialData);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    age: Yup.number().positive("Age must be a positive number").integer("Age must be an integer").required("Age is required"),
    gender: Yup.string().oneOf(["Male", "Female"], "Please select a valid gender").required("Gender is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      age: initialData?.age || "",
      gender: initialData?.gender || "",
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  useEffect(() => {
    console.log('Formik Values:', formik.values);
  }, [formik.values]);



  useEffect(() => {
    console.log('Initial Data Changed:', initialData);
    formik.setValues({
    name: initialData?.name || "",
    email: initialData?.email || "",
    age: initialData?.age || "",
    gender: initialData?.gender || "",
  });
  }, [initialData]);

  return (
    <form className="w-50 mx-auto my-5" onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className={`form-control ${formik.touched.name && formik.errors.name ? "is-invalid" : ""}`}
          id="name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="invalid-feedback">{formik.errors.name}</div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && <div className="invalid-feedback">{formik.errors.email}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input
          type="number"
          className={`form-control ${formik.touched.age && formik.errors.age ? "is-invalid" : ""}`}
          id="age"
          name="age"
          value={formik.values.age}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.age && formik.errors.age && <div className="invalid-feedback">{formik.errors.age}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="gender" className="form-label">
          Gender
        </label>
        <select
          className={`form-select ${formik.touched.gender && formik.errors.gender ? "is-invalid" : ""}`}
          id="gender"
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {formik.touched.gender && formik.errors.gender && <div className="invalid-feedback">{formik.errors.gender}</div>}
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default UserForm;
