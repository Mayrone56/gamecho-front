import { createSlice } from "@reduxjs/toolkit";

const initialState={
    value:{
        mode:false,
        ratingMode:'Emojis',
    }
}

export const configSlice=createSlice({
    name:'config',
    initialState,
    reducers:{
        switchMode: (state,action)=>{
            state.value.mode=action.payload
        },

        changeRatingMode:(state,action)=>{
            state.value.ratingMode=action.payload
        }
    },
});

export const {switchMode,changeRatingMode} = configSlice.actions;
export default configSlice.reducer;