import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: []
};

export const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {

    addProduct: (state, action) => {
      state.products.push(action.payload);
    },

    editProduct(state, action) {
      const { id, updatedProductData } = action.payload;
      const existingProduct = state.products.find(product => product.id === id);
      if (existingProduct) {
        Object.assign(existingProduct, updatedProductData);
      }
    },

    deleteProduct: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter(product => product.id !== productId);
    },

    loadProduct: (state, action) => {
      state.products = action.payload;
    }
  },
});



export const { addProduct, editProduct, deleteProduct, loadProduct } = inventorySlice.actions;



export default inventorySlice.reducer;

