
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    certificateItemKeyIndex: 0,
    certificateReportKeyIndex: 0,
    certificateCourseKeyIndex: 0,
    seriesItemKeyIndex: 0,
    seriesCourseKeyIndex: 0,
    seriesAllKeyIndex: 0
};

export const certificateSlice = createSlice({
    name: "certificateReducer",
    initialState,
    reducers: {
        setCertificateItemKeyIndex: (state, action) => {
            state.certificateItemKeyIndex = {
                ...state,
                certificateItemKeyIndex: action.payload
            }
        },
        setCertificateReportKeyIndex: (state, action) => {
            state.certificateReportKeyIndex = {
                ...state,
                certificateReportKeyIndex: action.payload
            }
        },
        setCertificateCourseKeyIndex: (state, action) => {
            state.certificateCourseKeyIndex = {
                ...state,
                certificateCourseKeyIndex: action.payload
            }
        },
        setSeriesItemKeyIndex: (state, action) => {
            state.seriesItemKeyIndex = {
                ...state,
                seriesItemKeyIndex: action.payload
            }
        },
        setSeriesCourseKeyIndex: (state, action) => {
            state.seriesCourseKeyIndex = {
                ...state,
                seriesCourseKeyIndex: action.payload
            }
        },
        setSeriesAllKeyIndex: (state, action) => {
            state.seriesAllKeyIndex = {
                ...state,
                seriesAllKeyIndex: action.payload
            }
        }
    },
});

export const { 
    setCertificateReportKeyIndex, 
    setCertificateItemKeyIndex, 
    setCertificateCourseKeyIndex, 
    setSeriesItemKeyIndex, 
    setSeriesCourseKeyIndex,
    setSeriesAllKeyIndex
} = certificateSlice.actions;
export default certificateSlice.reducer;