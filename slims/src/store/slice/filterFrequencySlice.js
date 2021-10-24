import { createSlice } from '@reduxjs/toolkit';

const filterFrequencySlice = createSlice({
    name: 'filterFrequency',
    initialState: {
        initialValues: { frequency: '' },
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

export const { setInitialValues, resetFilter } = filterFrequencySlice.actions;

export default filterFrequencySlice.reducer;
