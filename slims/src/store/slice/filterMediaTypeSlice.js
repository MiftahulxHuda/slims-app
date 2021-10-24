import { createSlice } from '@reduxjs/toolkit';

const filterMediaTypeSlice = createSlice({
    name: 'filterMediaType',
    initialState: {
        initialValues: { media_type: '' },
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

export const { setInitialValues, resetFilter } = filterMediaTypeSlice.actions;

export default filterMediaTypeSlice.reducer;
