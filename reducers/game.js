import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  value: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addGame: (state, action) => { // les deux premiers reducers sont-ils utilisés ??
      state.value.push(action.payload);
    },
    deleteGame: (state, action) => {
      state.value = state.value.filter(game => game.name !== action.payload);
    },
    getGameDetails: (state, action) => {
      state.details = action.payload;
    },
  },
});

export const { addGame, deleteGame, getGameDetails } = gameSlice.actions;
export default gameSlice.reducer;
