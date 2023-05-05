
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    content: {
        prevUrl: '',
        title: ''
    }
};

export const historySlice = createSlice({
    name: "historyReducer",
    initialState,
    reducers: {
        setHistory: (state, action) => {
            state.content = {
                prevUrl: action.payload.prevUrl,
                title: action.payload.title
            }
        }
    },
});

export const { setHistory } = historySlice.actions;
export default historySlice.reducer;