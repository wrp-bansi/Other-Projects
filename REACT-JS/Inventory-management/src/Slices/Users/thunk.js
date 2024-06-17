// thunk/usersThunk.js

import { addProductToDB, updateProductInDB, deleteProductFromDB, getAllProductsFromDB } from '../../Helper/indexedDB';
import { addProduct, editProduct, deleteProduct, loadProduct } from './reducer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import { showToast } from '../../Components/Comman/Tostityfy/toast';

export const incrementStock = (productId) => async (dispatch, getState) => {
  const { products } = getState().inventory;
  const productIndex = products.findIndex(product => product.id === productId);

  if (productIndex !== -1) {
    const product = { ...products[productIndex] };
    const currentStock = parseInt(product.stock); // Convert stock from string to number
    const updatedStock = isNaN(currentStock) ? 1 : currentStock + 1; // Set initial stock to 1 if it's NaN
    const updatedProduct = { ...product, stock: updatedStock, lastUpdateDate: moment().format('YYYY-MM-DD') };

    // Dispatch action to update state with the incremented stock
    dispatch(editProduct({ id: productId, updatedProductData: updatedProduct }));
    // Update product in IndexedDB
    updateProductInDB(updatedProduct);
  } else {
    toast.error('Product not found');
  }
};

export const decrementStock = (productId) => async (dispatch, getState) => {
  const { products } = getState().inventory;
  const productIndex = products.findIndex(product => product.id === productId);

  if (productIndex !== -1) {
    const product = { ...products[productIndex] };

    if (product.stock > 0) {
      const updatedStock = product.stock - 1;
      const updatedProduct = { ...product, stock: updatedStock, lastUpdateDate: moment().format('YYYY-MM-DD') };

      // Dispatch action to update state with the decremented stock
      dispatch(editProduct({ id: productId, updatedProductData: updatedProduct }));
      // Update product in IndexedDB
      updateProductInDB(updatedProduct);
    } else {
      toast.error('Stock cannot be negative');
    }
  } else {
    toast.error('Product not found');
  }
};

// Async action to load products from IndexedDB
export const loadProducts = () => async (dispatch) => {
  try {
    const products = await getAllProductsFromDB();
    dispatch(loadProduct(products));
  } catch (error) {
    showToast('Error loading products:', 'error')
  }
};

// Async action to add a product
export const addProductAsync = (productData) => async (dispatch) => {
  try {
    await addProductToDB(productData);
    dispatch(addProduct(productData));
  } catch (error) {

    showToast('Error adding product:', 'error')
  }
};

// Async action to edit a product
export const editProductAsync = (productId, updatedProductData) => async (dispatch) => {
  try {
    await updateProductInDB(updatedProductData);
    dispatch(editProduct({ id: productId, updatedProductData }));
  } catch (error) {

    showToast('Error editing product:', 'error')
  }
};

// Async action to delete a product
export const deleteProductAsync = (productId) => async (dispatch) => {
  try {
    await deleteProductFromDB(productId);
    dispatch(deleteProduct(productId));
  } catch (error) {

    showToast('Error deleting product:', 'error')
  }
};

