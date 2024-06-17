// UserForm.js
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
});

function UserForm({ initialValues, onSubmit }) {
  const handleSubmit = (values) => {
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnMount // Set this option to true
    >
      <Form>
        <div>
          <Field
            as={TextField}
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            name="name"
          />
          <ErrorMessage name="name" component="div" />
        </div>
        <div>
          <Field
            as={TextField}
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
          />
          <ErrorMessage name="email" component="div" />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </Formik>
  );
}

export default UserForm;
