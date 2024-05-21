import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  value: [],
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addGame: (state, action) => {
      state.value.push(action.payload);
    },
    deleteGame: (state, action) => {
      state.value = state.value.filter(game => game.name !== action.payload);
    },
  },
});

export const { addGame, deleteGame } = userSlice.actions;
export default userSlice.reducer;
