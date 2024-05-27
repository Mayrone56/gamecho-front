import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: []
};

export const ratingSLice = createSlice({
  name: "rate",
  initialState,
  reducers: {
    addRate: (state, action) => {
      state.value.push(action.payload)
    },
    deleteRate: (state, action) => {
      state.value = state.value.filter(rate => rate !== action.payload)
    }
  },




})

export const { addRate, deleteRate } = ratingSLice.actions;
export default ratingSLice.reducer



