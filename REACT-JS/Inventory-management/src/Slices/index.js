import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import inventoryReducer from './Users/reducer';

const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store
