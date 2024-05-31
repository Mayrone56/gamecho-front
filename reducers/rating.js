import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: []
};

export const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    addRate: (state, action) => {
      state.value.push(action.payload);
    },
    deleteRate: (state, action) => {
      //Il faut checker la valeur d'une clef pas l'objet en lui meme, d'ou le .name, utiliser redux devtool pour debuger
      state.value = state.value.filter(rate => rate.name !== action.payload.name);
    },
    loadRates: (state, action) => {
      state.value = action.payload;
    },
    resetRate:(state,action)=>{
      state.value=[];
    }
  },
})

export const { addRate, deleteRate, loadRates, resetRate } = ratingSlice.actions;
export default ratingSlice.reducer



