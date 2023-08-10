import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
    username: string;
    authorized: boolean;
}

const initialState: AuthState = {
    username: '',
    authorized: false
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: () => initialState,
        login: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        }
    },
});

export const {
    logout,
    login
} = authSlice.actions;
export default authSlice.reducer;
