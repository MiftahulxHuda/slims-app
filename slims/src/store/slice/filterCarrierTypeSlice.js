import { createSlice } from '@reduxjs/toolkit';

const filterCarrierTypeSlice = createSlice({
    name: 'filterCarrierType',
    initialState: {
        initialValues: { carrier_type: '' },
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

export const { setInitialValues, resetFilter } = filterCarrierTypeSlice.actions;

export default filterCarrierTypeSlice.reducer;
