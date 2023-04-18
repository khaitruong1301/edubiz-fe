import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
    isLoading: false,
};

export const spinnerSlice = createSlice({
    name: "Reducer",
    initialState,
    reducers: {
        set_request_spinner_started: (state, action) => {
            state.isLoading = true
            ++state.count
        },
        set_request_spinner_ended: (state, action) => {
            if (--state.count === 0) { state.isLoading = false }
        }
    },
});
export const { set_request_spinner_started, set_request_spinner_ended } = spinnerSlice.actions;
export default spinnerSlice.reducer;
