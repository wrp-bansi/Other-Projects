import { createSlice } from "@reduxjs/toolkit";
import { userList } from "../../data";
import axios from 'axios';

//  Action types
export const FETCH_USERS = 'users/fetchUsers';
export const FETCH_USERS_SUCCESS = 'users/fetchUsersSuccess';
export const FETCH_USERS_FAILURE = 'users/fetchUsersFailure';

// Action creators
export const fetchUsers = () => ({ type: FETCH_USERS });
export const fetchUsersSuccess = (users) => ({ type: FETCH_USERS_SUCCESS, payload: users });
export const fetchUsersFailure = (error) => ({ type: FETCH_USERS_FAILURE, payload: error });
export const fetchUsersSaga = () => ({ type: 'users/fetchUsers' });



const userSlice=createSlice({
    name:"users",
    initialState:userList,
    reducers:{
    addUser:(state,action)=>{
       state.push(action.payload)
    },

    updateUser:(state,action)=>{
       const{id,name,email}=action.payload
       const finduser=state.find(user=>user.id==id)

       if(finduser){
        finduser.name=name;
        finduser.email=email
       }
    },
    deleteUser:(state,action)=>{
        const{id}=action.payload
        const finduser=state.find(user=>user.id==id)

        if(finduser){
        return state.filter(f=>f.id!==id)
        }

    },
    fetchUsersSuccessReducer: (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      },

      // Reducer for FETCH_USERS_FAILURE
      fetchUsersFailureReducer: (state, action) => {
        state.data = [];
        state.loading = false;
        state.error = action.payload;
      },
    }
})


export const {addUser,updateUser,deleteUser,fetchUsersSuccessReducer,fetchUsersFailureReducer}=userSlice.actions;
export default userSlice.reducer

