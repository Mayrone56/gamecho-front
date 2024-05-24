import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { token: null, username: null, email: null, avatar: null },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.username = action.payload.username;
      state.value.email = action.payload.email;
      state.value.avatar = action.payload.avatar;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.username = null;
      state.value.email = null;
      state.value.avatar = null;
    },

    removeUser:(state)=>{
      state.value=[];
    },

    addAvatar: (state, action) => {
      state.value.avatar = action.payload; // ajout d'une fonction d'ajout pour l'upload de l'avatar
    },
  },
});

export const { login, logout, addAvatar, removeUser } = userSlice.actions; // ne pas oublier d'importer la nouvelle fonction
export default userSlice.reducer;
