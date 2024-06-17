// AddProductForm.js
import React from 'react';
import ProductForm from '../Comman/ProductForm';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { addProductAsync } from '../../Slices/Users/thunk';
import { showToast } from '../Comman/Tostityfy/toast';


const AddProductForm = (validationSchema) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    productTitle: '',
    category: '',
    price: '',
    sku: '',
    stock:  '',
    status:  '',
    createDate: moment().format('YYYY-MM-DD'),
    lastUpdateDate: moment().format('YYYY-MM-DD'),

  };

  const onSubmit = (values, ) => {
    dispatch(addProductAsync(values))
      .then(() => {
        showToast('Product add successfully!', 'success');
        navigate('/tables');

      })

  };

  return (
    <>

    <ProductForm
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      isEditing={false}
    />
    </>
  );
};

export default AddProductForm;




