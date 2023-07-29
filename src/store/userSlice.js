// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: { uid: '', name: '', email: '' },
    reducers: {
        setUser: (state, action) => {
            state.uid = action.payload.uid;
            state.name = action.payload.displayName;
            state.email = action.payload.email;
        },
        clearUser: (state) => {
            state.uid = '';
            state.name = '';
            state.email = '';
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
