import { createSlice } from "@reduxjs/toolkit";

const initialState={
    value:{
        mode:false
    }
}

export const configSlice=createSlice({
    name:'config',
    initialState,
    reducers:{
        switchMode: (state,action)=>{
            state.value.mode=action.payload
        },
    },
});

export const {switchMode} = configSlice.actions;
export default configSlice.reducer;