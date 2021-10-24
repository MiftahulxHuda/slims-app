import { createSlice } from '@reduxjs/toolkit';

const filterItemStatusSlice = createSlice({
    name: 'filterItemStatus',
    initialState: {
        initialValues: { item_status_name: '' },
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

export const { setInitialValues, resetFilter } = filterItemStatusSlice.actions;

export default filterItemStatusSlice.reducer;
