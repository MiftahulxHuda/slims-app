import { createSlice } from '@reduxjs/toolkit';

const filterPlaceSlice = createSlice({
    name: 'filterPlace',
    initialState: {
        initialValues: { place_name: '' },
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

export const { setInitialValues, resetFilter } = filterPlaceSlice.actions;

export default filterPlaceSlice.reducer;
