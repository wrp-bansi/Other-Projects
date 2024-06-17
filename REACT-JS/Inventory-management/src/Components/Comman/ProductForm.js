
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Layout from '../Layout/layout';
import Select from 'react-select'
import './ProductForm.css'
import PropTypes from 'prop-types';

const ProductForm = ({ initialValues, onSubmit, isEditing }) => {
  const [startDate, setStartDate] = useState(new Date());

  const [selectedCategory, setSelectedCategory] = useState(initialValues.category);
  useEffect(() => {
    if (initialValues.category) {
      setSelectedCategory({ value: initialValues.category, label: initialValues.category });
    }
  }, [initialValues.category]);

  const validationSchema = Yup.object().shape({
    productTitle: Yup.string().required('Product title is required'),
    category: Yup.string().required('Category is required'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    sku: Yup.string().required('SKU is required'),
    stock: Yup.number().required('Stock is required').integer('Stock must be an integer'),
    status: Yup.string().required('Status is required'),
    createDate: Yup.date().required('Create Date is required'),
    lastUpdateDate: Yup.date().required('Last Update Date is required'),
  });
  const options = [
    { value: 'Shirt', label: 'Shirt' },
    { value: 'Jeans', label: 'Jeans' },
    { value: 'T-Shirt', label: 'T-Shirt' }

  ]
  return (
    <>

      <Layout />
      <div className="container-fluid">
        <div className='row'>
          <div className="col-2">

          </div>
          <main className="col-10" style={{ marginTop: 100 }}>
            <div className="container">

              <h2 className="text-center">{isEditing ? 'Edit Product' : 'Add Product'}</h2>
              <Formik
                initialValues={{ ...initialValues, category: selectedCategory }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({  setFieldValue }) => (
                  <Form>
                    <div className="row justify-content-center">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="productTitle" className="form-label">Product Title:</label>
                          <Field type="text" className="form-control" id="productTitle" name="productTitle" />
                          <ErrorMessage name="productTitle" component="div" className="error" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="category" className="form-label">Category:</label>
                          {/* <Field as="select" className="form-control" id="category" name="category">
                    <option value="">Select a category</option>
                    <option value="Shirts">Shirts</option>
                    <option value="T-shirts">T-shirts</option>
                    <option value="Jeans">Jeans</option>
                  </Field> */}
                          <Select
                            className=""
                            options={options}
                            placeholder="Select category"
                            value={selectedCategory}
                            onChange={value => {
                              setSelectedCategory(value);
                              setFieldValue('category', value ? value.value : '');
                            }}
                          />
                          <ErrorMessage name="category" component="div" className="error" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="price" className="form-label">Price:</label>
                          <Field type="text" className="form-control" id="price" name="price" />
                          <ErrorMessage name="price" component="div" className="error" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="sku" className="form-label">SKU:</label>
                          <Field type="text" className="form-control" id="sku" name="sku" />
                          <ErrorMessage name="sku" component="div" className="error" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="createDate" className="form-label">Create Date:</label>
                          <div>
                          <DatePicker
     selected={startDate}
     onChange={date => setStartDate(date)}
     selectsStart // tells this DatePicker that it is part of a range*
     startDate={startDate}
     className='form-control'
   />
                          </div>

                          <ErrorMessage name="createDate" component="div" className="error" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="stock" className="form-label">Stock:</label>
                          <Field type="text" className="form-control" id="stock" name="stock" />
                          <ErrorMessage name="stock" component="div" className="error" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="status" className="form-label">Status:</label>
                          <Field as="select" className="form-control" id="status" name="status">
                            <option value="">Select status</option>
                            <option value="In Stock">In Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                          </Field>
                          <ErrorMessage name="status" component="div" className="error" />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="lastUpdateDate" className="form-label ">Last Update Date:</label>
                          <br />
                          <DatePicker
     selected={startDate}
     onChange={date => setStartDate(date)}
     selectsStart // tells this DatePicker that it is part of a range*
     startDate={startDate}
     className='form-control'
   />
                          <ErrorMessage name="lastUpdateDate" component="div" className="error" />
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-primary">{isEditing ? 'Update Product' : 'Add Product'}</button>
                    </div>
                  </Form>
                )}
              </Formik>

            </div>
          </main>
        </div>
      </div>


    </>
  );
};

ProductForm.propTypes = {
  initialValues: PropTypes.object.isRequired, // Assuming initialValues is an object
  onSubmit: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired, // Assuming isEditing is a boolean
};

export default ProductForm;
