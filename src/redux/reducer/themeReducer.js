import { createSlice } from "@reduxjs/toolkit";
import { LIGHT_MODE } from "../../constants/theme";
import localStorageServ from "../../services/locaStorage.service";

const initialState = {
    theme: localStorageServ.modeTheme.get() ? localStorageServ.modeTheme.get() : LIGHT_MODE
};

export const theme = createSlice({
    name: "themeReducer",
    initialState,
    reducers: {
        setModeTheme: (state, action) => {
            state.theme = action.payload;
        }
    },
});
export const { setModeTheme } = theme.actions;
export default theme.reducer;
