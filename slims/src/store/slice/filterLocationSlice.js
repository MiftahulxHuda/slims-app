import { createSlice } from '@reduxjs/toolkit';

const filterLocationSlice = createSlice({
    name: 'filterLocation',
    initialState: {
        initialValues: { location_name: '' },
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

export const { setInitialValues, resetFilter } = filterLocationSlice.actions;

export default filterLocationSlice.reducer;
