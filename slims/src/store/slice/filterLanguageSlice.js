import { createSlice } from '@reduxjs/toolkit';

const filterLanguageSlice = createSlice({
    name: 'filterLanguage',
    initialState: {
        initialValues: { language_name: '' },
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

export const { setInitialValues, resetFilter } = filterLanguageSlice.actions;

export default filterLanguageSlice.reducer;
