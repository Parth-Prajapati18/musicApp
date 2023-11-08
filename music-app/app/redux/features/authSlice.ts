import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authState {
    isAuthenticated: boolean;
    user: { username: string | null } ;
}

const initialState: authState = {
    isAuthenticated: false,
    user: { username: null },
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: () => initialState,
        signIn: (state, action: PayloadAction<string>) => {
            state.isAuthenticated = true;
            state.user.username = action.payload;
        },
        signOut: (state) => {
            state.isAuthenticated = false;
            state.user.username = null;
        }
    }
})

export const { signIn, signOut, reset } = authSlice.actions;

export default authSlice.reducer;