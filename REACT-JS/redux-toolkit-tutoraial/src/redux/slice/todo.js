import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


export const fetchTodos=createAsyncThunk("fetchTodos", async()=>{
    const response=await fetch("https://jsonplaceholder.typicode.com/posts")
    return response.json()


})

const todoSlice=createSlice({
    name:"todo",
    initialState:{
        isLoading:false,
        data:null,
        isEroor:false
    },
    extraReducers:(bulider)=>{
        bulider.addCase(fetchTodos.pending,(staste,action)=>{
            staste.isLoading=true;
        })
        bulider.addCase(fetchTodos.fulfilled,(staste,action)=>{
            staste.isLoading=false;
            staste.data=action.payload;
        })
        bulider.addCase(fetchTodos.rejected,(staste,action)=>{
            staste.isEroor=true;
        })


    }
})

export default todoSlice.reducer