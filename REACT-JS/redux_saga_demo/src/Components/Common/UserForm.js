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

function UserForm({ initialValues, onSubmit, }) {
  const submitUser = (values) => {
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submitUser}
      validateOnMount={true}
    >
      {({ values, handleChange, handleBlur }) => (
        <Form>
          <div  style={{ marginBottom: '1rem' }}>
            <Field
              as={TextField}
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
              value={values.name }
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage name="name" component="div" style={{ color: 'red', marginTop: '0.5rem' }}/>
          </div>
          <div  style={{ marginBottom: '1rem' }}>
            <Field
              as={TextField}
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage name="email" component="div" style={{ color: 'red', marginTop: '0.5rem' }}/>
          </div>
          <div>
            <Button variant="contained" color="primary" type="submit" style={{ marginLeft: '1rem' }}>
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default UserForm;
