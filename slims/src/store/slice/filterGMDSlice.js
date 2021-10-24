import { createSlice } from '@reduxjs/toolkit';

const filterGMDSlice = createSlice({
    name: 'filterGMD',
    initialState: {
        initialValues: { gmd_name: '' },
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

export const { setInitialValues, resetFilter } = filterGMDSlice.actions;

export default filterGMDSlice.reducer;
