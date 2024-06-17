// import { configureStore } from '@reduxjs/toolkit';
// import userDetailReducer from '../slices/userDetailSlice';

// export const store = configureStore({
//   reducer: {
//     app: userDetailReducer,
//   },
// });

// export default store;

// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import {thunk} from 'redux-thunk';
// import userDetailReducer from '../slices/Students/reducer';

// const rootReducer = combineReducers({
//   userDetail: userDetailReducer,
//   // ... add other reducers if needed
// });

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;


// store.js
import { configureStore } from "@reduxjs/toolkit";
import userDetailReducer from "../slices/Students/reducer";

export const store = configureStore({
  reducer: {
    userDetail: userDetailReducer,

  },
});

export default store;






