import { createSlice } from '@reduxjs/toolkit';

const filterSupplierSlice = createSlice({
    name: 'filterSupplier',
    initialState: {
        initialValues: { supplier_name: '' },
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

export const { setInitialValues, resetFilter } = filterSupplierSlice.actions;

export default filterSupplierSlice.reducer;
