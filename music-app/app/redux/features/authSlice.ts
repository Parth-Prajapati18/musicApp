import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authState {
    isAuthenticated: boolean;
    user: { token: string | null } ;
}

const initialState: authState = {
    isAuthenticated: false,
    user: { token: null },
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: () => initialState,
        signIn: (state, action: PayloadAction<string>) => {
            state.isAuthenticated = true;
            state.user.token = action.payload;
        },
        signOut: (state) => {
            state.isAuthenticated = false;
            state.user.token = null;
        }
    }
})

export const { signIn, signOut, reset } = authSlice.actions;

export default authSlice.reducer;