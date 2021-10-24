import { createSlice } from '@reduxjs/toolkit';

const filterBibliographySlice = createSlice({
    name: 'filterBibliography',
    initialState: {
        initialValues: {
            title: "",
            author: "",
            isbn_issn: "",
            publisher: "",
        },
        isReset: false
    },
    reducers: {
        setInitialValues: (state, action) => {
            for (const key in action.payload) {
                state.initialValues[key] = action.payload[key]
            }
        },
        resetFilter: (state) => {
            state.isReset = !state.isReset;
        },
    },
});

export const { setInitialValues, resetFilter } = filterBibliographySlice.actions;

export default filterBibliographySlice.reducer;
