import { createSlice } from "@reduxjs/toolkit";

const initialState={
    value:{
        mode:false,
        ratingMode:'Emojis',
        modalOpen:false,
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
        },
        openCloseModal:(state,action)=>{
            state.value.modalOpen=action.payload
          }

    },
});

export const {switchMode, changeRatingMode, openCloseModal} = configSlice.actions;
export default configSlice.reducer;