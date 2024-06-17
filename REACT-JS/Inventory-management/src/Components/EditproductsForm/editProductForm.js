
import React, { useEffect, useState } from 'react';
import ProductForm from '../Comman/ProductForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateProductInDB } from '../../Helper/indexedDB';
import moment from 'moment';
import { showToast } from '../Comman/Tostityfy/toast';

const EditProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const products = useSelector(state => state.inventory.products);
  const product = products.find(product => product.id === parseInt(id));
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    if (product) {
      setInitialValues({
        id: product.id,
        productTitle: product.productTitle || '',
        category: product.category || '',
        price: product.price || '',
        sku: product.sku || '',
        stock: product.stock || '',
        status: product.status || '',
        createDate: product.createDate || moment().format('YYYY-MM-DD'),
        lastUpdateDate: moment().format('YYYY-MM-DD'),
      });
    }
  }, [product]);

  if (!product) {
    return <div>Product not found.</div>;
  }

  if (!initialValues) {
    return <div>Loading...</div>;
  }

  return (
    <ProductForm
    initialValues={initialValues}
    isEditing={true}
    onSubmit={(values) => {
      updateProductInDB(values)
        .then(() => {

          showToast('Product updated successfully!', 'success');
          navigate('/tables');
        })

    }}
  />
  );
};

export default EditProductForm;

