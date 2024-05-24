import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
};

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            state.value.push(action.payload);
        },
        removeFromWishlist: (state, action) => {
            state.value = state.value.filter(game => game.name !== action.payload.name);
        },
        removeAllFromWishlist: (state) => {
            state.value = [];
        },
    },
});

export const { addToWishlist, removeFromWishlist, removeAllFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;